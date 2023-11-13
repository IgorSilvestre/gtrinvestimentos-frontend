export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/company-search": [7],
		"/company": [3],
		"/company/edit/[companyId]": [5],
		"/company/new": [6],
		"/company/[companyId]": [4],
		"/person": [8],
		"/person/edit/[personId]": [10],
		"/person/new": [11],
		"/person/[personId]": [9],
		"/search-cnpj": [12],
		"/tag/all": [13]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';