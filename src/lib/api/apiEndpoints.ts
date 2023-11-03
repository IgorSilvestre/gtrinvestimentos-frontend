export const APIEndpoints = {
	person: {
		getAll: 'person/all',
		search: 'person/search'
	},
	tags: {
		getAll: 'tag/all',
		getAllForSelect: 'tag/all-for-select'
	},
	company: {
		getAll: 'company/all',
		search: 'company/search',
		getAllForSelect: 'company/all-for-select'
	},
	externalAPI: {
		fetchCNPJData: 'externalAPI/fetch-cnpj-data/',
		companySearchEngine: 'externalAPI/company-searchEngine',
		getLogoByDomain: 'https://logo.clearbit.com/'
	}
}
