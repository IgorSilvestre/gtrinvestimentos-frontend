import { APIEndpoints } from "$lib/api/apiEndpoints"
import { API_URL } from "$lib/config"
import type { ILoadFunction } from "$lib/interfaces-validation/ILoadFunction"
import type { IAssetShow } from "$lib/interfaces-validation/IVAsset"

export async function load({ fetch, params }: ILoadFunction): Promise<{ asset: IAssetShow }> {
	const res: Response = await fetch(API_URL + APIEndpoints.asset + params.assetId)
	const data: IAssetShow[] = await res.json()
	return { asset: data[0] }
}

