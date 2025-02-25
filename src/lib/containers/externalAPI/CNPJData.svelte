<script lang="ts">
	import { fetchBusinessEmail } from '$lib/api/queries/external/fetchBusinessEmail'
	import { toastCopied } from '$lib/config'
	import type { ICNPJData } from '$lib/interfaces-validation/ICNPJData'
	import { copyToClipboard } from '$lib/shared/functions/copyToClipboard'
	import { toastStore } from '@skeletonlabs/skeleton'

	export let data: ICNPJData | undefined
	export let domain: string | undefined
	const emails: { [key: string]: [string, number] } = {}
	let isLoadingEmailButton = false
  let searchedEmails = false

	async function handleButtonFetchEmails() {
		isLoadingEmailButton = true

		if (data?.qsa) {
			for (const socio of data.qsa) {
				let possibleBusinessEmail = await fetchBusinessEmail(socio.nome, domain as string)
				if (possibleBusinessEmail?.score && possibleBusinessEmail?.email)
					emails[socio.nome] = [possibleBusinessEmail.email, possibleBusinessEmail.score]
			}
		}

		isLoadingEmailButton = false
    searchedEmails = true
	}

	function handleCopyEmail(email: string) {
		copyToClipboard(email)
		toastStore.trigger(toastCopied)
	}

	function handleCopyAllEmails() {
		copyToClipboard(Object.values(emails).join('; ').trim())
		toastStore.trigger(toastCopied)
	}

	$: emails
</script>

<main>
	{#if !data}
		<div>
			<p><b>Nenhum CNPJ encontrado para empresa!</b></p>
		</div>
		<div class="mt-2 w-1/3 h-0 border border-black" />
	{:else}
		<p><b>Nome: </b>{data.nome}</p>
		<p class="mt-2"><b>CNPJ: </b>{data.cnpj}</p>
		<div class="mt-2">
			<p><b>Sócios: </b>{data.qsa && data.qsa.length > 0 ? '' : 'Sem sócios registrados'}</p>
			{#if data.qsa && data.qsa.length > 0}
				<div class="ml-4">
					{#each data.qsa as socio}
						<div class="mb-2">
							<p>
								{socio.nome}
							</p>
							<p class="text-sm">{socio.qual}</p>
							{#if emails[socio.nome] && emails[socio.nome].length > 0}
								<p
									on:keypress={() => handleCopyEmail(emails[socio.nome][0])}
									on:click={() => handleCopyEmail(emails[socio.nome][0])}
									class="text-sm text-blue-400 cursor-pointer"
								>
									{emails[socio.nome][0]}
									<span class="text-black">
										{' - nota: ' + emails[socio.nome][1]}
									</span>
								</p>
              {:else if searchedEmails && (!emails[socio.nome] || emails[socio.nome].length <= 0)}
                <p class="text-sm text-red">Email não encontrado</p>
							{/if}
						</div>
					{/each}
					{#if domain && domain.length > 0}
						{#if isLoadingEmailButton}
							<p>Carregando...</p>
						{:else if emails && Object.keys(emails).length > 0}
							<button
								on:click={handleCopyAllEmails}
								class="bg-green-500 p-1 rounded-sm text-sm mt-2 text-white font-bold"
								>Copiar todos</button
							>
						{:else if !searchedEmails}
							<button
								on:click={handleButtonFetchEmails}
								class="bg-blue-500 p-1 rounded-sm text-sm mt-2 text-white font-bold"
								>Buscar E-mails</button
							>
						{/if}
					{/if}
				</div>
			{/if}
		</div>
		{#if data.atividade_principal && data.atividade_principal.length > 0}
			<div class="mt-2">
				<p><b>Atividade Principal: </b></p>
				<li class="ml-4">{data.atividade_principal[0].text}</li>
			</div>
		{/if}
		{#if data.atividades_secundarias && data.atividades_secundarias.length > 0}
			<div class="mt-2">
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
			<p class="mt-2"><b>Natureza Jurídica: </b>{data.natureza_juridica}</p>
		{/if}
		{#if data.ultima_atualizacao}
			<p class="mt-2"><b>Última Atualização: </b>{data.ultima_atualizacao}</p>
		{/if}
		{#if data.tipo}
			<p class="mt-2"><b>Tipo: </b>{data.tipo}</p>
		{/if}
		{#if data.data_situacao}
			<p class="mt-2"><b>de Abertura: </b>{data.data_situacao}</p>
		{/if}
		{#if data.fantasia}
			<p class="mt-2"><b>Nome Fantasia: </b>{data.fantasia}</p>
		{/if}
		<p class="mt-2">
			<b>Endereço: </b>{data.logradouro ? `${data.logradouro},` : ''}
			{data.numero ? `${data.numero},` : ''}
			{data.complemento ? `${data.complemento},` : ''}
			{data.bairro ? `${data.bairro},` : ''}
			{data.municipio ? `${data.municipio},` : ''}
			{data.uf ? `${data.uf}` : ''}
			{data.cep ? `- ${data.cep}` : ''}
		</p>
		{#if data.telefone}
			<p class="mt-2"><b>Telefone: </b>{data.telefone}</p>
		{/if}
		{#if data.email}
			<p class="mt-2"><b>E-mail: </b>{data.email}</p>
		{/if}
		{#if data.situacao}
			<p class="mt-2">
				<b>Situação: </b>{data.situacao}
				{data.data_situacao ? data.data_situacao : ''}
			</p>
		{/if}
		{#if data.motivo_situacao}
			<p class="mt-2"><b>Motivo da Situação: </b>{data.motivo_situacao}</p>
		{/if}
		{#if data.situacao_especial}
			<p class="mt-2"><b>Situação Especial: </b>{data.situacao_especial}</p>
		{/if}
		{#if data.data_situacao_especial}
			<p class="mt-2"><b>da Situação Especial: </b>{data.data_situacao_especial}</p>
		{/if}
		{#if data.capital_social}
			<p class="mt-2"><b>Capital Social: </b>{data.capital_social}</p>
		{/if}
	{/if}
</main>
