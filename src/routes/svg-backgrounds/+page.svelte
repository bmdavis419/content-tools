<script lang="ts">
  import Button from "../../lib/components/ui/button/button.svelte";
  import { Palette, Upload, Layers } from "@lucide/svelte";
  import { SvgBgState } from "./svgBgState.svelte";
  import { displaySvgD3 } from "$lib/svg/displaySvgD3";

  let svgDisplay: HTMLDivElement;
  let fileInput: HTMLInputElement;

  const { setupSvg, updateSvg, setInnerSvg } = displaySvgD3();

  const svgBgState = new SvgBgState();

  $effect(() => {
    setupSvg(svgDisplay);
  });

  // Upload handling functions
  function handleUploadClick() {
    fileInput.click();
  }

  function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    console.log("file", file);
    if (file && file.type === "image/svg+xml") {
      handleFile(file);
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function handleDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  function handleFile(file: File) {
    // TODO: Add file processing logic here
    console.log("File selected:", file.name);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleUploadClick();
    }
  }

  $inspect(svgBgState);
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-neutral-100 mb-2">SVG Backgrounds</h1>
    <p class="text-neutral-400">Add custom backgrounds to your SVG graphics</p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div>
      <h3 class="text-lg font-semibold text-neutral-100 mb-4">Preview</h3>
      <div class="bg-neutral-800 p-6 rounded-lg border border-neutral-700">
        <div bind:this={svgDisplay}></div>
      </div>
    </div>

    <div>
      <h3 class="text-lg font-semibold text-neutral-100 mb-4">Upload SVG</h3>
      <div class="space-y-4">
        <div
          class="border-2 border-dashed border-neutral-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer"
          ondrop={handleDrop}
          ondragover={handleDragOver}
          ondragleave={handleDragLeave}
          onclick={handleUploadClick}
          onkeydown={handleKeyDown}
          role="button"
          tabindex="0"
        >
          <Upload class="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <p class="text-neutral-300 mb-2">Drag & drop your SVG file here</p>
          <p class="text-sm text-neutral-500">or click to browse</p>
        </div>

        <div class="flex items-center justify-center">
          <span class="text-sm text-neutral-500">or</span>
        </div>

        <Button
          onclick={handleUploadClick}
          class="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Upload class="w-4 h-4 mr-2" />
          Choose SVG File
        </Button>

        <input
          type="file"
          accept=".svg"
          class="hidden"
          bind:this={fileInput}
          onchange={handleFileSelect}
        />
      </div>
    </div>
  </div>

  <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
    <div class="flex items-center mb-4">
      <Layers class="w-6 h-6 text-neutral-300 mr-3" />
      <h3 class="text-lg font-semibold text-neutral-100">Background Options</h3>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        class="p-4 border-2 border-neutral-600 rounded-lg hover:border-purple-500 cursor-pointer transition-colors"
      >
        <div
          class="w-full h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded mb-2"
        ></div>
        <p class="text-sm text-center text-neutral-300">Gradient</p>
      </div>

      <div
        class="p-4 border-2 border-neutral-600 rounded-lg hover:border-purple-500 cursor-pointer transition-colors"
      >
        <div
          class="w-full h-16 bg-neutral-100 rounded mb-2 border border-neutral-500"
        ></div>
        <p class="text-sm text-center text-neutral-300">Solid Color</p>
      </div>

      <div
        class="p-4 border-2 border-neutral-600 rounded-lg hover:border-purple-500 cursor-pointer transition-colors"
      >
        <div class="w-full h-16 bg-neutral-700 rounded mb-2 opacity-50"></div>
        <p class="text-sm text-center text-neutral-300">Transparent</p>
      </div>

      <div
        class="p-4 border-2 border-neutral-600 rounded-lg hover:border-purple-500 cursor-pointer transition-colors"
      >
        <div
          class="w-full h-16 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 rounded mb-2"
        ></div>
        <p class="text-sm text-center text-neutral-300">Pattern</p>
      </div>
    </div>
  </div>

  <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
    <h3 class="text-lg font-semibold text-neutral-100 mb-4">Customization</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label
          class="block text-sm font-medium text-neutral-300 mb-2"
          for="bg-color-picker">Background Color</label
        >
        <div class="flex space-x-2">
          <input
            id="bg-color-picker"
            type="color"
            value="#ffffff"
            class="w-12 h-10 border border-neutral-600 rounded cursor-pointer"
          />
          <input
            id="bg-color-text"
            type="text"
            value="#ffffff"
            placeholder="#ffffff"
            class="flex-1 px-3 py-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div>
        <label
          class="block text-sm font-medium text-neutral-300 mb-2"
          for="padding-slider">Padding</label
        >
        <input
          id="padding-slider"
          type="range"
          min="0"
          max="100"
          value="20"
          class="w-full h-2 bg-neutral-600 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-xs text-neutral-400 mt-1">
          <span>0px</span>
          <span>100px</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-amber-950 p-6 rounded-lg border border-amber-800">
    <h3 class="text-lg font-semibold text-amber-200 mb-2">Coming Soon</h3>
    <p class="text-amber-300">
      This feature is currently in development. We're building a comprehensive
      background editor with gradients, patterns, and advanced customization
      options.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <h3 class="text-lg font-semibold text-neutral-100 mb-3">
        Background Types
      </h3>
      <ul class="space-y-2 text-neutral-300">
        <li>• Solid colors with opacity control</li>
        <li>• Linear and radial gradients</li>
        <li>• Pattern backgrounds</li>
        <li>• Image backgrounds</li>
      </ul>
    </div>

    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <h3 class="text-lg font-semibold text-neutral-100 mb-3">
        Export Options
      </h3>
      <ul class="space-y-2 text-neutral-300">
        <li>• SVG with embedded background</li>
        <li>• PNG with transparency</li>
        <li>• JPG for web use</li>
        <li>• PDF for print</li>
      </ul>
    </div>
  </div>
</div>
