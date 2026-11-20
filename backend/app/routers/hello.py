"""Greeting service router.

Owns the public GET /api/hello endpoint declared by the approved API spec. The
scaffold ships this as a stub returning a typed placeholder, so the service
starts and serves a complete OpenAPI document before the handler is implemented;
the sprint ticket replaces it with the real greeting response.
"""

from fastapi import APIRouter

from app.schemas import HelloResponse

router = APIRouter(prefix="/api", tags=["hello"])


@router.get("/hello", response_model=HelloResponse)
async def get_hello() -> HelloResponse:
    """Return the greeting message."""
    return HelloResponse(message="Hello from Quorq")
