<script lang="ts">
	import { goto } from '$app/navigation'
	import { toastCopied } from '$lib/config'
	import type { IAssetShow } from '$lib/interfaces-validation/IVAsset'
	import Tag from '$lib/modules/Tag.svelte'
	import { toLocaleStringBrazil } from '$lib/shared/functions/toLocaleStringBrazil'
	import { toastStore } from '@skeletonlabs/skeleton'

	export let asset: IAssetShow

	const isValid = (value: any) =>
		value !== undefined &&
		value !== null &&
		value !== '' &&
		!(Array.isArray(value) && value.length === 0)

	const copyAssetInfo = () => {
		let assetInfo = `*${asset.name}*\n`
		assetInfo += `${
			asset?.address + (asset?.addressComplement ? ' - ' + asset?.addressComplement : '')
		}\n\n`

		if (isValid(asset.priceInReais)) {
			assetInfo += `Preço: R$ ${toLocaleStringBrazil(asset.priceInReais)}\n`
		}
		if (isValid(asset.monthlyRentInReais)) {
			assetInfo += `Aluguel Mensal: R$ ${toLocaleStringBrazil(asset.monthlyRentInReais)}\n`
		}
		if (isValid(asset.landAreaM2)) {
			assetInfo += `Área do Terreno: ${toLocaleStringBrazil(asset.landAreaM2)} m²\n`
		}
		if (isValid(asset.constructedAreaM2)) {
			assetInfo += `Área Construída ABL: ${toLocaleStringBrazil(asset.constructedAreaM2)} m²\n`
		}
		if (isValid(asset.tenant)) {
			assetInfo += `Locatário: ${asset.tenant}\n`
		}
		if (isValid(asset.contractTerm)) {
			assetInfo += `Prazo do Contrato: ${new Date(asset.contractTerm).toLocaleDateString('pt-BR', {
				year: 'numeric',
				month: 'long'
			})}\n`
		}
		if (isValid(asset.isAtypicalContract)) {
			assetInfo += `Contrato Atípico: SIM\n`
		}
		if (isValid(asset.capRatePercentage)) {
			assetInfo += `CapRate: ${asset.capRatePercentage} %\n`
		}
		if (isValid(asset.partnershipPercentage)) {
			assetInfo += `Permuta: ${asset.partnershipPercentage} %\n`
		}
		if (isValid(asset.downPaymentInReais)) {
			assetInfo += `Entrada: R$ ${toLocaleStringBrazil(asset.downPaymentInReais)}\n`
		}
		if (isValid(asset.kmFromSP)) {
			assetInfo += `Km de SP: ${asset.kmFromSP} km\n`
		}
		if (isValid(asset.vgvInReais)) {
			assetInfo += `VGV: R$ ${toLocaleStringBrazil(asset.vgvInReais)}\n`
		}
		if (isValid(asset.environmentalAreaPercentage)) {
			assetInfo += `Área Ambiental: ${asset.environmentalAreaPercentage} %\n`
		}
		if (isValid(asset.anualRevenueInReais)) {
			assetInfo += `Faturamento Anual: R$ ${toLocaleStringBrazil(asset.anualRevenueInReais)}\n`
		}
		if (isValid(asset.marginEBITDA)) {
			assetInfo += `EBITDA: ${asset.marginEBITDA} %\n`
		}
		if (isValid(asset.privateDebtInReais)) {
			assetInfo += `Dívida Bancos: R$ ${toLocaleStringBrazil(asset.privateDebtInReais)}\n`
		}
		if (isValid(asset.laborDebtInReais)) {
			assetInfo += `Dívida Trabalhista: R$ ${toLocaleStringBrazil(asset.laborDebtInReais)}\n`
		}
		if (isValid(asset.publicDebtInReais)) {
			assetInfo += `Dívida Tributária: R$ ${toLocaleStringBrazil(asset.publicDebtInReais)}\n`
		}
		if (isValid(asset.valuationPriceInReais)) {
			assetInfo += `Company Value: R$ ${toLocaleStringBrazil(asset.valuationPriceInReais)}\n`
		}
		if (isValid(asset.cashOrEquivalentInReais)) {
			assetInfo += `Caixa ou Equivalente: R$ ${toLocaleStringBrazil(
				asset.cashOrEquivalentInReais
			)}\n`
		}
		if (isValid(asset.numberOfEmployees)) {
			assetInfo += `Número de Funcionários: ${asset.numberOfEmployees}\n`
		}
		if (isValid(asset.energyOffTaker)) {
			assetInfo += `Tomador de Energia: ${asset.energyOffTaker}\n`
		}
		if (isValid(asset.energyInstalledCapacityInMWp)) {
			assetInfo += `Energia em MWp: ${asset.energyInstalledCapacityInMWp}\n`
		}
		if (isValid(asset.ppaInReaisToMWh)) {
			assetInfo += `Valor PPA: ${toLocaleStringBrazil(asset.ppaInReaisToMWh)} R$/MWh\n`
		}
		if (isValid(asset.constructionStartDate)) {
			assetInfo += `Data Início da Construção: ${new Date(asset.constructionStartDate).toLocaleDateString('pt-BR', {
				year: 'numeric',
				month: 'long'
			})}\n`
		}
		if (isValid(asset.projectAproveDate)) {
			assetInfo += `Data de Aprovação Projeto: ${new Date(asset.constructionStartDate).toLocaleDateString('pt-BR', {
				year: 'numeric',
				month: 'long'
			})}\n`
		}
		if (isValid(asset.capexInReais)) {
			assetInfo += `Capex de Obra: R$ ${toLocaleStringBrazil(asset.capexInReais)}\n`
		}
		navigator.clipboard.writeText(assetInfo).then(() => {
			toastStore.trigger(toastCopied)
		})
	}
