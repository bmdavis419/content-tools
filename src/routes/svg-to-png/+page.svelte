<script lang="ts">
  import Button from "../../lib/components/ui/button/button.svelte";
  import { FileImage, Upload, Settings, Download } from '@lucide/svelte';
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-neutral-100 mb-2">SVG to PNG</h1>
    <p class="text-neutral-400">Convert SVG files to high-quality PNG images</p>
  </div>

  <div class="bg-neutral-800 p-8 rounded-lg shadow border border-neutral-700">
    <div class="text-center space-y-6">
      <div class="flex justify-center">
        <FileImage class="w-16 h-16 text-green-400" />
      </div>
      
      <div>
        <h2 class="text-xl font-semibold text-neutral-100 mb-2">Upload Your SVG</h2>
        <p class="text-neutral-400">
          Drag and drop SVG files or click to browse. Multiple files supported.
        </p>
      </div>

      <div class="border-2 border-dashed border-neutral-600 rounded-lg p-12 hover:border-green-500 transition-colors">
        <div class="flex flex-col items-center space-y-4">
          <Upload class="w-12 h-12 text-neutral-500" />
          <div class="text-center">
            <p class="text-lg font-medium text-neutral-100">Drop your SVG files here</p>
            <p class="text-neutral-400">or click to browse</p>
          </div>
          <Button>
            <Upload class="w-4 h-4 mr-2" />
            Select SVG Files
          </Button>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
    <div class="flex items-center mb-4">
      <Settings class="w-6 h-6 text-neutral-300 mr-3" />
      <h3 class="text-lg font-semibold text-neutral-100">Conversion Settings</h3>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label class="block text-sm font-medium text-neutral-300 mb-2">Output Width</label>
        <input 
          type="number" 
          placeholder="1024" 
          class="w-full px-3 py-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-neutral-300 mb-2">Output Height</label>
        <input 
          type="number" 
          placeholder="1024" 
          class="w-full px-3 py-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-neutral-300 mb-2">Quality</label>
        <select class="w-full px-3 py-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
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
      This feature is currently in development. We're implementing high-quality SVG rendering 
      with customizable output options and batch processing capabilities.
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
