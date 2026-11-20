"""Integration tests for the public GET /api/hello endpoint."""

from fastapi.testclient import TestClient


def test_hello_returns_greeting(client: TestClient) -> None:
    """GET /api/hello returns HTTP 200 with the Quorq greeting body."""
    response = client.get("/api/hello")

    assert response.status_code == 200
    assert response.json() == {"message": "Hello from Quorq"}


def test_hello_requires_no_authentication(client: TestClient) -> None:
    """The endpoint succeeds with no Authorization header or credentials."""
    response = client.get("/api/hello")

    assert response.status_code == 200
