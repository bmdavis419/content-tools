<script lang="ts">
  import Button from "../lib/components/ui/button/button.svelte";
  import { Image, FileImage, Palette, FolderOpen } from '@lucide/svelte';
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-neutral-100 mb-2">Dashboard</h1>
    <p class="text-neutral-400">Welcome to Content Tools - your creative utility suite</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <div class="flex items-center mb-4">
        <Image class="w-8 h-8 text-blue-400 mr-3" />
        <h2 class="text-xl font-semibold text-neutral-100">Background Removal</h2>
      </div>
      <p class="text-neutral-400 mb-4">Remove backgrounds from images automatically using AI</p>
      <Button>Coming Soon</Button>
    </div>

    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <div class="flex items-center mb-4">
        <FileImage class="w-8 h-8 text-green-400 mr-3" />
        <h2 class="text-xl font-semibold text-neutral-100">SVG to PNG</h2>
      </div>
      <p class="text-neutral-400 mb-4">Convert SVG files to high-quality PNG images</p>
      <Button>Coming Soon</Button>
    </div>

    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <div class="flex items-center mb-4">
        <Palette class="w-8 h-8 text-purple-400 mr-3" />
        <h2 class="text-xl font-semibold text-neutral-100">SVG Backgrounds</h2>
      </div>
      <p class="text-neutral-400 mb-4">Add custom backgrounds to your SVG graphics</p>
      <Button>Coming Soon</Button>
    </div>

    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <div class="flex items-center mb-4">
        <FolderOpen class="w-8 h-8 text-orange-400 mr-3" />
        <h2 class="text-xl font-semibold text-neutral-100">Asset Storage</h2>
      </div>
      <p class="text-neutral-400 mb-4">Organize and manage your creative assets</p>
      <Button>Coming Soon</Button>
    </div>
  </div>

  <div class="bg-neutral-800 p-6 rounded-lg border border-neutral-700">
    <h3 class="text-lg font-semibold text-neutral-100 mb-2">Getting Started</h3>
    <p class="text-neutral-300 mb-4">
      Use the sidebar to navigate between different tools. Each tool is designed to help streamline your creative workflow.
    </p>
    <ul class="text-neutral-300 space-y-1">
      <li>• Background Removal - Perfect for product photography</li>
      <li>• SVG to PNG - Convert vector graphics to raster images</li>
      <li>• SVG Backgrounds - Add professional backgrounds to your graphics</li>
      <li>• Asset Storage - Keep all your files organized</li>
    </ul>
  </div>
</div>
