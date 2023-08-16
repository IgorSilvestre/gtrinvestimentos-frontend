import { API_URL } from '$lib/config'
import type { ILoadFunction } from '$lib/interfaces-validation/ILoadFunction'
import type { ICompany } from '$lib/interfaces-validation/IVCompany'
import type { IPerson } from '$lib/interfaces-validation/IVPerson'

export async function load({ fetch, params }: ILoadFunction): Promise<{ company: ICompany, employees: IPerson[] }> {
	const employees = []
	const res: Response = await fetch(API_URL + 'company/' + params.companyId)
	const company = await res.json()
	for (const employee of company.employees) {
		const employeeRes: Response = await fetch(API_URL + 'person/' + employee._id)
		const employeeData = await employeeRes.json()
		employees.push(employeeData)
	}
	return { company, employees }
}
