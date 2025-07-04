<script lang="ts">
  import Button from "../../lib/components/ui/button/button.svelte";
  import { Image, Upload, Download } from '@lucide/svelte';
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-neutral-100 mb-2">Background Removal</h1>
    <p class="text-neutral-400">Remove backgrounds from images automatically using AI</p>
  </div>

  <div class="bg-neutral-800 p-8 rounded-lg shadow border border-neutral-700">
    <div class="text-center space-y-6">
      <div class="flex justify-center">
        <Image class="w-16 h-16 text-blue-400" />
      </div>
      
      <div>
        <h2 class="text-xl font-semibold text-neutral-100 mb-2">Upload Your Image</h2>
        <p class="text-neutral-400">
          Drag and drop an image or click to browse. Supports JPG, PNG, and WebP formats.
        </p>
      </div>

      <div class="border-2 border-dashed border-neutral-600 rounded-lg p-12 hover:border-blue-500 transition-colors">
        <div class="flex flex-col items-center space-y-4">
          <Upload class="w-12 h-12 text-neutral-500" />
          <div class="text-center">
            <p class="text-lg font-medium text-neutral-100">Drop your image here</p>
            <p class="text-neutral-400">or click to browse</p>
          </div>
          <Button>
            <Upload class="w-4 h-4 mr-2" />
            Select Image
          </Button>
        </div>
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
