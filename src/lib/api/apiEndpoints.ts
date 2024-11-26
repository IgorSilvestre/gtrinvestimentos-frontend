export const APIEndpoints = {
  file: 'v1/file/',
	person: {
		getAll: 'v1/person/all',
		search: 'v1/person/search'
	},
	tags: {
		getAll: 'v1/tag/all',
		getAllForSelect: 'v1/tag/all-for-select'
	},
	zoning: {
		getAllForSelect: 'v1/zoning/all-for-select'
	},
	company: {
    url_v1: 'v1/company/',
		get: 'v1/company/get',
		search: 'v1/company/search',
		searchForSelect: 'v1/company/search-for-select'
	},
	asset: 'v1/asset/',
	externalAPI: {
		fetchCNPJData: 'v1/externalAPI/fetch-cnpj-data/',
		fetchCNPJDataV2: 'v2/external/fetch-cnpj-data/',
		companySearchEngine: 'v1/externalAPI/company-searchEngine',
		getLogoByDomain: 'https://logo.clearbit.com/',
    getAddressAutocompleteFullAPI: "https://simple-go-server-production.up.railway.app/external/autocomplete-address?q=",
		deepSearchCompany: 'v1/externalAPI/deep-search-company',
		fetchBusinessEmail: 'v1/externalAPI/fetch-business-email',
        scrapeWebsiteForContacts: 'v1/externalAPI/scrape-website-for-contacts/?domain=https://',
		locations: {
			getBrazilStates: 'v1/externalAPI/locations/Brazil-states/',
			getCitiesByState: 'v1/externalAPI/locations/cities-by-state/',
			getNeighborhoodByCityApiId: 'v1/externalAPI/locations/neighborhood-by-city-apiId/',
			getStreetByNeighborhoodApiId: 'v1/externalAPI/locations/street-by-neighborhood-apiId/'
		}
	}
}
