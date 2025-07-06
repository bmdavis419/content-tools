<script lang="ts">
  import { Upload, Layers } from "@lucide/svelte";
  import { displaySvgD3 } from "$lib/svg/displaySvgD3";
  import { getCurrentWebview } from "@tauri-apps/api/webview";

  let svgDisplay: HTMLDivElement;
  let isDragHovering = $state(false);

  let bgColorHex = $state<string>("#000000");
  let borderRadius = $state<number>(100);
  let imageWidth = $state<number>(75);
  let svgElement = $state<SVGElement | null>(null);

  const { setupSvg, updateSvg, setInnerSvg } = displaySvgD3();

  const parseSvgContent = (svgContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, "image/svg+xml");
    return doc.documentElement as unknown as SVGElement;
  };

  $effect(() => {
    setupSvg(svgDisplay);
  });

  $effect(() => {
    if (svgElement) {
      setInnerSvg({ svgElement: svgElement, imageWidth: imageWidth });
    }
  });

  // paste in svg
  $effect(() => {
    const handlePaste = async (event: ClipboardEvent) => {
      const clipboardData = event.clipboardData;
      if (!clipboardData) return;

      // First try to get SVG directly
      if (clipboardData.types.includes("image/svg+xml")) {
        try {
          const svgData = clipboardData.getData("image/svg+xml");
          if (svgData) {
            svgElement = parseSvgContent(svgData);
            return;
          }
        } catch (error) {
          console.error("Error getting SVG data:", error);
        }
      }

      // Try to get SVG from clipboard items
      const items = clipboardData.items;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // Check for SVG file or image
        if (item.type === "image/svg+xml") {
          const blob = item.getAsFile();
          if (blob) {
            // Parse SVG content
            const text = await blob.text();
            svgElement = parseSvgContent(text);
            return;
          }
        }
      }

      // Check for SVG text content
      const text = clipboardData.getData("text/plain");
      if (text) {
        const trimmedText = text.trim();

        if (trimmedText.startsWith("<svg") && trimmedText.includes("</svg>")) {
          svgElement = parseSvgContent(text);
          return;
        }

        // Check if the text is a URL to an SVG file
        if (trimmedText.match(/^https?:\/\/.*\.svg$/i)) {
          try {
            const response = await fetch(trimmedText);
            if (response.ok) {
              const svgText = await response.text();
              if (svgText.trim().startsWith("<svg")) {
                svgElement = parseSvgContent(svgText);
                return;
              }
            }
          } catch (error) {
            console.error("Error fetching SVG from URL:", error);
          }
        }
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
          <input type="file" accept=".svg,image/svg+xml" class="hidden" />
        </label>
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
