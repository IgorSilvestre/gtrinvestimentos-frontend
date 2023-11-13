

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company-search/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.819db32b.js","_app/immutable/chunks/index.78e4d4d0.js","_app/immutable/chunks/Search.995c6764.js","_app/immutable/chunks/apiFetch.0eddb5fd.js","_app/immutable/chunks/tagQueries.f543cd75.js","_app/immutable/chunks/Select.8a162bf7.js","_app/immutable/chunks/regexForSearch.1cba6048.js","_app/immutable/chunks/Loader.b35f0416.js"];
export const stylesheets = ["_app/immutable/assets/Select.6205cf6a.css","_app/immutable/assets/Loader.03817f19.css"];
export const fonts = [];
