<script lang="ts">
  import Button from "../../lib/components/ui/button/button.svelte";
  import { Upload } from '@lucide/svelte';
  import { writeText } from "@tauri-apps/plugin-clipboard-manager";
  import Slider from "$lib/components/ui/slider/slider.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import ColorPicker from "svelte-awesome-color-picker";

  let isDragHovering = false;
  let bgColorHex = "#ffffff";
  let borderRadius = 75;
  let imageWidth = 75;
</script>

<div class="space-y-8">
  {#if isDragHovering}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-neutral-800 border-2 border-dashed border-purple-500 rounded-lg p-12 text-center"
      >
        <Upload class="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-purple-400 mb-2">
          Drop Image File Here
        </h3>
        <p class="text-neutral-300">Release to upload your image file</p>
      </div>
    </div>
  {/if}
  <div>
    <h1 class="text-3xl font-bold text-neutral-100 mb-2">Background Removal</h1>
    <p class="text-neutral-400">Remove backgrounds from images automatically using AI</p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div>
      <h3 class="text-lg font-semibold text-neutral-100 mb-4">Preview</h3>
      <div
        class="p-6 rounded-lg border border-neutral-700 flex flex-col items-center justify-center min-h-[300px]"
      >
        <div></div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center h-full space-y-4">
      <h3 class="text-lg font-semibold text-neutral-100 mb-4 text-center">
        Upload & Export
      </h3>
      <div class="space-y-3 w-full max-w-sm">
        <label
          class="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center px-4 py-3 rounded cursor-pointer transition-colors"
        >
          <Upload class="w-4 h-4 mr-2" />
          Choose Image File
          <input
            type="file"
            accept="image/*"
            class="hidden"
          />
        </label>
        <p class="text-neutral-400 text-sm text-center">
          Or paste an image (Ctrl/Cmd + V) or drag & drop a file
        </p>
        <Button
          type="button"
          class="w-full flex items-center justify-center px-4 py-3 border border-neutral-600 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition-colors"
        >
          Download PNG
        </Button>
      </div>
    </div>
  </div>

  <div class="bg-amber-950 p-6 rounded-lg border border-amber-800">
    <h3 class="text-lg font-semibold text-amber-200 mb-2">Coming Soon</h3>
    <p class="text-amber-300">
      This feature is currently in development. We're working on integrating advanced AI models 
      for accurate background removal while maintaining edge quality.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <h3 class="text-lg font-semibold text-neutral-100 mb-3">Features</h3>
      <ul class="space-y-2 text-neutral-300">
        <li>• AI-powered background detection</li>
        <li>• Edge refinement for clean cutouts</li>
        <li>• Batch processing support</li>
        <li>• Multiple output formats</li>
      </ul>
    </div>

    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <h3 class="text-lg font-semibold text-neutral-100 mb-3">Supported Formats</h3>
      <ul class="space-y-2 text-neutral-300">
        <li>• Input: JPG, PNG, WebP</li>
        <li>• Output: PNG with transparency</li>
        <li>• Max size: 4096x4096px</li>
        <li>• Quality: Lossless processing</li>
      </ul>
    </div>
  </div>
</div>
