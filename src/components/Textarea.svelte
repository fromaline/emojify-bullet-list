<script>
  export let value, name, rows = 16, readonly = false;
</script>

<textarea
  name={name}
  id={name}
  class="resize-none outline-none border-2 border-solid border-neutral-200 p-3 h-auto md:w-80 w-full bg-white dark:bg-neutral-900 dark:border-neutral-400 rounded-sm"
  rows={rows}
  readonly={readonly}
  bind:value={value}
/>