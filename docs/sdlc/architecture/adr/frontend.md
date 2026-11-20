<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-11-20

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue 3
- Svelte 5

## Decision Outcome

Chosen option: React 19, because Approved by the product owner. A single-page smoke test with one fetch call and a fallback display fits React's component model cleanly and gives a foundation to grow if features are added later.

## Consequences

React is heavier than strictly necessary for a one-page app, but it is the approved choice and the platform default, ensuring scaffold compatibility.
<!-- sdlc:auto:end adr -->