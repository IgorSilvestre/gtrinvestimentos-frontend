<script lang="ts">
	import Tag from '../../modules/Tag.svelte'
	import { fly } from 'svelte/transition'
	import { transitionOptions } from '$lib/config'
	import type { IAssetShow } from '$lib/interfaces-validation/IVAsset'
	import { parseISODateToBrazilSTD } from '$lib/shared/functions/parseISODateToBrazilSTD'

	export let asset: IAssetShow
</script>

<div
	class="w-full h-full bg-white rounded-lg overflow-hidden shadow-lg border-solid border-2"
	in:fly={transitionOptions.defaultFlyEntry}
	goto={asset?.id ? `/asset/${asset?._id}` : '#'}
>
	<a href={`/asset/${asset._id}`} in:fly={transitionOptions.defaultFlyEntry}>
		<div class="p-4">
			{#if asset?.imgURL}
				<div
					class="mb-2 w-full h-[260px] md:h-[360px] flex items-center justify-center rounded-[5px] overflow-hidden"
				>
					<img class="w-full h-auto object-contain" src={asset.imgURL} alt="Imagem Ativo" />
				</div>
			{/if}
			<h2 class="text-lg font-medium text-gray-900">{asset?.name}</h2>
			<p class="text-xs font-montserrat text-gray-900 mb-2">
				{asset?.neighborhood ? asset?.neighborhood + ', ' : ''}
				{asset?.city ? asset?.city + ', ' : ''}
				{asset?.state ? asset?.state : ''}
			</p>
			<div class="flex flex-wrap mb-2">
				{#if asset?.tags && asset?.tags.length > 0}
					{#each asset?.tags as tag}
						<Tag color="primary" name={tag.label} />
					{/each}
				{/if}
			</div>
			<div class="flex justify-between">
				<div class="flex flex-col justify-end mt-2">
					<p class="text-gray-600 text-xs">Criação: {parseISODateToBrazilSTD(asset?.createdAt)}</p>
					<p class="text-gray-600 text-xs">
						Última alteração: {parseISODateToBrazilSTD(asset?.lastUpdated)}
					</p>
				</div>
			</div>
		</div>
	</a>
</div>
