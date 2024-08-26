import { APIEndpoints } from '$lib/api/apiEndpoints';
import { API_URL } from '$lib/config';
import type { ILoadFunction } from '$lib/interfaces-validation/ILoadFunction';
import type { IOption } from '$lib/interfaces-validation/IOption';
import type { IAsset } from '$lib/interfaces-validation/IVAsset';

export async function load({ fetch, params }: ILoadFunction): Promise<{ asset: IAsset, tags: IOption[] }> {
    const assetRes = await fetch(`${API_URL}${APIEndpoints.asset}${params.assetId}`);
    const [ asset ] = await assetRes.json();  // Assuming the API returns a single asset object

    const tagsRes: Response = await fetch(`${API_URL}${APIEndpoints.tags.getAllForSelect}`);
    const tags: IOption[] = await tagsRes.json();

    return { asset, tags };
}
