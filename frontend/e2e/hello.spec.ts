import { expect, test } from "@playwright/test";

// US-001-3 — Hello page E2E.
//
// The Hello screen calls `apiFetch("/api/hello")`, which joins API_BASE_URL (baked into
// the build) with the path. The success scenario runs against the live backend booted by
// playwright.config.ts; the fallback scenario intercepts the request with Playwright route
// interception to simulate the backend being unreachable.

// Matches the /api/hello call regardless of the origin baked into the build.
const HELLO_API = /\/api\/hello$/;

test("[US-001-3] the Hello page displays the greeting fetched from the backend", async ({
  page,
}) => {
  await page.goto("/hello");

  // The greeting text comes from GET /api/hello {"message": "Hello from Quorq"}.
  await expect(page.getByText("Hello from Quorq")).toBeVisible();
});

test("[US-001-3] the Hello page loads as a public visitor with no authentication", async ({
  page,
}) => {
  // Start from a clean context: no session token, no cookies carried in.
  const response = await page.goto("/hello");

  // No login redirect: the Hello page itself is served (200), not an auth gate.
  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveURL(/\/hello$/);

  // No session token is required or set by visiting the page.
  const sessionToken = await page.evaluate(() => localStorage.getItem("session_token"));
  expect(sessionToken).toBeNull();

  // And the greeting still loads, proving the public call needs no bearer.
  await expect(page.getByText("Hello from Quorq")).toBeVisible();
});

test("[US-001-3] shows the fallback message when the backend is unreachable", async ({ page }) => {
  // Simulate an unreachable backend by aborting every /api/hello request at the network
  // layer, so apiFetch rejects and the screen switches to its error state.
  await page.route(HELLO_API, (route) => route.abort("failed"));

  await page.goto("/hello");

  await expect(page.getByText("Unable to load greeting at this time.")).toBeVisible();
});
