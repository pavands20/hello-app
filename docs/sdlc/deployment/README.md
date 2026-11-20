# Deployment

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEPLOY-6a0c995b02c2 · approved · source: deployment:6a0c995b02c2

_2026-11-20_

Hello App deployment is live at version 6a0c995b02c2. The frontend is served via AWS Amplify and the backend is accessible at a public endpoint. Both endpoints are publicly available with no authentication required.

Status: live
Version: 6a0c995b02c2
Frontend URL: https://pe7b62b093ded.d3j61xaup4zgrx.amplifyapp.com
Backend URL: https://44-254-53-78.sslip.io/apps/e7b62b093ded/

The deployment serves the single feature of the application: a public Hello page that displays a greeting message fetched from the backend endpoint GET /api/hello, which returns {"message": "Hello from Quorq"}. No sign-in, database tables, or additional pages are involved. This deployment functions as a smoke test of the delivery pipeline.

**Related:** US-001
<!-- sdlc:auto:end narrative -->
