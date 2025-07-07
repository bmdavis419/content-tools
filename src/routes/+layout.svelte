<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import {
    Home,
    Image,
    FileImage,
    Palette,
    FolderOpen,
    Settings,
  } from "@lucide/svelte";
  import { Toaster } from "svelte-sonner";

  const { children } = $props();

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/background-removal", label: "Background Removal", icon: Image },
    { path: "/svg-to-png", label: "SVG to PNG", icon: FileImage },
    { path: "/svg-backgrounds", label: "SVG Backgrounds", icon: Palette },
    { path: "/asset-storage", label: "Asset Storage", icon: FolderOpen },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  function isActive(path: string) {
    return $page.url.pathname === path;
  }
</script>

<Toaster />

<div class="flex h-screen bg-neutral-900">
  <!-- Sidebar -->
  <nav class="w-64 bg-neutral-800 shadow-lg flex flex-col">
    <div class="p-6 border-b border-neutral-700">
      <h1 class="text-xl font-bold text-neutral-100">Content Tools</h1>
      <p class="text-sm text-neutral-400 mt-1">Creator Utilities</p>
    </div>

    <div class="flex-1 overflow-y-auto py-6">
      <ul class="space-y-2 px-4">
        {#each navItems as item}
          <li>
            <button
              onclick={() => goto(item.path)}
              class="w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 {isActive(
                item.path
              )
                ? 'bg-blue-950 text-blue-400 border-r-2 border-blue-500'
                : 'text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100'}"
            >
              <item.icon class="w-5 h-5 mr-3" />
              <span class="font-medium">{item.label}</span>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </nav>

  <!-- Main content -->
  <main class="flex-1 overflow-y-auto bg-neutral-900">
    <div class="p-8">
      {@render children()}
    </div>
  </main>
</div>
