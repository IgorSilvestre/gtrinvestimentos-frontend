<script lang='ts'>
  import Tag from '../Tag.svelte';
  import type {ICompany} from '$lib/interfaces-validation/IVCompany';

  export let company: ICompany;
</script>

<div class='bg-white rounded-lg overflow-hidden shadow-lg'>
  <div class='p-4'>
    <h2 class='text-lg font-medium text-gray-900 mb-2'>{company.name}</h2>
    <div class='flex flex-wrap mb-2'>
      {#each company.tags as tag}
        <Tag name={tag.label} />
      {/each}
    </div>
    <p class='text-gray-700 text-sm'>
      <span class='font-bold'> Descrição:</span>
      {company.description}
    </p>
    <p class='text-gray-700 text-sm'>
      <span class='font-bold'>Target:</span>
      {company.target}
    </p>
    <div class='flex flex-col justify-end mt-4'>
      <p class='text-gray-600 text-xs'>Criação: {company.createdAt}</p>
      <p class='text-gray-600 text-xs'>Alterado: {company.lastUpdated}</p>
    </div>
  </div>
</div>
