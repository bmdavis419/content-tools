<script lang="ts">
  import Button from "../../lib/components/ui/button/button.svelte";
  import { Settings, Upload } from "@lucide/svelte";
  import {
    convertSvgToPng,
    extractSvgMetadata,
    type Scale,
    type ImageMetadata,
  } from "$lib/svg/converter.js";
  import ScaleSelector from "$lib/components/svg/ScaleSelector.svelte";
  import { getCurrentWebview } from "@tauri-apps/api/webview";
  import { getSvgFromPaths, getSvgFromClipboard } from "$lib/svg/helper";

  let isDragHovering = $state<boolean>(false);
  let svgContent = $state<string>("");
  let imageMetadata = $state<ImageMetadata | null>(null);
  let scale = $state<Scale>(1);
  let customScale = $state<number>(1);

  // Derived state for effective scale
  const effectiveScale = $derived<number>(
    scale === "custom" ? customScale : scale
  );

  // Derived state for scaled dimensions
  const scaledDimensions = $derived<{ width: number; height: number } | null>(
    imageMetadata
      ? {
          width: Math.round(imageMetadata.width * effectiveScale),
          height: Math.round(imageMetadata.height * effectiveScale),
        }
      : null
  );

  async function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    await processFile(file);
  }

  async function processFile(file: File) {
    const text = await file.text();
    svgContent = text;
    imageMetadata = extractSvgMetadata(svgContent, file.name);
  }

  async function downloadPng() {
    if (svgContent && imageMetadata) {
      await convertSvgToPng(svgContent, effectiveScale, imageMetadata);
    }
  }

  function clearSvg() {
    svgContent = "";
    imageMetadata = null;
    scale = 1;
    customScale = 1;
  }

  // Drag and drop with Tauri
  $effect(() => {
    const unlisten = getCurrentWebview().onDragDropEvent((event) => {
      if (event.payload.type === "over") {
        isDragHovering = true;
        console.log("User is hovering", event.payload.position);
      } else if (event.payload.type === "drop") {
        isDragHovering = false;
        console.log("User dropped", event.payload.paths);
        getSvgFromPaths(event.payload.paths).then((svg) => {
          if (svg) {
            svgContent = new XMLSerializer().serializeToString(svg);
            imageMetadata = extractSvgMetadata(svgContent);
          }
        });
      } else {
        isDragHovering = false;
        console.log("File drop cancelled");
      }
    });

    return () => {
      unlisten.then((unlisten) => unlisten());
    };
  });

  // Paste SVG from clipboard
  $effect(() => {
    const handlePaste = async (event: ClipboardEvent) => {
      const svg = await getSvgFromClipboard(event);
      if (svg) {
        svgContent = new XMLSerializer().serializeToString(svg);
        imageMetadata = extractSvgMetadata(svgContent);
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  });
</script>

<div class="space-y-8" role="main">
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
        class="p-6 rounded-lg border border-neutral-700 flex flex-col items-center justify-center min-h-[300px] bg-neutral-900/50"
      >
        {#if svgContent}
          <div class="max-w-full max-h-full overflow-hidden">
            {@html svgContent}
          </div>
        {:else}
          <div class="text-center">
            <Upload class="w-12 h-12 text-neutral-500 mx-auto mb-3" />
            <p class="text-neutral-500">No SVG Loaded</p>
            <p class="text-neutral-600 text-sm mt-1">
              Upload or drag & drop an SVG file
            </p>
          </div>
        {/if}
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
          <input
            type="file"
            accept=".svg,image/svg+xml"
            class="hidden"
            onchange={handleFileUpload}
          />
        </label>
        <p class="text-neutral-400 text-sm text-center">
          Or paste an SVG (Ctrl/Cmd + V) or drag & drop a file
        </p>
        <ScaleSelector
          selected={scale}
          customValue={customScale}
          onSelectionChange={(value) => (scale = value)}
          onCustomValueChange={(value) => (customScale = value)}
        />
        <div class="flex gap-2">
          {#if svgContent && imageMetadata}
            <Button
              type="button"
              variant="outline"
              class="flex-1"
              onclick={clearSvg}
            >
              Clear
            </Button>
          {/if}
          <Button
            type="button"
            class="flex-1 bg-green-600 hover:bg-green-700 text-white"
            onclick={downloadPng}
            disabled={!svgContent || !imageMetadata}
          >
            Download PNG
          </Button>
        </div>
      </div>
    </div>
  </div>

  {#if imageMetadata}
    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <div class="flex items-center mb-4">
        <Settings class="w-6 h-6 text-neutral-300 mr-3" />
        <h3 class="text-lg font-semibold text-neutral-100">
          Image Information
        </h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <p class="text-sm text-neutral-400 mb-1">Original Size</p>
          <p class="text-lg font-semibold text-neutral-100">
            {imageMetadata.width} × {imageMetadata.height}
          </p>
        </div>

        <div class="text-center">
          <p class="text-sm text-neutral-400 mb-1">Scaled Size</p>
          <p class="text-lg font-semibold text-neutral-100">
            {scaledDimensions?.width} × {scaledDimensions?.height}
          </p>
        </div>

        <div class="text-center">
          <p class="text-sm text-neutral-400 mb-1">File Name</p>
          <p class="text-lg font-semibold text-neutral-100 truncate">
            {imageMetadata.name}
          </p>
        </div>
      </div>
    </div>
  {/if}

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
