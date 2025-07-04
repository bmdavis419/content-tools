<script lang="ts">
  import Button from "../../lib/components/ui/button/button.svelte";
  import { Palette, Upload, Layers, Download } from '@lucide/svelte';
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-neutral-100 mb-2">SVG Backgrounds</h1>
    <p class="text-neutral-400">Add custom backgrounds to your SVG graphics</p>
  </div>

  <div class="bg-neutral-800 p-8 rounded-lg shadow border border-neutral-700">
    <div class="text-center space-y-6">
      <div class="flex justify-center">
        <Palette class="w-16 h-16 text-purple-400" />
      </div>
      
      <div>
        <h2 class="text-xl font-semibold text-neutral-100 mb-2">Upload Your SVG</h2>
        <p class="text-neutral-400">
          Start by uploading your SVG file, then choose a background style.
        </p>
      </div>

      <div class="border-2 border-dashed border-neutral-600 rounded-lg p-12 hover:border-purple-500 transition-colors">
        <div class="flex flex-col items-center space-y-4">
          <Upload class="w-12 h-12 text-neutral-500" />
          <div class="text-center">
            <p class="text-lg font-medium text-neutral-100">Drop your SVG file here</p>
            <p class="text-neutral-400">or click to browse</p>
          </div>
          <Button>
            <Upload class="w-4 h-4 mr-2" />
            Select SVG File
          </Button>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
    <div class="flex items-center mb-4">
      <Layers class="w-6 h-6 text-neutral-300 mr-3" />
      <h3 class="text-lg font-semibold text-neutral-100">Background Options</h3>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="p-4 border-2 border-neutral-600 rounded-lg hover:border-purple-500 cursor-pointer transition-colors">
        <div class="w-full h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded mb-2"></div>
        <p class="text-sm text-center text-neutral-300">Gradient</p>
      </div>
      
      <div class="p-4 border-2 border-neutral-600 rounded-lg hover:border-purple-500 cursor-pointer transition-colors">
        <div class="w-full h-16 bg-neutral-100 rounded mb-2 border border-neutral-500"></div>
        <p class="text-sm text-center text-neutral-300">Solid Color</p>
      </div>
      
      <div class="p-4 border-2 border-neutral-600 rounded-lg hover:border-purple-500 cursor-pointer transition-colors">
        <div class="w-full h-16 bg-neutral-700 rounded mb-2 opacity-50"></div>
        <p class="text-sm text-center text-neutral-300">Transparent</p>
      </div>
      
      <div class="p-4 border-2 border-neutral-600 rounded-lg hover:border-purple-500 cursor-pointer transition-colors">
        <div class="w-full h-16 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 rounded mb-2"></div>
        <p class="text-sm text-center text-neutral-300">Pattern</p>
      </div>
    </div>
  </div>

  <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
    <h3 class="text-lg font-semibold text-neutral-100 mb-4">Customization</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-neutral-300 mb-2">Background Color</label>
        <div class="flex space-x-2">
          <input 
            type="color" 
            value="#ffffff" 
            class="w-12 h-10 border border-neutral-600 rounded cursor-pointer"
          />
          <input 
            type="text" 
            value="#ffffff" 
            placeholder="#ffffff" 
            class="flex-1 px-3 py-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-neutral-300 mb-2">Padding</label>
        <input 
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
      This feature is currently in development. We're building a comprehensive background 
      editor with gradients, patterns, and advanced customization options.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <h3 class="text-lg font-semibold text-neutral-100 mb-3">Background Types</h3>
      <ul class="space-y-2 text-neutral-300">
        <li>• Solid colors with opacity control</li>
        <li>• Linear and radial gradients</li>
        <li>• Pattern backgrounds</li>
        <li>• Image backgrounds</li>
      </ul>
    </div>

    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <h3 class="text-lg font-semibold text-neutral-100 mb-3">Export Options</h3>
      <ul class="space-y-2 text-neutral-300">
        <li>• SVG with embedded background</li>
        <li>• PNG with transparency</li>
        <li>• JPG for web use</li>
        <li>• PDF for print</li>
      </ul>
    </div>
  </div>
</div>
