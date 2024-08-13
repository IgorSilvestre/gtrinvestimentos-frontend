<script lang="ts">
    import type { IAsset } from '$lib/interfaces-validation/IVAsset';
    import Tag from '$lib/modules/Tag.svelte';
	import { parseISODateToBrazilSTD } from '$lib/shared/functions/parseISODateToBrazilSTD'

    export let asset: IAsset;

    const isValid = (value: any) => value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0);
</script>

<main class="max-w-3xl mx-auto p-8 space-y-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-gray-800">{asset.name}</h1>
    <p class="text-sm font-thin text-gray-900">
        {asset?.street ? asset?.street + ', ' : ''}
        {asset?.addressComplement ? asset?.addressComplement + ', ' : ''}
        {asset?.neighborhood ? asset?.neighborhood + ', ' : ''}
        {asset?.city ? asset?.city + '- ' : ''}
        {asset?.state ? asset?.state : ''}
    </p>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-300 pb-4">
        {#if isValid(asset.tags)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Tags</h2>
                <div class="flex flex-wrap gap-2">
                    {#each asset.tags as tag}
                        <Tag name={tag.label} color="primary" />
                    {/each}
                </div>
            </div>
        {/if}
        {#if isValid(asset.priceInReais)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Preço (R$ )</h2>
                <p class="text-gray-600">R$  {(asset.priceInReais).toLocaleString()}</p>
            </div>
        {/if}
        {#if isValid(asset.description)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Descrição</h2>
                <p class="text-gray-600">{asset.description}</p>
            </div>
        {/if}
        {#if isValid(asset.monthlyRentInReais)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Aluguel Mensal (R$ )</h2>
                <p class="text-gray-600">R$  {(asset.monthlyRentInReais).toLocaleString()}</p>
            </div>
        {/if}

        {#if isValid(asset.landAreaM2)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Área do Terreno (m²)</h2>
                <p class="text-gray-600">{(asset.landAreaM2).toLocaleString()} m²</p>
            </div>
        {/if}

        {#if isValid(asset.constructedAreaM2)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Área Construída ABL (m²)</h2>
                <p class="text-gray-600">{(asset.constructedAreaM2).toLocaleString()} m²</p>
            </div>
        {/if}

        {#if isValid(asset.zoning)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Zoneamento</h2>
                <div class="flex flex-wrap gap-2">
                    {#each (asset.zoning || []) as zone (zone)}
                        <Tag name={zone} color="secondary" />
                    {/each}
                </div>
            </div>
        {/if}

        {#if isValid(asset.tenant)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Locatário</h2>
                <p class="text-gray-600">{asset.tenant}</p>
            </div>
        {/if}

        {#if isValid(asset.contractTerm)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Prazo do Contrato</h2>
                <p class="text-gray-600">{new Date(asset.contractTerm).toLocaleDateString()}</p>
            </div>
        {/if}

        {#if isValid(asset.docLink)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Link Drive</h2>
                <a class="text-blue-600 hover:underline" href="{asset.docLink}" target="_blank">Ver Documento</a>
            </div>
        {/if}

        {#if isValid(asset.isForSale)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Está à Venda</h2>
                <p class="text-gray-600">{asset.isForSale ? 'Sim' : 'Não'}</p>
            </div>
        {/if}
        {#if isValid(asset.partnershipPercentage)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Quanto aceita em permuta</h2>
                <p class="text-gray-600">{asset.partnershipPercentage}%</p>
            </div>
        {/if}
        {#if isValid(asset.downPaymentInReais)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Entrada R$ </h2>
                <p class="text-gray-600">{asset.downPaymentInReais}</p>
            </div>
        {/if}
        {#if isValid(asset.capRatePercentage)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">CapRate</h2>
                <p class="text-gray-600">{asset.capRatePercentage}%</p>
            </div>
        {/if}
        {#if isValid(asset.kmFromSP)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Km de SP</h2>
                <p class="text-gray-600">{asset.kmFromSP}km</p>
            </div>
        {/if}
        {#if isValid(asset.vgvInReais)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">VGV</h2>
                <p class="text-gray-600">R$ {asset.vgvInReais}</p>
            </div>
        {/if}
        {#if isValid(asset.environmentalAreaPercentage)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Área Ambiental</h2>
                <p class="text-gray-600">{asset.environmentalAreaPercentage}%</p>
            </div>
        {/if}
        {#if isValid(asset.anualRevenueInReais)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Faturamento Anual</h2>
                <p class="text-gray-600">{'R$  ' + asset.anualRevenueInReais}</p>
            </div>
        {/if}
        {#if isValid(asset.marginEBITDA)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">EBITDA</h2>
                <p class="text-gray-600">{asset.marginEBITDA}%</p>
            </div>
        {/if}
        {#if isValid(asset.privateDebtInReais)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">EBITDA</h2>
                <p class="text-gray-600">R$ {asset.privateDebtInReais}</p>
            </div>
        {/if}
        {#if isValid(asset.laborDebtInReais)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Dívida Trabalhista</h2>
                <p class="text-gray-600">R$ {asset.laborDebtInReais}</p>
            </div>
        {/if}
        {#if isValid(asset.publicDebtInReais)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Dívida Tributária</h2>
                <p class="text-gray-600">R$ {asset.publicDebtInReais}</p>
            </div>
        {/if}
        {#if isValid(asset.valuationPriceInReais)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Company Value</h2>
                <p class="text-gray-600">R$ {asset.valuationPriceInReais}</p>
            </div>
        {/if}
        {#if isValid(asset.cashOrEquivalentInReais)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Caixa ou Equivalente</h2>
                <p class="text-gray-600">R$ {asset.cashOrEquivalentInReais}</p>
            </div>
        {/if}
        {#if isValid(asset.numberOfEmployees)}
            <div>
                <h2 class="text-lg font-semibold text-gray-700">Número de Funcionários</h2>
                <p class="text-gray-600">{asset.numberOfEmployees}</p>
            </div>
        {/if}
        <div class="flex flex-col justify-end mt-2">
            <p class="text-gray-600 text-xs">Criação: {parseISODateToBrazilSTD(asset?.createdAt)}</p>
            <p class="text-gray-600 text-xs">Última alteração: {parseISODateToBrazilSTD(asset?.lastUpdated)}</p>
        </div>
    </section>
</main>
