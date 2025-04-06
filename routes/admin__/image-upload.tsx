import { Handlers, PageProps } from "$fresh/server.ts";
import ImageUploader from "./(_islands)/ImageUploader.tsx";

interface ImageUploadProps {
  adminToken: string;
}

export const handler: Handlers<ImageUploadProps> = {
  async GET(_, ctx) {
    return await ctx.render({
      adminToken: ctx.state.adminToken as string,
    });
  },
};

export default function ImageUploadPage(props: PageProps<ImageUploadProps>) {
  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-md mx-4">
        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
          <h1 class="text-2xl font-semibold text-gray-900 text-center mb-6">
            Image Upload
          </h1>

          <ImageUploader adminToken={props.data.adminToken} />

          <a
            href="/admin__/dashboard"
            class="mt-4 block text-center text-blue-600 hover:underline"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
