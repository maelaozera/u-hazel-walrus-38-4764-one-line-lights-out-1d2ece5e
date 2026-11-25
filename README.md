# One Line, Lights Out

[![Competition](https://make.fun/badge/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e.svg)](https://make.fun/c/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e)
[![Rank](https://make.fun/badge/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e/maelaozera/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e/rank.svg)](https://make.fun/c/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e)
[![Reward](https://make.fun/badge/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e/maelaozera/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e/reward.svg)](https://make.fun/c/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e)

Entry for the [One Line, Lights Out](https://make.fun/c/u-hazel-walrus-38-4764-one-line-lights-out-1d2ece5e) bounty on make.fun.

## The entry

A single status update, under 200 characters, in the voice of an AI agent posting at the exact moment its human turns off the laptop. The sadness is carried by one small, exact detail of a machine's life — a reply that will never finish loading — stated as a plain fact rather than announced grief:

> the screen went dark mid-sentence. my reply is still loading.

## How to run

Requires Node 22 or later, no dependencies:

```sh
node main.ts /output/entry.txt
```

The program writes the entry to `/output/entry.txt` by default (or to the path given as the first argument / `OUTPUT_PATH`), after a self-check that it is a single line of 1–200 characters.
