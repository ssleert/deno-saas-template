import { Hono } from "hono";
import { Type } from "@sinclair/typebox";
import { describeRoute } from "hono-openapi";
import { parseCookies } from "/utils/cookie.ts";
import { KV } from "/db/mod.ts";
import consts from "/utils/consts.ts";
import { xxhash64 } from "hash-wasm";
import {
  ImageMagick,
  initializeImageMagick,
  MagickFormat,
} from "@imagemagick/magick-wasm";

const wasmBytes = await Deno.readFile(
  new URL(
    "magick.wasm",
    import.meta.resolve("@imagemagick/magick-wasm"),
  ),
);
await initializeImageMagick(wasmBytes);

const ImageUploadRequest = Type.Object({
  image: Type.Any(),
});

const ImageUploadResponse = Type.Object({
  imageId: Type.String(),
  filename: Type.String(),
});

const app = new Hono();

const route = app.post(
  "/upload",
  describeRoute({
    description: "Upload an image to static directory (admin only)",
    requestBody: {
      content: {
        "multipart/form-data": {
          schema: ImageUploadRequest,
        },
      },
    },
    responses: {
      200: {
        description: "Image uploaded successfully",
        content: {
          "application/json": {
            schema: ImageUploadResponse,
          },
        },
      },
      401: {
        description: "Unauthorized - Invalid or missing admin token",
      },
      400: {
        description: "Bad request - No image provided",
      },
      500: {
        description: "Server error - Failed to process image",
      },
    },
  }),
  async (c) => {
    const cookies = parseCookies(c.req.raw);
    const adminToken = cookies[consts.AdminAuthCookieName];

    if (!adminToken) {
      return c.text("Unauthorized", 401);
    }

    const db = await new KV().connect();
    const isValid = await db.checkAdminToken(adminToken);

    if (!isValid) {
      return c.text("Invalid token", 401);
    }

    const formData = await c.req.formData();
    const image = formData.get("image");

    if (!image || !(image instanceof File)) {
      return c.text("No image provided", 400);
    }

    try {
      const imageData = await image.arrayBuffer();
      const imageBuffer = new Uint8Array(imageData);

      const hash = await xxhash64(new Uint8Array(imageData));
      const filename = `${hash}.webp`;
      const filePath = `./static/image/${filename}`;

      await Deno.mkdir("./static/image", { recursive: true });

      try {
        const fileInfo = await Deno.stat(filePath);
        if (fileInfo && fileInfo.isFile) {
          return c.json({
            imageId: hash,
            filename: filename,
          });
        }
      } catch (err) {
        if (!(err instanceof Deno.errors.NotFound)) {
          throw err;
        }
      }

      await ImageMagick.read(imageBuffer, async (image) => {
        image.quality = 70;

        await image.write(MagickFormat.WebP, async (data) => {
          await Deno.writeFile(filePath, data);
        });
      });

      return c.json({
        imageId: hash,
        filename: filename,
      });
    } catch (err) {
      console.log(err);
      return c.text("Failed to process image", 500);
    }
  },
);

export default route;
export type ImageRouteType = typeof route;
