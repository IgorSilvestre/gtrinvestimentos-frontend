import type { ILoadFunction } from '$lib/interfaces-validation/ILoadFunction'

export async function load({ params }: ILoadFunction): Promise<{ companyId: string }> {
  return { companyId: params.companyId }
}

