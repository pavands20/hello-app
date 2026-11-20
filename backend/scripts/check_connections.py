"""Connection check, written by Dex. Do not edit: Dex rewrites it when the service list changes.

Connects to every backing service this app is configured for, reading the settings the way
the app does (its own settings module when it has one, else the environment), and prints
one JSON line per service: {"service": ..., "ok": true|false, "detail": "..."}.
It never prints a setting's value. It always exits 0: the result is in the lines.

Run it from the repository root: backend/.venv/bin/python backend/scripts/check_connections.py
"""

import contextlib
import importlib
import importlib.util
import io
import json
import os
import sys
from pathlib import Path

SERVICES = ["postgres"]

TIMEOUT = 5.0
BACKEND = Path(__file__).resolve().parent.parent
SETTINGS_MODULES = ("app.config", "app.settings", "app.core.config", "app.core.settings")
VECTOR_SQL = "SELECT 1 FROM pg_extension WHERE extname = 'vector'"


def load_settings():
    """The app's own settings object, if it has one; None otherwise."""
    sys.path.insert(0, str(BACKEND))
    for name in SETTINGS_MODULES:
        try:
            quiet = io.StringIO()
            with contextlib.redirect_stdout(quiet), contextlib.redirect_stderr(quiet):
                module = importlib.import_module(name)
                found = getattr(module, "settings", None)
                if found is None and callable(getattr(module, "get_settings", None)):
                    found = module.get_settings()
        except Exception:  # noqa: BLE001 -- optional; fall back to env on any failure
            continue
        if found is not None:
            return found
    return None


SETTINGS = None


def setting(name):
    """A setting's value: the app's settings first (NAME or name), then the environment."""
    if SETTINGS is not None:
        for attr in (name, name.lower()):
            value = getattr(SETTINGS, attr, None)
            if value is not None and hasattr(value, "get_secret_value"):
                value = value.get_secret_value()
            if value is not None and str(value):
                return str(value)
    return os.environ.get(name, "")


def failure(exc):
    # The class name only: an exception's text can hold a host, a URL or a password.
    return False, "could not connect (" + type(exc).__name__ + ")"


def sync_url(url):
    """``url`` with an async driver swapped for an installed sync one; "" when none is."""
    scheme, sep, rest = url.partition("://")
    if "+asyncpg" not in scheme:
        return url
    for driver in ("psycopg", "psycopg2"):
        if importlib.util.find_spec(driver) is not None:
            return scheme.replace("+asyncpg", "+" + driver) + sep + rest
    return ""


def check_database(vector):
    url = setting("DATABASE_URL")
    if not url:
        return False, "DATABASE_URL is not set"
    if url.startswith("sqlite"):
        return False, "DATABASE_URL points at SQLite, not the sandbox Postgres"
    url = sync_url(url)
    if not url:
        return False, "DATABASE_URL uses an async driver; the check needs a sync URL"
    try:
        import sqlalchemy
        import sqlalchemy.exc
        from sqlalchemy.pool import NullPool
    except ImportError:
        sqlalchemy = None
    if sqlalchemy is not None:
        try:
            engine = sqlalchemy.create_engine(
                url, poolclass=NullPool, connect_args={"connect_timeout": int(TIMEOUT)}
            )
        except (ImportError, sqlalchemy.exc.NoSuchModuleError):
            return False, "the database driver DATABASE_URL names is not installed in the app"
        try:
            with engine.connect() as conn:
                conn.execute(sqlalchemy.text("SELECT 1"))
                has_vector = conn.execute(sqlalchemy.text(VECTOR_SQL)).scalar() if vector else 1
        finally:
            engine.dispose()
    else:
        dsn = "postgresql://" + url.split("://", 1)[-1]
        try:
            import psycopg as driver
        except ImportError:
            try:
                import psycopg2 as driver
            except ImportError:
                return False, "no Postgres client library is installed in the app"
        conn = driver.connect(dsn, connect_timeout=int(TIMEOUT))
        try:
            cur = conn.cursor()
            cur.execute("SELECT 1")
            cur.fetchone()
            has_vector = 1
            if vector:
                cur.execute(VECTOR_SQL)
                has_vector = cur.fetchone()
        finally:
            conn.close()
    if not has_vector:
        return False, "connected, but the vector extension is not installed"
    if vector:
        return True, "SELECT 1 answered; vector extension present"
    return True, "SELECT 1 answered"


CHECKS = {
    "postgres": lambda: check_database(vector=False),
    "pgvector": lambda: check_database(vector=True),
}


def main():
    global SETTINGS
    SETTINGS = load_settings()
    for name in SERVICES:
        try:
            ok, detail = CHECKS[name]()
        except Exception as exc:  # noqa: BLE001 -- every failure is one line, never a crash
            ok, detail = failure(exc)
        print(json.dumps({"service": name, "ok": bool(ok), "detail": detail}), flush=True)


if __name__ == "__main__":
    main()
    sys.exit(0)
