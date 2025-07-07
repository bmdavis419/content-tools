<script lang="ts">
  import ColorPicker from "svelte-awesome-color-picker";
  import { Upload } from "@lucide/svelte";
  import { displaySvgD3 } from "$lib/svg/displaySvgD3";
  import { getCurrentWebview } from "@tauri-apps/api/webview";
  import {
    getSvgFromClipboard,
    getSvgFromFileUpload,
    getSvgFromPaths,
  } from "$lib/svg/helper";
  import Button from "$lib/components/ui/button/button.svelte";
  import Slider from "$lib/components/ui/slider/slider.svelte";
  import Label from "$lib/components/ui/label/label.svelte";

  let svgDisplay: HTMLDivElement;
  let isDragHovering = $state(false);

  let bgColorHex = $state<string>("#ffffff");
  let borderRadius = $state<number>(75);
  let aspectRatio = $state<"1:1" | "16:9">("1:1");
  let imageWidth = $state<number>(75);
  let svgElement = $state<SVGElement | null>(null);

  const { setupSvg, updateSvg, setInnerSvg } = displaySvgD3();

  $effect(() => {
    setupSvg(svgDisplay);
  });

  $effect(() => {
    if (svgElement) {
      setInnerSvg({ svgElement: svgElement, imageWidth: imageWidth });
    }
  });

  $effect(() => {
    updateSvg({
      borderRadius: borderRadius,
      bgColorHex: bgColorHex,
      aspectRatio: aspectRatio,
    });
  });

  // paste in svg
  $effect(() => {
    const handlePaste = async (event: ClipboardEvent) => {
      const svg = await getSvgFromClipboard(event);
      if (svg) {
        svgElement = svg;
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  });

  // drag and drop
  $effect(() => {
    const unlisten = getCurrentWebview().onDragDropEvent((event) => {
      if (event.payload.type === "over") {
        isDragHovering = true;
        console.log("User hovering", event.payload.position);
      } else if (event.payload.type === "drop") {
        isDragHovering = false;
        console.log("User dropped", event.payload.paths);
        getSvgFromPaths(event.payload.paths);
      } else {
        isDragHovering = false;
        console.log("File drop cancelled");
      }
    });

    return () => {
      unlisten.then((unlisten) => unlisten());
    };
  });
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
    <h1 class="text-3xl font-bold text-neutral-100 mb-2">SVG Backgrounds</h1>
    <p class="text-neutral-400">Add custom backgrounds to your SVG graphics</p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div>
      <h3 class="text-lg font-semibold text-neutral-100 mb-4">Preview</h3>
      <div
        class=" p-6 rounded-lg border border-neutral-700 flex flex-col items-center justify-center"
      >
        <div bind:this={svgDisplay}></div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center h-full">
      <h3 class="text-lg font-semibold text-neutral-100 mb-4 text-center">
        Upload SVG
      </h3>
      <div class="space-y-4 w-full flex flex-col items-center">
        <label
          class="w-full max-w-xs bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center px-4 py-2 rounded cursor-pointer transition-colors"
        >
          <Upload class="w-4 h-4 mr-2" />
          Choose SVG File
          <input
            type="file"
            accept=".svg,image/svg+xml"
            class="hidden"
            onchange={async (e) => {
              const svg = await getSvgFromFileUpload(e);
              if (svg) {
                svgElement = svg;
              }
            }}
          />
        </label>
      </div>
    </div>
  </div>

  <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
    <h3 class="text-lg font-semibold text-neutral-100 mb-4">Customization</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label
          class="block text-sm font-medium text-neutral-300 mb-2"
          for="aspect-ratio">Aspect Ratio</Label
        >
        <div class="flex space-x-2">
          <Button type="button" onclick={() => (aspectRatio = "16:9")}
            >16:9</Button
          >
          <Button type="button" onclick={() => (aspectRatio = "1:1")}
            >1:1</Button
          >
        </div>
      </div>

      <div>
        <Label
          class="block text-sm font-medium text-neutral-300 mb-2"
          for="bg-color-picker">Background Color</Label
        >
        <div class="flex space-x-2 w-full items-center">
          <div
            class="rounded-md border border-gray-300 px-2 py-1 dark:border-gray-600 flex items-center"
            style="height: 100%"
          >
            <ColorPicker bind:hex={bgColorHex} position="responsive" />
          </div>
          <Button
            type="button"
            class="flex items-center px-3 space-x-2 border border-neutral-600 bg-neutral-800 text-white rounded-md"
            style="height: 100%"
            onclick={() => (bgColorHex = "#000000")}
          >
            <span
              class="inline-block w-4 h-4 rounded-full bg-black border border-neutral-400 mr-2"
            ></span>
            Black
          </Button>
          <Button
            type="button"
            class="flex items-center px-3 space-x-2 border border-neutral-600 bg-neutral-800 text-white rounded-md h-full"
            style="height: 100%"
            onclick={() => (bgColorHex = "#ffffff")}
          >
            <span
              class="inline-block w-4 h-4 rounded-full bg-white border border-neutral-400 mr-2"
            ></span>
            White
          </Button>
        </div>
      </div>

      <div>
        <Label
          class="block text-sm font-medium text-neutral-300 mb-2"
          for="corner-radius-slider">Corner Radius</Label
        >
        <Slider
          type="single"
          step={1}
          min={0}
          max={200}
          bind:value={borderRadius}
          id="corner-radius-slider"
          class=""
        />
        <div class="flex justify-between text-xs text-neutral-400 mt-1">
          <span>0px</span>
          <span>200px</span>
        </div>
      </div>

      <div>
        <Label
          class="block text-sm font-medium text-neutral-300 mb-2"
          for="svg-scaling-slider">SVG Scaling</Label
        >
        <Slider
          type="single"
          min={10}
          max={100}
          bind:value={imageWidth}
          id="svg-scaling-slider"
          class="w-full"
        />
        <div class="flex justify-between text-xs text-neutral-400 mt-1">
          <span>10%</span>
          <span>100%</span>
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
