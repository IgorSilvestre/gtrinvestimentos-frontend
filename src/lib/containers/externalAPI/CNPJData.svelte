<script lang="ts">
	import type { ICNPJData } from '$lib/interfaces-validation/ICNPJData'

	export let data: ICNPJData
</script>

<main>
	<p><b>Nome: </b>{data.nome}</p>
	<p><b>CNPJ: </b>{data.cnpj}</p>
	<p><b>Sócios</b></p>
	<div class="ml-4">
		{#each data.qsa as socio}
			<p>
				{socio.nome}
			</p>
			<p class="text-sm">{socio.qual}</p>
		{/each}
	</div>
	<div>
		<p><b>Atividade Principal: </b></p>
		<li class="ml-4">{data.atividade_principal[0].text}</li>
	</div>
	<div>
		<p class="">
			<b>Atividades Secundárias: </b>
		</p>
		<div class="ml-4">
			{#each data.atividades_secundarias as atividade}
				<li>{atividade.text}</li>
			{/each}
		</div>
	</div>
	<p><b>Natureza Jurídica: </b>{data.natureza_juridica}</p>
	<p><b>Última Atualização: </b>{data.ultima_atualizacao}</p>
	<p><b>Status: </b>{data.status}</p>
	<p><b>Tipo: </b>{data.tipo}</p>
	<p><b>de Abertura: </b>{data.data_situacao}</p>
	<p><b>Nome Fantasia: </b>{data.fantasia}</p>
	<p><b>Logradouro: </b>{data.logradouro}</p>
	<p><b>Número: </b>{data.numero}</p>
	<p><b>Complemento: </b>{data.complemento}</p>
	<p><b>CEP: </b>{data.cep}</p>
	<p><b>Bairro: </b>{data.bairro}</p>
	<p><b>Município: </b>{data.municipio}</p>
	<p><b>UF: </b>{data.uf}</p>
	<p><b>Telefone: </b>{data.telefone}</p>
	<p><b>E-mail: </b>{data.email}</p>
	<p><b>Situação: </b>{data.situacao}</p>
	<p><b>da Situação: </b>{data.data_situacao}</p>
	<p><b>Motivo da Situação: </b>{data.motivo_situacao}</p>
	<p><b>Situação Especial: </b>{data.situacao_especial}</p>
	<p><b>da Situação Especial: </b>{data.data_situacao_especial}</p>
	<p><b>Capital Social: </b>{data.capital_social}</p>
</main>
