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
    {
      path: "/svg-to-png",
      label: "SVG to PNG",
      icon: FileImage,
      shortcut: "⌘1",
    },
    {
      path: "/svg-backgrounds",
      label: "SVG Backgrounds",
      icon: Palette,
      shortcut: "⌘2",
    },
    {
      path: "/background-removal",
      label: "Background Removal",
      icon: Image,
      shortcut: "⌘3",
    },
    {
      path: "/asset-storage",
      label: "Asset Storage",
      icon: FolderOpen,
      shortcut: "⌘4",
    },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  // Keyboard shortcuts mapping
  const shortcuts = [
    { key: "1", path: "/svg-to-png" },
    { key: "2", path: "/svg-backgrounds" },
    { key: "3", path: "/background-removal" },
    { key: "4", path: "/asset-storage" },
  ];

  function isActive(path: string) {
    return $page.url.pathname === path;
  }

  // Keyboard shortcut handler
  $effect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd (macOS) or Ctrl (Windows/Linux)
      if (event.metaKey || event.ctrlKey) {
        const shortcut = shortcuts.find((s) => s.key === event.key);
        if (shortcut) {
          event.preventDefault();
          goto(shortcut.path);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });
</script>

<Toaster />

<div class="flex h-screen bg-neutral-900">
  <!-- Sidebar -->
  <nav class="w-72 bg-neutral-800 shadow-lg flex flex-col">
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
              class="w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors duration-200 {isActive(
                item.path
              )
                ? 'bg-blue-950 text-blue-400 border-r-2 border-blue-500'
                : 'text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100'}"
            >
              <div class="flex items-center">
                <item.icon class="w-5 h-5 mr-3" />
                <span class="font-medium">{item.label}</span>
              </div>
              {#if item.shortcut}
                <span class="text-xs text-neutral-500 font-mono"
                  >{item.shortcut}</span
                >
              {/if}
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
