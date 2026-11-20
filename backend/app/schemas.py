"""Pydantic request and response models."""

from pydantic import BaseModel


class HelloResponse(BaseModel):
    """Response body for the public GET /api/hello endpoint."""

    message: str
