<script lang="ts">
  import "../app.css";

  const { children } = $props();
</script>

<main class="w-full h-screen bg-neutral-900 text-white">
  <div class="flex grow overflow-scroll">
    {@render children()}
  </div>
</main>
