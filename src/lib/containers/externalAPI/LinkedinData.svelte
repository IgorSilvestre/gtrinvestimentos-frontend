<script lang="ts">
	import type { ICompanyLinkedinData } from '$lib/interfaces-validation/ICompanyLinkedinData'

	export let data: ICompanyLinkedinData | undefined
	const linkedinData = data && data.results && data.results.length > 0 ? data.results[0] : undefined
</script>

<main>
	{#if linkedinData}
		{#if linkedinData.description}
			<p><b>Descrição: </b>{linkedinData.description}</p>
		{/if}
		{#if linkedinData.company_size}
			<p class="mt-2"><b>Tamanho aproximado: </b>{linkedinData.company_size}</p>
		{/if}
		{#if linkedinData.employee_count_on_li}
			<p class="mt-2"><b>N Funcionários Registrados: </b>{linkedinData.employee_count_on_li}</p>
		{/if}
		{#if linkedinData.headquarters}
			<p class="mt-2"><b>Localização: </b>{linkedinData.headquarters.fullAddress}</p>
		{/if}
		{#if linkedinData.website}
			<p class="mt-2">
				<b>Website: </b>
				<a href={linkedinData.website} class="underline">
					{linkedinData.website}
				</a>
			</p>
		{/if}
		<div class="mt-2">
			{#if linkedinData.employees_on_li && linkedinData.employees_on_li.length > 0}
				<p><b>Funcionários: (link para o linkedin)</b></p>
				<div class="mt-1">
					{#each linkedinData.employees_on_li as employee}
						<div class="ml-2 mt-1">
							<p class="underline"><a href={employee.link} class="cursor-pointer">{employee.name}</a></p>
							<p class="text-sm">{employee.title}</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>
		<div class="mt-4">
			{#if linkedinData.similar_pages && linkedinData.similar_pages.length > 0}
				<!-- TODO !!! make link take you to deepSearch page not linkedin page -->
				<p><b>Páginas Similares (link para o linkedin)</b></p>
				{#each linkedinData.similar_pages as page}
					<span class="flex flex-row text-center mt-1">
						<a href={page.link} class="flex cursor-pointer">
							<img src={page.logo} alt={page.title + ' logo'} class="w-12 mr-4" />
							<p class="flex items-center underline">{page.title}</p>
						</a>
					</span>
				{/each}
			{/if}
		</div>
	{:else}
		<div class="mt-2 w-1/3 h-0 border border-black" />
		<p class="mt-2"><b>Nenhuma informação do linkedin encontrada!</b></p>
	{/if}
</main>
