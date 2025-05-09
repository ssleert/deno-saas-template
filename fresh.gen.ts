// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_500 from "./routes/_500.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $admin_middleware from "./routes/admin__/_middleware.ts";
import * as $admin_dashboard from "./routes/admin__/dashboard.tsx";
import * as $admin_image_upload from "./routes/admin__/image-upload.tsx";
import * as $admin_login from "./routes/admin__/login.tsx";
import * as $api_v1_path_ from "./routes/api/v1/[...path].ts";
import * as $image_image_ from "./routes/image/[image].ts";
import * as $index from "./routes/index.tsx";
import * as $kv_insights_middleware from "./routes/kv-insights/_middleware.ts";
import * as $Counter from "./islands/Counter.tsx";
import * as $admin_islands_ImageUploader from "./routes/admin__/(_islands)/ImageUploader.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_500.tsx": $_500,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/admin__/_middleware.ts": $admin_middleware,
    "./routes/admin__/dashboard.tsx": $admin_dashboard,
    "./routes/admin__/image-upload.tsx": $admin_image_upload,
    "./routes/admin__/login.tsx": $admin_login,
    "./routes/api/v1/[...path].ts": $api_v1_path_,
    "./routes/image/[image].ts": $image_image_,
    "./routes/index.tsx": $index,
    "./routes/kv-insights/_middleware.ts": $kv_insights_middleware,
  },
  islands: {
    "./islands/Counter.tsx": $Counter,
    "./routes/admin__/(_islands)/ImageUploader.tsx":
      $admin_islands_ImageUploader,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
