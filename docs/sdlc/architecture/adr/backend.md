<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-11-20

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Node.js/Express
- Flask

## Decision Outcome

Chosen option: FastAPI 0.115, because Approved by the product owner as the closest available option to the originally confirmed Node.js/Express assumption. FastAPI serves the single GET /api/hello endpoint with minimal code and returns the hard-coded JSON greeting cleanly.

## Consequences

The epic narrative referenced Node.js/Express, but Express is not available on this platform. FastAPI is the approved substitute and the platform default — it introduces Python where Node was assumed, but for a one-route smoke test the difference is immaterial.
<!-- sdlc:auto:end adr -->