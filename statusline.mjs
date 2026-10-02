#!/usr/bin/env node
// Claude Code status line (owner's standard, all projects).
// Reads the session JSON on stdin and prints one Turkish line:
//   Opus 5.5 · high │ Bağlam %23 │ 5 saatlik %12 · Haftalık %41 │ main
// Wired up in ~/.claude/settings.json → "statusLine". Setup: .github/README.md.

import { execFileSync } from "node:child_process";

const RESET = "\x1b[0m";
const DIM = "\x1b[2m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";

// Green below 50%, yellow below 80%, red above.
function colorFor(pct) {
  if (pct >= 80) return RED;
  if (pct >= 50) return YELLOW;
  return GREEN;
}

function percent(label, value) {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  const pct = Math.round(value);
  return `${label} ${colorFor(pct)}%${pct}${RESET}`;
}

function gitBranch(dir) {
  if (!dir) return null;
  try {
    return execFileSync("git", ["-C", dir, "branch", "--show-current"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 1000,
    }).trim() || null;
  } catch {
    return null;
  }
}

function render(data) {
  const parts = [];

  const model = data.model?.display_name;
  const effort = data.effort?.level;
  if (model) parts.push(effort ? `${model} ${DIM}·${RESET} ${effort}` : model);

  const context = percent("Bağlam", data.context_window?.used_percentage);
  if (context) parts.push(context);

  // Only present for Pro/Max subscriptions, after the first response.
  const limits = [
    percent("5 saatlik", data.rate_limits?.five_hour?.used_percentage),
    percent("Haftalık", data.rate_limits?.seven_day?.used_percentage),
  ].filter(Boolean);
  if (limits.length) parts.push(limits.join(` ${DIM}·${RESET} `));

  const branch = gitBranch(data.workspace?.current_dir ?? data.cwd);
  if (branch) parts.push(`${DIM}${branch}${RESET}`);

  return parts.join(` ${DIM}│${RESET} `);
}

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => { input += chunk; });
process.stdin.on("end", () => {
  try {
    process.stdout.write(render(JSON.parse(input)));
  } catch {
    process.stdout.write("Claude");
  }
});
