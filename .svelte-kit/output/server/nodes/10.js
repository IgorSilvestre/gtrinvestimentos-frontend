import * as universal from '../entries/pages/person/edit/_personId_/_page.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/person/edit/_personId_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/person/edit/[personId]/+page.ts";
export const imports = ["_app/immutable/nodes/10.867c0bdf.js","_app/immutable/chunks/config.c4e28fd4.js","_app/immutable/chunks/index.78e4d4d0.js","_app/immutable/chunks/PersonForm.18eb1b0b.js","_app/immutable/chunks/apiFetch.0eddb5fd.js","_app/immutable/chunks/navigation.55c11801.js","_app/immutable/chunks/singletons.8a477a58.js","_app/immutable/chunks/index.08e11ec5.js","_app/immutable/chunks/index.esm.4d95b399.js","_app/immutable/chunks/Select.8a162bf7.js","_app/immutable/chunks/regexForSearch.1cba6048.js","_app/immutable/chunks/parseOptionToId.62dacb35.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.3c02a640.js"];
export const stylesheets = ["_app/immutable/assets/Select.6205cf6a.css","_app/immutable/assets/ProgressBar.4f1e9ba5.css"];
export const fonts = [];
