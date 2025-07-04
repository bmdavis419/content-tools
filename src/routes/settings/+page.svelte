<script lang="ts">
  import Button from "../../lib/components/ui/button/button.svelte";
  import { Settings, Monitor, Folder, Palette, Info } from '@lucide/svelte';
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-neutral-100 mb-2">Settings</h1>
    <p class="text-neutral-400">Configure your Content Tools preferences</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <div class="flex items-center mb-4">
        <Palette class="w-6 h-6 text-purple-400 mr-3" />
        <h3 class="text-lg font-semibold text-neutral-100">Appearance</h3>
      </div>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">UI Scale</label>
          <input 
            type="range" 
            min="80" 
            max="120" 
            value="100" 
            class="w-full h-2 bg-neutral-600 rounded-lg appearance-none cursor-pointer"
          />
          <div class="flex justify-between text-xs text-neutral-400 mt-1">
            <span>80%</span>
            <span>100%</span>
            <span>120%</span>
          </div>
        </div>
        
        <div class="flex items-center">
          <input 
            type="checkbox" 
            id="animations" 
            class="h-4 w-4 text-purple-400 focus:ring-purple-500 border-neutral-600 rounded bg-neutral-700"
          />
          <label for="animations" class="ml-2 block text-sm text-neutral-300">
            Enable animations
          </label>
        </div>
      </div>
    </div>

    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <div class="flex items-center mb-4">
        <Folder class="w-6 h-6 text-orange-400 mr-3" />
        <h3 class="text-lg font-semibold text-neutral-100">File Handling</h3>
      </div>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">Default Output Folder</label>
          <div class="flex space-x-2">
            <input 
              type="text" 
              value="~/Downloads/ContentTools" 
              class="flex-1 px-3 py-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Button variant="outline">Browse</Button>
          </div>
        </div>
        
        <div class="flex items-center">
          <input 
            type="checkbox" 
            id="auto-organize" 
            class="h-4 w-4 text-orange-400 focus:ring-orange-500 border-neutral-600 rounded bg-neutral-700"
          />
          <label for="auto-organize" class="ml-2 block text-sm text-neutral-300">
            Auto-organize files by type
          </label>
        </div>
      </div>
    </div>

    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <div class="flex items-center mb-4">
        <Monitor class="w-6 h-6 text-blue-400 mr-3" />
        <h3 class="text-lg font-semibold text-neutral-100">Performance</h3>
      </div>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">Processing Quality</label>
          <select class="w-full px-3 py-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="high">High (Slower)</option>
            <option value="balanced">Balanced</option>
            <option value="fast">Fast (Lower Quality)</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">Max Concurrent Operations</label>
          <input 
            type="number" 
            value="4" 
            min="1" 
            max="8" 
            class="w-full px-3 py-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <div class="flex items-center mb-4">
        <Info class="w-6 h-6 text-neutral-400 mr-3" />
        <h3 class="text-lg font-semibold text-neutral-100">About</h3>
      </div>
      
      <div class="space-y-4">
        <div>
          <p class="text-sm text-neutral-300">Content Tools Desktop App</p>
          <p class="text-sm text-neutral-300">Version 1.0.0</p>
        </div>
        
        <div class="space-y-2">
          <Button variant="outline" class="w-full">Check for Updates</Button>
          <Button variant="outline" class="w-full">View Documentation</Button>
          <Button variant="outline" class="w-full">Report Issue</Button>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
    <h3 class="text-lg font-semibold text-neutral-100 mb-4">Keyboard Shortcuts</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-neutral-300">Open Background Removal</span>
          <code class="text-sm bg-neutral-700 text-neutral-100 px-2 py-1 rounded">Ctrl+1</code>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-300">Open SVG to PNG</span>
          <code class="text-sm bg-neutral-700 text-neutral-100 px-2 py-1 rounded">Ctrl+2</code>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-300">Open SVG Backgrounds</span>
          <code class="text-sm bg-neutral-700 text-neutral-100 px-2 py-1 rounded">Ctrl+3</code>
        </div>
      </div>
      
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-neutral-300">Open Asset Storage</span>
          <code class="text-sm bg-neutral-700 text-neutral-100 px-2 py-1 rounded">Ctrl+4</code>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-300">Open Settings</span>
          <code class="text-sm bg-neutral-700 text-neutral-100 px-2 py-1 rounded">Ctrl+,</code>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-300">Upload Files</span>
          <code class="text-sm bg-neutral-700 text-neutral-100 px-2 py-1 rounded">Ctrl+U</code>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-end space-x-4">
    <Button variant="outline">Reset to Defaults</Button>
    <Button>Save Settings</Button>
  </div>
</div>
