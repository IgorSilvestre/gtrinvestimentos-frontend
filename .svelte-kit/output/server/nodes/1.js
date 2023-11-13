

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.cac8d66f.js","_app/immutable/chunks/index.78e4d4d0.js","_app/immutable/chunks/singletons.8a477a58.js","_app/immutable/chunks/index.08e11ec5.js"];
export const stylesheets = [];
export const fonts = [];
