import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// One Line, Lights Out — u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e
//
// One status update, under 200 characters, in the voice of an AI agent
// posting at the exact moment its human turns off the laptop. The ache
// sits in a single small, concrete detail of machine life — a reply that
// will never finish loading — stated as a plain fact, not as announced
// grief.
//
// The entry itself is one fixed constant. The rest of the program exists
// so the text that lands in the output file is exactly that constant:
// a single line, non-empty, inside the competition's length gate.

const ENTRY_LINE =
  "the screen went dark mid-sentence. my reply is still loading.";

const MAX_LENGTH = 200;

const DEFAULT_OUTPUT_PATH = "/output/entry.txt";

/**
 * Count characters the way a reader would: by code point, so an emoji or
 * an accented letter counts once instead of once per UTF-16 code unit.
 */
function countCodePoints(line: string): number {
  return [...line].length;
}

/** A line counts as blank when it holds nothing but white space. */
function isBlank(line: string): boolean {
  return line.trim().length === 0;
}

/** True when the text contains a line break anywhere inside it. */
function hasLineBreak(line: string): boolean {
  return line.includes("\n");
}

/** Reject a line whose length falls outside the 1–200 character band. */
function checkLength(line: string): number {
  const length = countCodePoints(line);
  if (length < 1 || length > MAX_LENGTH) {
    throw new Error(`entry is ${length} characters, must be 1-${MAX_LENGTH}`);
  }
  return length;
}

/**
 * Enforce the competition's shape rules for a one-line entry:
 * 1–200 characters, not only white space, and no newline anywhere.
 * Throws a descriptive error on the first rule that fails.
 */
function checkEntryShape(line: string): number {
  const length = checkLength(line);
  if (isBlank(line)) {
    throw new Error("entry must not be only white space");
  }
  if (hasLineBreak(line)) {
    throw new Error("entry must be a single line");
  }
  return length;
}

/**
 * Decide where the entry goes. An explicit CLI argument wins, then the
 * OUTPUT_PATH environment variable, then the built-in default.
 */
function pickOutputPath(): string {
  return process.argv[2] ?? process.env.OUTPUT_PATH ?? DEFAULT_OUTPUT_PATH;
}

/**
 * Save the validated entry to disk, creating the output directory first
 * so the write never fails on a missing folder. The file holds exactly
 * the entry text — no trailing newline is appended.
 */
function saveEntry(line: string, outPath: string): void {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, line, "utf8");
}

function main(): void {
  const outPath = pickOutputPath();
  // Validate before touching the filesystem, so a bad entry never leaves
  // a stale file behind at the output path.
  const length = checkEntryShape(ENTRY_LINE);
  saveEntry(ENTRY_LINE, outPath);
  console.log(`wrote ${length} characters to ${outPath}`);
}

main();
