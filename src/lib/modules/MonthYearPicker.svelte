<script lang="ts">
  export let date = undefined;

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedDate = target.value;
    try {
      date = new Date(selectedDate).toISOString()
    } catch (error) {
      date = undefined
    }
  }
</script>

<div class="month-picker">
  <input
    type="month"
    id="month"
    on:change={handleChange}
    class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

