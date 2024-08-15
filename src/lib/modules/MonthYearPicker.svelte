<script lang="ts">
  export let date: string | undefined = undefined;

  // Format the incoming date to YYYY-MM if it's defined
  let formattedDate: string | undefined = date ? date.slice(0, 7) : undefined;

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedDate = target.value;

    try {
      // Convert the selected date to ISO format
      date = new Date(`${selectedDate}-01`).toISOString();
    } catch (error) {
      date = undefined;
    }
  }
</script>

<div class="month-picker">
  <input
    type="month"
    id="month"
    on:change={handleChange}
    class="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    bind:value={formattedDate}
  />
</div>

