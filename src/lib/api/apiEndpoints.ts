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
		get: 'company/get',
		search: 'company/search',
		searchForSelect: 'company/search-for-select'
	},
	externalAPI: {
		fetchCNPJData: 'externalAPI/fetch-cnpj-data/',
		companySearchEngine: 'externalAPI/company-searchEngine',
		getLogoByDomain: 'https://logo.clearbit.com/',
		deepSearchCompany: 'externalAPI/deep-search-company',
		fetchBusinessEmail: 'externalAPI/fetch-business-email'
	}
}
