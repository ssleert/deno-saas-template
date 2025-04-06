// Copyright 2023-2025 the Deno authors. All rights reserved. MIT license.
// Modified by Simon Ryabinkov in 2025-04-04
import { KV } from "/db/mod.ts";

const kv = (await new KV().connect()).kv;

if (!confirm("WARNING: The database will be reset. Continue?")) Deno.exit();

const iter = kv.list({ prefix: [] });
const promises = [];
for await (const res of iter) promises.push(kv.delete(res.key));
await Promise.all(promises);

kv.close();
