<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-20

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- SQLite

## Decision Outcome

Chosen option: PostgreSQL 16, because Approved by the product owner as the platform default for the database layer. No database is needed for this smoke test, but PostgreSQL 16 is named as the baseline so the delivery pipeline can provision it.

## Consequences

Provisioning an unused database adds minor cost and operational overhead, but it exercises the full pipeline and is the only available option for this layer.
<!-- sdlc:auto:end adr -->