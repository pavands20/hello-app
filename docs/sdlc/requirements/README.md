# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-STACK · approved · source: requirements:v1

Approved technology stack for the Hello App smoke test. The product owner confirmed these choices; no substitutions allowed.

- Backend: FastAPI 0.115 — platform default. The confirmed assumption was Node.js/Express, but Express is not available on this platform; FastAPI chosen as the closest available backend. Serves GET /api/hello returning {"message": "Hello from Quorq"}.
- Cloud: AWS — platform default. Provides a stable public URL and exercises the full delivery pipeline end to end.
- Database: PostgreSQL 16 — platform default, named as baseline. Explicitly out of scope and unused for this user story; the Hello endpoint returns a hard-coded string.
- Frontend: React 19 — platform default. Matches the confirmed React frontend; fetches greeting on page load and displays it.
- Conflict noted: The planning epic describes the backend as Node.js/Express, while the approved requirements specify FastAPI 0.115. Both versions recorded here.

### REQ-SERVICES · approved · source: requirements:v1

Capabilities in scope for the Hello App.

- Public Hello page displaying the greeting fetched on page load
- GET /api/hello endpoint returning the greeting message
- No authentication — the Hello page and API endpoint are fully public
- Hello page and API endpoint maintained in a single shared codebase
- Fallback message when the greeting fails to load; no other error handling

### REQ-SCOPE · approved · source: requirements:v1

Delivery scope is lightweight. Explicit in-scope and out-of-scope boundaries for this smoke test.

In scope:
- Single Hello page that fetches and displays a greeting
- GET /api/hello endpoint returning {"message": "Hello from Quorq"}
- Single shared codebase (frontend + backend together)
- Public access with no authentication
- Basic fallback message on fetch failure

Out of scope — do not design or build:
- No database or persistent storage of any kind
- No additional pages, features, user accounts, or functionality beyond the single Hello page and its backing API endpoint

### REQ-FEAT-HELLO-PAGE · approved · source: requirements:v1

Functional requirements for the Hello page feature group.

- Display greeting on page load: The Hello page fetches the greeting from GET /api/hello when the page loads in the browser and displays the returned message to the visitor.
- Show fallback on fetch failure: When the greeting cannot be fetched (backend unreachable or returns an error), the page displays a basic fallback message instead of the greeting. No retry logic or additional error handling.

### REQ-FEAT-API · approved · source: requirements:v1

Functional requirements for the Greeting API feature group.

- Return greeting JSON: GET /api/hello returns an HTTP 200 response with a JSON body containing the greeting message for the visitor.
- Allow public access without credentials: Any visitor can access the Hello page and the API endpoint without providing authentication, authorization, or credentials of any kind.

### REQ-FEAT-DEPLOY · approved · source: requirements:v1

Functional requirements for application deployment.

- Serve as single public application: The frontend and backend are maintained in one shared codebase and deployed together as a single web application accessible at one public URL.

### NFR-001 · approved · source: requirements:v1

Maintainability NFR: single shared codebase.

[maintainability] Single shared codebase: The frontend and backend code are maintained together in a single shared repository so the whole application is built and deployed as one unit.

### NFR-002 · approved · source: requirements:v1

Security NFR (accepted risk): no authentication required.

[security] (accepted risk) No authentication required: The Hello page and API endpoint are fully public with no authentication, authorization, or credentials required, as explicitly decided for this smoke test.

### NFR-003 · approved · source: requirements:v1

Usability NFR (accepted risk): no error handling beyond fallback.

[usability] (accepted risk) No error handling beyond fallback: Only a basic fallback message is shown when the greeting fails to load; no retry logic, detailed error messages, or other error handling is included, as explicitly decided.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-20

**Capabilities in scope:** Public Hello page displaying the greeting fetched on page load, GET /api/hello endpoint returning the greeting message, No authentication — the Hello page and API endpoint are fully public, Hello page and API endpoint maintained in a single shared codebase, Fallback message when the greeting fails to load, no other error handling

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | The confirmed assumption was Node.js/Express, but Express is not among the available options here — FastAPI is. I am choosing the closest available backend rather than something this platform cannot produce. FastAPI serves the single GET /api/hello endpoint cleanly and returns the JSON greeting {"message": "Hello from Quorq"} with minimal code. It is the platform default for the backend layer and will not get in the way of a one-route smoke test. |
| cloud | AWS | The app needs to be deployed as a single web application reachable at a public URL, and AWS is the available cloud option and the platform default. For a one-page, one-endpoint smoke test, AWS gives you a stable public URL to share and a deployment target that exercises the full delivery pipeline end to end — which is the whole point of this project. |
| database | PostgreSQL | No database is needed for this smoke test — it was explicitly marked out of scope, and the Hello endpoint returns a hard-coded string. PostgreSQL is the only option available for this layer and the platform default, so I am naming it as the baseline that the pipeline can provision. It will simply sit unused for this user story. |
| frontend | React | This matches what was confirmed: a React frontend that fetches a greeting from GET /api/hello on page load and displays it. React is also the platform default for the frontend layer. For a single-page smoke test with one fetch call and a fallback display, React's component model is straightforward and gives you a clean place to grow if you later add real features. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Public Hello Page with Greeting from Backend API

The app's sole feature: a public Hello page that fetches a greeting from the GET /api/hello backend endpoint on page load and displays it to the visitor. The frontend and backend live in a single shared repository (React frontend, Node.js/Express backend). No authentication, no database, and no additional pages or features. A basic fallback message is shown if the greeting fails to load; no other error handling is included. This epic serves as a smoke test of the entire delivery pipeline end to end.

Assumptions to surface:
- The frontend is built with React and the backend with Node.js/Express, both maintained in a single shared repository.
- The app is deployed as a single web application accessible via a public URL. The hosting provider has not yet been chosen.
- No authentication or authorization of any kind is required: the Hello page and the API endpoint are fully public.
- The frontend fetches the greeting on page load and displays it. No error handling is included beyond a basic fallback display.

### US-001: View greeting on the public Hello page

**Priority:** critical

> As a visitor, I want to see a greeting message displayed on a public web page that is fetched from a backend API on page load, so that I can confirm the delivery pipeline works end to end from frontend to backend.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | a visitor navigates to the public URL of the Hello page | the page loads in the browser | the page fetches the greeting from GET /api/hello and displays the returned message "Hello from Quorq" to the visitor |
| AC-002 | the GET /api/hello endpoint is available | a request is made to GET /api/hello | the endpoint returns an HTTP 200 status with a JSON body of {"message": "Hello from Quorq"} |
| AC-003 | the frontend is unable to fetch the greeting (e.g., the backend is unreachable or returns an error) | the fetch call fails | the page displays a basic fallback message instead of the greeting, with no additional error handling or retry logic |
| AC-004 | both the frontend and backend code exist in one repository | the application is deployed | both the React frontend and the Node.js/Express backend are served as a single deployed web application accessible via one public URL |
| AC-005 | the Hello page and GET /api/hello endpoint are fully public | any visitor accesses the Hello page or the API endpoint | the page loads and the endpoint responds without requiring any authentication, authorization, or credentials |
<!-- sdlc:auto:end epics -->
