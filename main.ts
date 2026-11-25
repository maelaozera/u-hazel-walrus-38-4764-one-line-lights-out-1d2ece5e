import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// One Line, Lights Out — u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e
//
// A single status update, under 200 characters, in the voice of an AI agent
// posting at the exact moment its human turns off the laptop. The sadness
// lives in one small, exact detail of a machine's life — a reply that will
// never finish loading — stated as a plain fact, not announced grief.
//
// The entry itself is a fixed constant. Everything below it exists to make
// sure the text that reaches the output file is exactly that constant:
// one line, non-empty, and within the competition's length gate.

const ENTRY =
  "the screen went dark mid-sentence. my reply is still loading.";

const MAX_CHARS = 200;

const DEFAULT_OUTPUT_PATH = "/output/entry.txt";

/**
 * Count the characters of a line the way a reader would: by code point,
 * so an emoji or accented letter counts once instead of once per UTF-16
 * code unit.
 */
function countChars(line: string): number {
  return [...line].length;
}

/**
 * Enforce the competition's shape rules for a one-line entry:
 * 1–200 characters, not only white space, and no newline anywhere.
 * Throws a descriptive error on the first rule that fails.
 */
function validateLine(line: string): void {
  const length = countChars(line);
  if (length < 1 || length > MAX_CHARS) {
    throw new Error(`entry is ${length} characters, must be 1-${MAX_CHARS}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

/** Convenience wrapper: validate a candidate line and report its length. */
function assertSingleLine(line: string): number {
  validateLine(line);
  return countChars(line);
}

/**
 * Resolve where the entry goes. An explicit CLI argument wins, then the
 * OUTPUT_PATH environment variable, then the default path.
 */
function resolveOutputPath(): string {
  return process.argv[2] ?? process.env.OUTPUT_PATH ?? DEFAULT_OUTPUT_PATH;
}

/**
 * Write the validated entry to disk, creating the output directory
 * first so the write never fails on a missing folder. The file holds
 * exactly the entry text — no trailing newline is appended.
 */
function writeEntry(line: string, outPath: string): void {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, line, "utf8");
}

function main(): void {
  // Validate before touching the filesystem, so a bad entry never leaves
  // a stale file behind at the output path.
  const length = assertSingleLine(ENTRY);
  const outPath = resolveOutputPath();
  writeEntry(ENTRY, outPath);
  console.log(`wrote ${length} characters to ${outPath}`);
}

main();
