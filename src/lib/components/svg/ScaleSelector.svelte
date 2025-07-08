<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import type { Scale } from "$lib/svg/converter.js";

  interface Props {
    title?: string;
    options?: number[];
    selected: Scale;
    customValue: number;
    onSelectionChange?: (value: Scale) => void;
    onCustomValueChange?: (value: number) => void;
  }

  let {
    title = "Scale Factor",
    options = [1, 2, 4, 8, 16, 32, 64],
    selected = $bindable<Scale>(1),
    customValue = $bindable<number>(1),
    onSelectionChange,
    onCustomValueChange
  }: Props = $props();

  function handleOptionClick(value: Scale) {
    selected = value;
    onSelectionChange?.(value);
  }

  function handleCustomValueChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);
    if (!isNaN(value) && value > 0) {
      customValue = value;
      onCustomValueChange?.(value);
    }
  }
</script>

<div class="space-y-3">
  <Label class="text-sm font-medium text-neutral-100">{title}</Label>
  
  <div class="flex flex-wrap gap-2">
    {#each options as option}
      <button
        class="px-3 py-1 text-sm rounded-md transition-colors {selected === option
          ? 'bg-purple-600 text-white'
          : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'}"
        onclick={() => handleOptionClick(option)}
      >
        {option}x
      </button>
    {/each}
    
    <button
      class="px-3 py-1 text-sm rounded-md transition-colors {selected === 'custom'
        ? 'bg-purple-600 text-white'
        : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'}"
      onclick={() => handleOptionClick('custom')}
    >
      Custom
    </button>
  </div>
  
  {#if selected === 'custom'}
    <div class="mt-2">
      <Input
        type="number"
        min="0.1"
        max="100"
        step="0.1"
        value={customValue}
        oninput={handleCustomValueChange}
        class="w-20 bg-neutral-700 border-neutral-600 text-neutral-100"
        placeholder="1.0"
      />
    </div>
  {/if}
</div>
