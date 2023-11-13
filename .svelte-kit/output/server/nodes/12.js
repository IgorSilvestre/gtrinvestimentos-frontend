

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/search-cnpj/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.e5321d2b.js","_app/immutable/chunks/index.78e4d4d0.js","_app/immutable/chunks/apiFetch.0eddb5fd.js"];
export const stylesheets = [];
export const fonts = [];
