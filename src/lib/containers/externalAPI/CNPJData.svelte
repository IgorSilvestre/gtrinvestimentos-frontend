<script lang="ts">
	import type { ICNPJData } from '$lib/interfaces-validation/ICNPJData'

	export let data: ICNPJData
</script>

<main>
	{#if !data}
		<div class="mt-10 m-auto flex justify-center items-center">
			<p><b>Nenhum CNPJ encontrado para empresa!</b></p>
		</div>
		<div class="mt-2 w-1/3 h-0 border border-black" />
	{:else}
		<p><b>Nome: </b>{data.nome}</p>
		<p><b>CNPJ: </b>{data.cnpj}</p>
		<div>
			<p><b>Sócios: </b>{data.qsa && data.qsa.length > 0 ? '' : 'Sem sócios registrados'}</p>
			{#if data.qsa && data.qsa.length > 0}
				<div class="ml-4">
					{#each data.qsa as socio}
						<p>
							{socio.nome}
						</p>
						<p class="text-sm">{socio.qual}</p>
					{/each}
				</div>
			{/if}
		</div>
		{#if data.atividade_principal && data.atividade_principal.length > 0}
			<div>
				<p><b>Atividade Principal: </b></p>
				<li class="ml-4">{data.atividade_principal[0].text}</li>
			</div>
		{/if}
		{#if data.atividades_secundarias && data.atividades_secundarias.length > 0}
			<div>
				<p class="">
					<b>Atividades Secundárias: </b>
				</p>
				<div class="ml-4">
					{#each data.atividades_secundarias as atividade}
						{#if atividade.text}
							<li>{atividade.text}</li>
						{/if}
					{/each}
				</div>
			</div>
		{/if}
		{#if data.natureza_juridica}
			<p><b>Natureza Jurídica: </b>{data.natureza_juridica}</p>
		{/if}
		{#if data.ultima_atualizacao}
			<p><b>Última Atualização: </b>{data.ultima_atualizacao}</p>
		{/if}
		{#if data.tipo}
			<p><b>Tipo: </b>{data.tipo}</p>
		{/if}
		{#if data.data_situacao}
			<p><b>de Abertura: </b>{data.data_situacao}</p>
		{/if}
		{#if data.fantasia}
			<p><b>Nome Fantasia: </b>{data.fantasia}</p>
		{/if}
		<p>
			<b>Endereço: </b>{data.logradouro ? `${data.logradouro},` : ''}
			{data.numero ? `${data.numero},` : ''}
			{data.complemento ? `${data.complemento},` : ''}
			{data.bairro ? `${data.bairro},` : ''}
			{data.municipio ? `${data.municipio},` : ''}
			{data.uf ? `${data.uf}` : ''}
			{data.cep ? `- ${data.cep}` : ''}
		</p>
		{#if data.telefone}
			<p><b>Telefone: </b>{data.telefone}</p>
		{/if}
		{#if data.email}
			<p><b>E-mail: </b>{data.email}</p>
		{/if}
		{#if data.situacao}
			<p><b>Situação: </b>{data.situacao}</p>
		{/if}
		{#if data.data_situacao}
			<p><b>da Situação: </b>{data.data_situacao}</p>
		{/if}
		{#if data.motivo_situacao}
			<p><b>Motivo da Situação: </b>{data.motivo_situacao}</p>
		{/if}
		{#if data.situacao_especial}
			<p><b>Situação Especial: </b>{data.situacao_especial}</p>
		{/if}
		{#if data.data_situacao_especial}
			<p><b>da Situação Especial: </b>{data.data_situacao_especial}</p>
		{/if}
		{#if data.capital_social}
			<p><b>Capital Social: </b>{data.capital_social}</p>
		{/if}
	{/if}
</main>
