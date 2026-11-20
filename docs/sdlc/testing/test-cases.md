# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
12 tests · Passed 12 · Failed 0 · Skipped 0 · Not run 0

Acceptance criteria covered: 0/5 · passing: 0/5
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start tests -->
## Sprint 1

### US-001: View greeting on the public Hello page

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | Hello screen > [US-001-2 error] displays the fallback message when the API rejects | Unit | Passed | `frontend/src/screens/Hello.test.tsx` |
| — | Hello screen > [US-001-2 loading] shows the loading label while the fetch is in progress | Unit | Passed | `frontend/src/screens/Hello.test.tsx` |
| — | Hello screen > [US-001-2 success] displays the greeting 'Hello from Quorq' when the API resolves | Unit | Passed | `frontend/src/screens/Hello.test.tsx` |
| — | test_hello_requires_no_authentication | Integration | Passed | `backend/tests/integration/test_hello.py` |
| — | test_hello_returns_greeting | Integration | Passed | `backend/tests/integration/test_hello.py` |
| — | [US-001-3] shows the fallback message when the backend is unreachable | E2E | Passed | `frontend/e2e/hello.spec.ts` |
| — | [US-001-3] the Hello page displays the greeting fetched from the backend | E2E | Passed | `frontend/e2e/hello.spec.ts` |
| — | [US-001-3] the Hello page loads as a public visitor with no authentication | E2E | Passed | `frontend/e2e/hello.spec.ts` |

## Project setup

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | App > renders a screen inside the app shell and shows its menu | Unit | Passed | `frontend/src/App.test.tsx` |
| — | test_health_reports_ok | Integration | Passed | `backend/tests/integration/test_health.py` |
| — | test_the_openapi_document_builds | Integration | Passed | `backend/tests/integration/test_health.py` |
| — | the app loads | E2E | Passed | `frontend/e2e/example.spec.ts` |
<!-- sdlc:auto:end tests -->
