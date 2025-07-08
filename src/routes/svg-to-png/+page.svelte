<script lang="ts">
  import Button from "../../lib/components/ui/button/button.svelte";
  import { Settings, Upload } from "@lucide/svelte";

  let isDragHovering = false;
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
          Drop SVG File Here
        </h3>
        <p class="text-neutral-300">Release to upload your SVG file</p>
      </div>
    </div>
  {/if}
  <div>
    <h1 class="text-3xl font-bold text-neutral-100 mb-2">SVG to PNG</h1>
    <p class="text-neutral-400">Convert SVG files to high-quality PNG images</p>
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
          Choose SVG File
          <input type="file" accept=".svg,image/svg+xml" class="hidden" />
        </label>
        <p class="text-neutral-400 text-sm text-center">
          Or paste an SVG (Ctrl/Cmd + V) or drag & drop a file
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

  <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
    <div class="flex items-center mb-4">
      <Settings class="w-6 h-6 text-neutral-300 mr-3" />
      <h3 class="text-lg font-semibold text-neutral-100">
        Conversion Settings
      </h3>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label class="block text-sm font-medium text-neutral-300 mb-2"
          >Output Width</label
        >
        <input
          type="number"
          placeholder="1024"
          class="w-full px-3 py-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-neutral-300 mb-2"
          >Output Height</label
        >
        <input
          type="number"
          placeholder="1024"
          class="w-full px-3 py-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-neutral-300 mb-2"
          >Quality</label
        >
        <select
          class="w-full px-3 py-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="high">High (Lossless)</option>
          <option value="medium">Medium (Optimized)</option>
          <option value="low">Low (Compressed)</option>
        </select>
      </div>
    </div>
  </div>

  <div class="bg-amber-950 p-6 rounded-lg border border-amber-800">
    <h3 class="text-lg font-semibold text-amber-200 mb-2">Coming Soon</h3>
    <p class="text-amber-300">
      This feature is currently in development. We're implementing high-quality
      SVG rendering with customizable output options and batch processing
      capabilities.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <h3 class="text-lg font-semibold text-neutral-100 mb-3">Features</h3>
      <ul class="space-y-2 text-neutral-300">
        <li>• High-quality vector rendering</li>
        <li>• Custom resolution output</li>
        <li>• Batch conversion support</li>
        <li>• Transparent background preservation</li>
      </ul>
    </div>

    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <h3 class="text-lg font-semibold text-neutral-100 mb-3">Use Cases</h3>
      <ul class="space-y-2 text-neutral-300">
        <li>• Icons for web and mobile apps</li>
        <li>• Social media graphics</li>
        <li>• Print-ready artwork</li>
        <li>• Email signatures and logos</li>
      </ul>
    </div>
  </div>
</div>
