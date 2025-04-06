import consts from "/utils/consts.ts";
import { asset } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";

// Island component for client-side upload
export default function ImageUploader({ adminToken }: { adminToken: string }) {
  const imageUrl = useSignal<string | null>(null);
  const error = useSignal<string | null>(null);
  const isUploading = useSignal(false);

  const handleUpload = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const image = formData.get("image");

    if (!image || !(image instanceof File)) {
      error.value = "Please select an image file";
      return;
    }

    isUploading.value = true;
    error.value = null;

    try {
      const response = await fetch("/api/v1/image/upload", {
        method: "POST",
        headers: {
          Cookie: `${consts.AdminAuthCookieName}=${adminToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { filename } = await response.json();
      imageUrl.value = `/image/${filename}`;
    } catch (err) {
      error.value = err instanceof Error
        ? err.message
        : "Failed to upload image";
    } finally {
      isUploading.value = false;
    }
  };

  return (
    <div class="space-y-6">
      <form onSubmit={handleUpload} enctype="multipart/form-data">
        <div>
          <label
            for="image"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            required
            disabled={isUploading.value}
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
          />
        </div>

        {error.value && (
          <p class="text-red-600 text-sm text-center mt-2">{error.value}</p>
        )}

        <button
          type="submit"
          disabled={isUploading.value}
          class="w-full mt-4 bg-gray-900 text-white py-2.5 font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isUploading.value ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {imageUrl.value && (
        <div class="mt-6">
          <h2 class="text-lg font-medium text-gray-900 mb-2">Preview</h2>
          <img
            src={asset(imageUrl.value)}
            alt="Uploaded image"
            class="w-full rounded-md"
          />
          <p class="mt-2 text-sm text-gray-600">
            URL: <code>{imageUrl.value}</code>
          </p>
        </div>
      )}
    </div>
  );
}
