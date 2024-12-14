<script lang="ts">
    import type { IAsset } from '$lib/interfaces-validation/IVAsset';

    export let assets: IAsset[] = [];

    // Define all potential fields
    const allFields: { key: keyof IAsset; label: string }[] = [
        { key: 'name', label: 'Nome' },
        { key: 'tags', label: 'Tags' },
        { key: 'priceInReais', label: 'Preço (R$)' },
        { key: 'contractTerm', label: 'Prazo Contrato' },
        { key: 'isForSale', label: 'A venda?' },
        { key: 'partnershipPercentage', label: 'Parceria (%)' },
        { key: 'downPaymentInReais', label: 'Entrada (R$)' },
        { key: 'privateDebtInReais', label: 'Dívida Bancos (R$)' },
        { key: 'laborDebtInReais', label: 'Dívida trabalhista (R$)' },
        { key: 'publicDebtInReais', label: 'Dívida Pública (R$)' },
        { key: 'description', label: 'Descrição' },
        { key: 'tenant', label: 'Locatário' },
        { key: 'capRatePercentage', label: 'Cap Rate (%)' },
        { key: 'monthlyRentInReais', label: 'Aluguel Mensal (R$)' },
        { key: 'kmFromSP', label: 'Km de São Paulo' },
        { key: 'landAreaM2', label: 'Área Total (m²)' },
        { key: 'constructedAreaM2', label: 'Área Construida (m²)' },
        { key: 'vgvInReais', label: 'VGV (R$)' },
        { key: 'environmentalAreaPercentage', label: 'Área Ambiental (%)' },
        { key: 'isAtypicalContract', label: 'Contrato Atípico?' },
        { key: 'valuationPriceInReais', label: 'Valuation (R$)' },
        { key: 'marginEBITDA', label: 'Margem EBITDA (%)' },
        { key: 'anualRevenueInReais', label: 'Faturamento Anual (R$)' },
        { key: 'numberOfEmployees', label: 'Nº Funcionários' },
        { key: 'cashOrEquivalentInReais', label: 'Caixa ou Equivalente (R$)' },
        { key: 'docLink', label: 'Link Documentos' },
        { key: 'address', label: 'Endereço' },
        { key: 'addressComplement', label: 'Complemento Endereço' },
        { key: 'contact', label: 'Contato' },
        { key: 'zoning', label: 'Zoneamento' },
        { key: 'energyOffTaker', label: 'Energia Off-taker' },
        { key: 'energyInstalledCapacityInMWp', label: 'Capacidade Instalada (MWp)' },
        { key: 'projectAproveDate', label: 'Data Aprovação Projeto' },
        { key: 'constructionStartDate', label: 'Data Início Construção' },
        { key: 'ppaInReaisToMWh', label: 'PPA (R$/MWh)' },
        { key: 'capexInReais', label: 'CAPEX (R$)' },
        { key: 'createdAt', label: 'Criado em' },
        { key: 'lastUpdated', label: 'Atualizado em' },
    ];

    // Filter fields to only include those that have at least one non-empty value in the data
    const filteredFields = allFields.filter(({ key }) =>
        assets.some((asset) => {
            const value = asset?.[key];
            if (Array.isArray(value)) return value.length > 0; // Arrays
            if (typeof value === 'object') return value !== null; // Objects
            return value !== undefined && value !== ''; // Primitives
        })
    );

    // Helper functions
    const formatDate = (date?: Date): string =>
        date ? new Date(date).toLocaleDateString('pt-BR') : '';

    const formatContractTerm = (date?: string): string => {
        if (!date) return '';
        const parsedDate = new Date(date);
        return isNaN(parsedDate.getTime())
            ? ''
            : `${String(parsedDate.getMonth() + 1).padStart(2, '0')}/${parsedDate.getFullYear()}`;
    };

    const formatCurrency = (value?: number): string =>
        value !== undefined ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';

    const formatNumber = (value?: number): string =>
        value !== undefined ? value.toLocaleString('pt-BR') : '';

    const formatBoolean = (value?: boolean): string =>
        value === true ? 'Yes' : value === false ? 'No' : '';

    const formatArray = (arr?: any[]): string =>
        arr && arr.length > 0 ? arr.map((item) => item?.label || item?.toString()).join(', ') : '';

    const formatContact = (contact?: any): string =>
        contact ? `${contact.name || ''} (${contact.email || ''})` : '';

    const formatLink = (link?: string): string =>
        link ? `<a href="${link}" target="_blank" class="text-blue-500 underline">Open Link</a>` : '';
</script>

<div class="overflow-x-auto">
    <table class="table-auto w-full border-collapse border border-gray-300">
        <!-- Headers -->
        <thead>
            <tr class="bg-gray-100">
                {#each filteredFields as field}
                    <th class="px-4 py-2 border border-gray-300 text-left">{field.label}</th>
                {/each}
            </tr>
        </thead>

        <!-- Rows -->
        <tbody>
            {#if assets.length > 0}
                {#each assets as asset}
                    <tr class="even:bg-gray-50 odd:bg-white">
                        {#each filteredFields as field}
                            <td
                                class="px-4 py-2 border border-gray-300 {field.key === 'address' ? 'whitespace-nowrap' : ''}">
                                {#if field.key === 'tags' || field.key === 'zoning'}
                                    {formatArray(asset?.[field.key])}
                                {:else if field.key === 'priceInReais'
                                    || field.key === 'monthlyRentInReais'
                                    || field.key === 'valuationPriceInReais'
                                    || field.key === 'capexInReais'
                                    || field.key === 'ppaInReaisToMWh'
                                    || field.key === 'vgvInReais'
                                    || field.key === 'cashOrEquivalentInReais'
                                    || field.key === 'privateDebtInReais'
                                    || field.key === 'laborDebtInReais'
                                    || field.key === 'publicDebtInReais'
                                    || field.key === 'downPaymentInReais'}
                                    {formatCurrency(asset?.[field.key])}
                                {:else if field.key === 'isForSale' || field.key === 'isAtypicalContract'}
                                    {formatBoolean(asset?.[field.key])}
                                {:else if field.key === 'contractTerm'}
                                    {formatContractTerm(asset?.[field.key])}
                                {:else if field.key === 'createdAt' || field.key === 'lastUpdated' || field.key === 'projectAproveDate' || field.key === 'constructionStartDate'}
                                    {formatDate(asset?.[field.key])}
                                {:else if field.key === 'contact'}
                                    {formatContact(asset?.[field.key])}
                                {:else if field.key === 'docLink'}
                                    {@html formatLink(asset?.[field.key])}
                                {:else if typeof asset?.[field.key] === 'number'}
                                    {formatNumber(asset?.[field.key])}
                                {:else}
                                    {asset?.[field.key] || ''}
                                {/if}
                            </td>
                        {/each}
                    </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan={filteredFields.length} class="text-center px-4 py-2 border">
                        No assets available.
                    </td>
                </tr>
            {/if}
        </tbody>
    </table>
</div>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f4f4f4;
    }

    tr:hover {
        background-color: #f1f1f1;
    }
</style>
