// Copyright 2023-2025 the Deno authors. All rights reserved. MIT license.
// Modified by Simon Ryabinkov in 2025-04-04
/**
 * This script prints all entries in the KV database formatted as JSON. This
 * can be used to create a backup file.
 *
 * @example
 * ```bash
 * deno task db:dump > backup.json
 * ```
 */

import { KV } from "/db/mod.ts";

const kv = (await new KV().connect()).kv;

// https://github.com/GoogleChromeLabs/jsbi/issues/30#issuecomment-521460510
function replacer(_key: unknown, value: unknown) {
  return typeof value === "bigint" ? value.toString() : value;
}

const items = await Array.fromAsync(
  kv.list({ prefix: [] }),
  ({ key, value }) => ({ key, value }),
);
console.log(JSON.stringify(items, replacer, 2));

kv.close();
