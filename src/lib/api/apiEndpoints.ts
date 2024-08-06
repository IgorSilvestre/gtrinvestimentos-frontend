export const APIEndpoints = {
	person: {
		getAll: 'person/all',
		search: 'person/search'
	},
	tags: {
		getAll: 'tag/all',
		getAllForSelect: 'tag/all-for-select'
	},
	zoning: {
		getAllForSelect: 'zoning/all-for-select'
	},
	company: {
		get: 'company/get',
		search: 'company/search',
		searchForSelect: 'company/search-for-select'
	},
	asset: {
		get: 'asset/'
	},
	externalAPI: {
		fetchCNPJData: 'externalAPI/fetch-cnpj-data/',
		companySearchEngine: 'externalAPI/company-searchEngine',
		getLogoByDomain: 'https://logo.clearbit.com/',
		deepSearchCompany: 'externalAPI/deep-search-company',
		fetchBusinessEmail: 'externalAPI/fetch-business-email',
		locations: {
			getBrazilStates: 'externalAPI/locations/Brazil-states/',
			getCitiesByState: 'externalAPI/locations/cities-by-state/',
			getNeighborhoodByCityApiId: 'externalAPI/locations/neighborhood-by-city-apiId/',
			getStreetByNeighborhoodApiId: 'externalAPI/locations/street-by-neighborhood-apiId/'
		}
	}
}
