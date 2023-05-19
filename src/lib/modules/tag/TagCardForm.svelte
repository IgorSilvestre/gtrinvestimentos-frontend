<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import type { ITag } from "$lib/interfaces-validation/IVTag";
  import { VTag } from "$lib/interfaces-validation/IVTag";
  import Icon from "@iconify/svelte"


  export let tag: ITag;

  let isEditing = false;

  const { form, errors, touched, handleChange, handleSubmit } = createForm({
    initialValues: {
      label: tag?.label ?? ""
    },
    validationSchema: VTag,
    onSubmit: (values) => {
      console.log("Submitted values:", values);
      // Perform your submit logic here
    }
  });
</script>

<div>
  {#if isEditing}
    <form on:submit={handleSubmit}>
      <div>
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={$form.label}
          on:change={handleChange}
        />
        {#if $touched.label && $errors.label}
          <p>{$errors.label}</p>
        {/if}
      </div>
      <button type="submit">Submit</button>
    </form>
  {:else}
    <div class="bg-white rounded-lg overflow-hidden shadow-lg border-solid border-2 mx-4 my-2">
      <div class="p-4 flex justify-between items-center">
        <h2 class="text-lg font-medium text-gray-900 mb-2">{tag?.label}</h2>
        <div>
          <Icon icon="ic:baseline-edit" color="black" />
        </div>
      </div>
    </div>
  {/if}
</div>
