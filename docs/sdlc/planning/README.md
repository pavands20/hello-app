# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:epics

The app's sole feature: a public Hello page that fetches a greeting from the GET /api/hello backend endpoint on page load and displays it. Serves as a smoke test of the entire delivery pipeline end to end.

Epic EPIC-001: Public Hello Page with Greeting from Backend API

The app's sole feature: a public Hello page that fetches a greeting from the GET /api/hello backend endpoint on page load and displays it to the visitor. The frontend and backend live in a single shared repository (React frontend, Node.js/Express backend). No authentication, no database, and no additional pages or features. A basic fallback message is shown if the greeting fails to load; no other error handling is included. This epic serves as a smoke test of the entire delivery pipeline end to end.

Assumptions to surface:
- The frontend is built with React and the backend with Node.js/Express, both maintained in a single shared repository.
- The app is deployed as a single web application accessible via a public URL. The hosting provider has not yet been chosen.
- No authentication or authorization of any kind is required: the Hello page and the API endpoint are fully public.
- The frontend fetches the greeting on page load and displays it. No error handling is included beyond a basic fallback display.

  US-001 [critical] View greeting on the public Hello page: As a visitor, I want to see a greeting message displayed on a public web page that is fetched from a backend API on page load, so that I can confirm the delivery pipeline works end to end from frontend to backend
      AC-001: Given a visitor navigates to the public URL of the Hello page, when the page loads in the browser, then the page fetches the greeting from GET /api/hello and displays the returned message "Hello from Quorq" to the visitor
      AC-002: Given the GET /api/hello endpoint is available, when a request is made to GET /api/hello, then the endpoint returns an HTTP 200 status with a JSON body of {"message": "Hello from Quorq"}
      AC-003: Given the frontend is unable to fetch the greeting (e.g., the backend is unreachable or returns an error), when the fetch call fails, then the page displays a basic fallback message instead of the greeting, with no additional error handling or retry logic
      AC-004: Given both the frontend and backend code exist in one repository, when the application is deployed, then both the React frontend and the Node.js/Express backend are served as a single deployed web application accessible via one public URL
      AC-005: Given the Hello page and GET /api/hello endpoint are fully public, when any visitor accesses the Hello page or the API endpoint, then the page loads and the endpoint responds without requiring any authentication, authorization, or credentials

**Related:** US-001

### SPRINT-1 · approved · source: planning:plan

Sprint 1 delivers the public Hello page and GET /api/hello endpoint end to end as a single deployed application. Capacity is 20 points.

Plan status: approved, version 1

Sprint 1: goal = Deliver the public Hello page and GET /api/hello endpoint end to end as a single deployed application, capacity = 20

Plan items:
  - EPIC-001 [epic]: Public Hello Page with Greeting from Backend API (points = None, role = unassigned)
  - US-001 [story]: View greeting on the public Hello page (points = 3, role = backend-agent)

**Related:** EPIC-001, US-001
<!-- sdlc:auto:end narrative -->
