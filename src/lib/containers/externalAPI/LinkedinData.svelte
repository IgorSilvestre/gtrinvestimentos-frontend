<script lang="ts">
	import type { ICompanyLinkedinData } from '$lib/interfaces-validation/ICompanyLinkedinData'
	import { object } from 'yup'

	export let data: ICompanyLinkedinData
	const linkedinData = data && Object.keys(data).length > 1 ? data.results[0] : undefined
</script>

<main>
	{#if linkedinData}
		{#if linkedinData.description}
			<p><b>Descrição: </b>{linkedinData.description}</p>
		{/if}
		{#if linkedinData.company_size}
			<p><b>Tamanho aproximado: </b>{linkedinData.company_size}</p>
		{/if}
		{#if linkedinData.employee_count_on_li}
			<p><b>N Funcionários Registrados: </b>{linkedinData.employee_count_on_li}</p>
		{/if}
		{#if linkedinData.headquarters}
			<p><b>Localização: </b>{linkedinData.headquarters.fullAddress}</p>
		{/if}
		{#if linkedinData.website}
			<p>
				<b>Website: </b>
				<a href={linkedinData.website} class="text-blue-400">
					{linkedinData.website}
				</a>
			</p>
		{/if}
		<div class="mt-4">
			{#if linkedinData.employees_on_li && linkedinData.employees_on_li.length > 0}
				<p><b>Funcionários: </b></p>
				{#each linkedinData.employees_on_li as employee}
					<p class="cursor-pointer mt-2"><a href={employee.link}>{employee.name}</a></p>
					<p class="text-sm">{employee.title}</p>
				{/each}
			{/if}
		</div>
		<div class="mt-4">
			{#if linkedinData.similar_pages && linkedinData.similar_pages.length > 0}
			<!-- TODO !!! fazer link levar para deepSearch da empresa -->
				<p><b>Páginas Similares (link para o linkedin)</b></p>
				{#each linkedinData.similar_pages as page}
					<a href={page.link}>
						<div class="flex flex-row text-center cursor-pointer mt-1">
							<img src={page.logo} alt={page.title + ' logo'} class="w-12 mr-4" />
							<p>{page.title}</p>
						</div>
					</a>
				{/each}
			{/if}
		</div>
	{:else}
	<div class="mt-2 w-1/3 h-0 border border-black" />
		<p class="mt-2"><b>Nenhuma informação do linkedin encontrada!</b></p>
	{/if}
</main>
