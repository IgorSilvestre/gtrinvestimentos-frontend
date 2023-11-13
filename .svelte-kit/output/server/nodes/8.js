

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/person/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.e72483d4.js","_app/immutable/chunks/index.78e4d4d0.js","_app/immutable/chunks/navigation.55c11801.js","_app/immutable/chunks/singletons.8a477a58.js","_app/immutable/chunks/index.08e11ec5.js","_app/immutable/chunks/apiFetch.0eddb5fd.js","_app/immutable/chunks/config.c4e28fd4.js","_app/immutable/chunks/PersonCard.58d8ce11.js","_app/immutable/chunks/Tag.76d206e0.js","_app/immutable/chunks/index.8852ef22.js","_app/immutable/chunks/Loader.b35f0416.js","_app/immutable/chunks/Pagination.a9f16dd6.js","_app/immutable/chunks/Search.995c6764.js","_app/immutable/chunks/tagQueries.f543cd75.js","_app/immutable/chunks/Select.8a162bf7.js","_app/immutable/chunks/regexForSearch.1cba6048.js"];
export const stylesheets = ["_app/immutable/assets/Loader.03817f19.css","_app/immutable/assets/Select.6205cf6a.css"];
export const fonts = [];
