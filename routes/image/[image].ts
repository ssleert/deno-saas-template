import { Handler } from "$fresh/server.ts";
import { extname, join } from "@std/path";

const MIME_TYPES: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
};

export const handler: Handler = async (_, ctx) => {
  const { image } = ctx.params;
  const ext = extname(image).toLowerCase();
  const mimeType = MIME_TYPES[ext] ?? "application/octet-stream";

  const filePath = join("static", "image", image);

  try {
    const file = await Deno.readFile(filePath);
    return new Response(file, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("File not found or error reading file:", err);
    return await ctx.renderNotFound();
  }
};
