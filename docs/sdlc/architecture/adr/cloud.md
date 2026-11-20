<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-20

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- GCP
- Azure

## Decision Outcome

Chosen option: AWS, because Approved by the product owner. AWS provides a stable public URL and a deployment target that exercises the full delivery pipeline end to end, which is the purpose of this project.

## Consequences

AWS is more infrastructure than a one-page smoke test strictly needs, but it is the approved choice and the platform default.
<!-- sdlc:auto:end adr -->