</script>

<main class="max-w-xl mx-auto px-8 pt-4 space-y-6 bg-white rounded-lg shadow-lg relative">
	{#if isValid(asset.docLink)}
		<div class="flex justify-end">
			<a
				class="text-lg font-semibold text-white variant-filled-primary p-2 rounded-[5px]"
				href={asset.docLink}
				target="_blank"
			>
				Acesso Drive
			</a>
		</div>
	{/if}
	{#if asset?.imgURL}
		<img class="w-full rounded-[5px]" src={asset.imgURL} alt="Imagem Ativo" />
	{/if}
	<h1 class="pt-2 text-3xl font-bold text-gray-800 font-montserrat">{asset.name}</h1>
	<p class="text-sm font-montserrat">
		{asset?.address + (asset?.addressComplement ? ' - ' + asset?.addressComplement : '')}
	</p>
	<ul class="border-b border-gray-300 pb-4">
		{#if isValid(asset.isForSale)}
			<li class="">
				<span class="text-gray-700">Está à Venda</span>
				<span class="text-gray-600">{asset.isForSale ? 'SIM' : 'NÃO'}</span>
			</li>
		{/if}
		{#if isValid(asset.priceInReais)}
			<li class="">
				<span class="text-gray-700">Preço</span>
				<span class="text-gray-600">R$ {toLocaleStringBrazil(asset.priceInReais)}</span>
			</li>
		{/if}
		{#if isValid(asset.monthlyRentInReais)}
			<li class="">
				<span class="text-gray-700">Aluguel Mensal</span>
				<span class="text-gray-600">R$ {toLocaleStringBrazil(asset.monthlyRentInReais)}</span>
			</li>
		{/if}

		{#if isValid(asset.landAreaM2)}
			<li class="">
				<span class="text-gray-700">Área do Terreno</span>
				<span class="text-gray-600">{toLocaleStringBrazil(asset.landAreaM2)} m²</span>
			</li>
		{/if}

		{#if isValid(asset.constructedAreaM2)}
			<li class="">
				<span class="text-gray-700">Área Construída ABL</span>
				<span class="text-gray-600">{toLocaleStringBrazil(asset.constructedAreaM2)} m²</span>
			</li>
		{/if}

		{#if asset?.zoning && asset.zoning.length > 0 && isValid(asset.zoning)}
			<li class="">
				<span class="text-gray-700">Zoneamento</span>
				<span class="flex flex-col gap-2">
					{#each asset.zoning || [] as zone (zone)}
						<Tag name={zone.label} />
					{/each}
				</span>
			</li>
		{/if}

		{#if isValid(asset.tenant)}
			<li class="">
				<span class="text-gray-700">Locatário</span>
				<span class="text-gray-600">{asset.tenant}</span>
			</li>
		{/if}

		{#if isValid(asset.contractTerm)}
			<li class="">
				<span class="text-gray-700">Prazo do Contrato</span>
				<span class="text-gray-600"
					>{new Date(asset.contractTerm).toLocaleDateString('pt-BR', {
						year: 'numeric',
						month: 'long'
					})}</span
				>
			</li>
		{/if}
		{#if isValid(asset.isAtypicalContract)}
			<li class="">
				<span class="text-gray-700">Tipo de Contrato Atípico</span>
				<span class="text-gray-600">SIM</span>
			</li>
		{/if}
		<!-- {#if isValid(asset.tags)} -->
		<!-- 	<li class=""> -->
		<!-- 		<span class="text-gray-700">Tags</span> -->
		<!-- 		<span class="flex flex-col gap-2"> -->
		<!-- 			{#each asset.tags as tag} -->
		<!-- 				<Tag name={tag.label} color="black" /> -->
		<!-- 			{/each} -->
		<!-- 		</span> -->
		<!-- 	</li> -->
		<!-- {/if} -->
		{#if isValid(asset.description)}
			<li class="">
				<span class="text-gray-700">Descrição</span>
				<span class="text-gray-600 text-justify">{asset.description}</span>
			</li>
		{/if}
		{#if isValid(asset.partnershipPercentage)}
			<li class="">
				<span class="text-gray-700">Quanto aceita em permuta</span>
				<span class="text-gray-600">{asset.partnershipPercentage} %</span>
			</li>
		{/if}
		{#if isValid(asset.downPaymentInReais)}
			<li class="">
				<span class="text-gray-700">Entrada</span>
				<span class="text-gray-600">{toLocaleStringBrazil(asset.downPaymentInReais)}</span>
			</li>
		{/if}
		{#if isValid(asset.capRatePercentage)}
			<li class="">
				<span class="text-gray-700">CapRate</span>
				<span class="text-gray-600">{asset.capRatePercentage} %</span>
			</li>
		{/if}
		{#if isValid(asset.kmFromSP)}
			<li class="">
				<span class="text-gray-700">Km de SP</span>
				<span class="text-gray-600">{asset.kmFromSP} km</span>
			</li>
		{/if}
		{#if isValid(asset.vgvInReais)}
			<li class="">
				<span class="text-gray-700">VGV</span>
				<span class="text-gray-600">R$ {toLocaleStringBrazil(asset.vgvInReais)}</span>
			</li>
		{/if}
		{#if isValid(asset.environmentalAreaPercentage)}
			<li class="">
				<span class="text-gray-700">Área Ambiental</span>
				<span class="text-gray-600">{asset.environmentalAreaPercentage} %</span>
			</li>
		{/if}
		{#if isValid(asset.anualRevenueInReais)}
			<li class="">
				<span class="text-gray-700">Faturamento Anual</span>
				<span class="text-gray-600">R$ {toLocaleStringBrazil(asset.anualRevenueInReais)}</span>
			</li>
		{/if}
		{#if isValid(asset.marginEBITDA)}
			<li class="">
				<span class="text-gray-700">EBITDA</span>
				<span class="text-gray-600">{asset.marginEBITDA} %</span>
			</li>
		{/if}
		{#if isValid(asset.privateDebtInReais)}
			<li class="">
				<span class="text-gray-700">Dívida Bancos</span>
				<span class="text-gray-600">R$ {toLocaleStringBrazil(asset.privateDebtInReais)}</span>
			</li>
		{/if}
		{#if isValid(asset.laborDebtInReais)}
			<li>
				<span class="text-gray-700">Dívida Trabalhista</span>
				<span class="text-gray-600">R$ {toLocaleStringBrazil(asset.laborDebtInReais)}</span>
			</li>
		{/if}
		{#if isValid(asset.publicDebtInReais)}
			<li>
				<span class="text-gray-700">Dívida Tributária</span>
				<span class="text-gray-600">R$ {toLocaleStringBrazil(asset.publicDebtInReais)}</span>
			</li>
		{/if}
		{#if isValid(asset.valuationPriceInReais)}
			<li>
				<span class="text-gray-700">Company Value</span>
				<span class="text-gray-600">R$ {toLocaleStringBrazil(asset.valuationPriceInReais)}</span>
			</li>
		{/if}
		{#if isValid(asset.cashOrEquivalentInReais)}
			<li>
				<span class="text-gray-700">Caixa ou Equivalente</span>
				<span class="text-gray-600">R$ {toLocaleStringBrazil(asset.cashOrEquivalentInReais)}</span>
			</li>
		{/if}
		{#if isValid(asset.numberOfEmployees)}
			<li>
				<span class="text-gray-700">Número de Funcionários</span>
				<span class="text-gray-600">{asset.numberOfEmployees}</span>
			</li>
		{/if}
		{#if isValid(asset.energyOffTaker)}
			<li>
				<span class="text-gray-700">Tomador de Energia</span>
				<span class="text-gray-600">{asset.energyOffTaker}</span>
			</li>
		{/if}
		{#if isValid(asset.energyInstalledCapacityInMWp)}
			<li>
				<span class="text-gray-700">Energia em MWp</span>
				<span class="text-gray-600">{asset.energyInstalledCapacityInMWp}</span>
			</li>
		{/if}
		{#if isValid(asset.ppaInReaisToMWh)}
			<li>
				<span class="text-gray-700">Valor PPA R$/MWh</span>
				<span class="text-gray-600">{asset.ppaInReaisToMWh}</span>
			</li>
		{/if}
		{#if isValid(asset.constructionStartDate)}
			<li>
				<span class="text-gray-700">Data Início da Construção</span>
				<span class="text-gray-600">{asset.constructionStartDate}</span>
			</li>
		{/if}
		{#if isValid(asset.projectAproveDate)}
			<li>
				<span class="text-gray-700">Data de Aprovação Projeto</span>
				<span class="text-gray-600">{asset.projectAproveDate}</span>
			</li>
		{/if}
		{#if isValid(asset.capexInReais)}
			<li>
				<span class="text-gray-700">Capex de Obra</span>
				<span class="text-gray-600">{asset.capexInReais}</span>
			</li>
		{/if}
		<li class="flex flex-col justify-end mt-2">
			<p class="text-gray-600 text-xs">Criação: {asset?.createdAt}</p>
			<p class="text-gray-600 text-xs">Última alteração: {asset?.lastUpdated}</p>
		</li>
	</ul>
	<div class="flex justify-end pb-2">
		<button
			type="button"
			class="mr-8 font-bold text-blue-500"
			on:click={(e) => {
				e.preventDefault()
				copyAssetInfo()
			}}
		>
			Copiar Ativo
		</button>
		<button
			type="button"
			class="font-bold text-blue-500"
			on:click={(e) => {
				e.preventDefault()
				goto('/asset/edit/' + asset?._id)
			}}
		>
			Editar
		</button>
	</div>
</main>

<style>
	main {
		font-family: 'Calibre Web', sans-serif;
	}
	li {
		display: flex;
		justify-content: space-between;
		vertical-align: baseline;
		font-size: 100%;
		margin-bottom: 10px;
	}
	li span:nth-child(1) {
		margin-right: 20px;
	}
	li span:nth-child(2) {
		font-weight: 600;
		color: #33333;
	}
</style>
