"""GET /api/hello greeting endpoint."""

from fastapi import APIRouter

from app.schemas import HelloResponse

router = APIRouter(prefix="/api", tags=["hello"])


@router.get("/hello", response_model=HelloResponse)
async def get_hello() -> HelloResponse:
    """Return the greeting message."""
    return HelloResponse(message="Hello from Quorq")
