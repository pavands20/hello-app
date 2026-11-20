// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { brand } from "@/lib/brand";

const PRODUCT = "Hello App";
const SCREEN = "Hello Page";

const FALLBACK = "Unable to load greeting at this time.";
const LOADING_LABEL = "Fetching greeting from backend…";
const API_NOTE = 'GET /api/hello — returns {"message": "Hello from Quorq"}';

const keyframes = `
@keyframes obsidian-pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
.obsidian-loading{ animation: obsidian-pulse 1.2s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce){ .obsidian-loading{ animation: none; opacity: .6; } }
`;

export default function Screen() {
  const [status, setStatus] = React.useState("loading"); // loading | success | error
  const [message, setMessage] = React.useState("");
  const rule = `2px solid ${brand.primaryColor}`;
  const hair = `1px solid ${brand.primaryColor}`;
  const labelCls = "text-[11px] font-bold uppercase tracking-[0.18em]";

  React.useEffect(() => {
    // Simulate GET /api/hello — no server in the sandbox.
    // In production this would be: fetch("/api/hello").then(r => r.json()).then(d => setMessage(d.message))
    const timer = setTimeout(() => {
      setMessage("Hello from Quorq");
      setStatus("success");
    }, 650);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white" style={{ color: brand.primaryColor, fontFamily: brand.fontBody }}>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      {/* Row 1 — page title (12/12) */}
      <div data-wf="b-0-0" className="pb-4" style={{ borderBottom: rule }}>
        <p className={labelCls} style={{ color: brand.neutralColor }}>{PRODUCT}</p>
        <h1 data-wf="b-0-0" className="mt-1 text-3xl font-bold tracking-tight" style={{ fontFamily: brand.fontHeading }}>
          Hello Page
        </h1>
      </div>

      {/* Row 2 — greeting text (12/12) */}
      <div data-wf="b-1-0" className="py-10" style={{ borderBottom: rule }}>
        <p className={labelCls + " mb-3"} style={{ color: brand.neutralColor }}>Greeting</p>

        {status === "loading" ? (
          <p
            data-wf="b-1-0"
            className="obsidian-loading text-2xl font-bold tracking-tight"
            style={{ fontFamily: brand.fontHeading, color: brand.neutralColor }}
            aria-live="polite"
            aria-busy="true"
          >
            {LOADING_LABEL}
          </p>
        ) : status === "success" ? (
          <p
            data-wf="b-1-0"
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: brand.fontHeading }}
            aria-live="polite"
          >
            {message}
          </p>
        ) : (
          <p
            data-wf="b-1-0"
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: brand.fontHeading, color: brand.accentColor }}
            aria-live="assertive"
          >
            {FALLBACK}
          </p>
        )}
      </div>

      {/* Row 3 — fallback description (12/12) */}
      <div data-wf="b-2-0" className="py-6">
        <p data-wf="b-2-0" className="text-sm" style={{ color: brand.neutralColor, maxWidth: "70ch" }}>
          If the greeting cannot be loaded from the backend, this area shows a fallback message: "Unable to load greeting at this time."
        </p>
        <p className={labelCls + " mt-4"} style={{ color: brand.neutralColor }}>
          <span style={{ fontFamily: brand.fontBody }}>{API_NOTE}</span>
        </p>
      </div>
    </div>
  );
}
