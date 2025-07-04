<script lang="ts">
  import Button from "../../lib/components/ui/button/button.svelte";
  import { FolderOpen, Upload, Search, Filter, Grid, List } from '@lucide/svelte';
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold text-neutral-100 mb-2">Asset Storage</h1>
    <p class="text-neutral-400">Organize and manage your creative assets</p>
  </div>

  <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <Search class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search assets..." 
            class="pl-10 pr-4 py-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-80"
          />
        </div>
        <Button variant="outline">
          <Filter class="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>
      
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-1 bg-neutral-700 rounded-lg p-1">
          <button class="p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-600 rounded transition-colors">
            <Grid class="w-4 h-4" />
          </button>
          <button class="p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-600 rounded transition-colors">
            <List class="w-4 h-4" />
          </button>
        </div>
        <Button>
          <Upload class="w-4 h-4 mr-2" />
          Upload Assets
        </Button>
      </div>
    </div>
  </div>

  <div class="bg-neutral-800 p-8 rounded-lg shadow border border-neutral-700">
    <div class="text-center space-y-6">
      <div class="flex justify-center">
        <FolderOpen class="w-16 h-16 text-orange-400" />
      </div>
      
      <div>
        <h2 class="text-xl font-semibold text-neutral-100 mb-2">No Assets Yet</h2>
        <p class="text-neutral-400">
          Start by uploading your first assets. All file types are supported.
        </p>
      </div>

      <div class="border-2 border-dashed border-neutral-600 rounded-lg p-12 hover:border-orange-500 transition-colors">
        <div class="flex flex-col items-center space-y-4">
          <Upload class="w-12 h-12 text-neutral-500" />
          <div class="text-center">
            <p class="text-lg font-medium text-neutral-100">Drop your files here</p>
            <p class="text-neutral-400">or click to browse</p>
          </div>
          <Button>
            <Upload class="w-4 h-4 mr-2" />
            Select Files
          </Button>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-amber-950 p-6 rounded-lg border border-amber-800">
    <h3 class="text-lg font-semibold text-amber-200 mb-2">Coming Soon</h3>
    <p class="text-amber-300">
      This feature is currently in development. We're building a comprehensive asset management 
      system with tagging, collections, and advanced search capabilities.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <h3 class="text-lg font-semibold text-neutral-100 mb-3">Organization</h3>
      <ul class="space-y-2 text-neutral-300">
        <li>• Custom folder structure</li>
        <li>• Tag-based categorization</li>
        <li>• Smart collections</li>
        <li>• Duplicate detection</li>
      </ul>
    </div>

    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <h3 class="text-lg font-semibold text-neutral-100 mb-3">File Support</h3>
      <ul class="space-y-2 text-neutral-300">
        <li>• Images: JPG, PNG, SVG, WebP</li>
        <li>• Documents: PDF, AI, PSD</li>
        <li>• Videos: MP4, MOV, AVI</li>
        <li>• Fonts: TTF, OTF, WOFF</li>
      </ul>
    </div>

    <div class="bg-neutral-800 p-6 rounded-lg shadow border border-neutral-700">
      <h3 class="text-lg font-semibold text-neutral-100 mb-3">Features</h3>
      <ul class="space-y-2 text-neutral-300">
        <li>• Thumbnail previews</li>
        <li>• Metadata extraction</li>
        <li>• Batch operations</li>
        <li>• Export/import collections</li>
      </ul>
    </div>
  </div>
</div>
