import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";

import Hello from "@/screens/Hello";

// The screen calls apiFetch, which calls the module-level `fetch`. We mock the
// global `fetch` so the test controls whether /api/hello resolves or rejects,
// without hitting any real network.
function mockFetchOk(message: string) {
  return vi.fn().mockResolvedValue(
    new Response(JSON.stringify({ message }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }),
  );
}

function mockFetchFail() {
  return vi.fn().mockResolvedValue(new Response("Internal Server Error", { status: 500 }));
}

const originalFetch = globalThis.fetch;

describe("Hello screen", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("[US-001-2 success] displays the greeting 'Hello from Quorq' when the API resolves", async () => {
    globalThis.fetch = mockFetchOk("Hello from Quorq");
    render(<Hello />);

    await waitFor(() => {
      expect(screen.getByText("Hello from Quorq")).toBeInTheDocument();
    });
  });

  it("[US-001-2 error] displays the fallback message when the API rejects", async () => {
    globalThis.fetch = mockFetchFail();
    render(<Hello />);

    await waitFor(() => {
      expect(screen.getByText("Unable to load greeting at this time.")).toBeInTheDocument();
    });
  });

  it("[US-001-2 loading] shows the loading label while the fetch is in progress", async () => {
    // A fetch that never settles keeps the screen in the loading state.
    globalThis.fetch = vi.fn().mockReturnValue(new Promise(() => {}));
    render(<Hello />);

    expect(screen.getByText("Fetching greeting from backend…")).toBeInTheDocument();
  });
});
