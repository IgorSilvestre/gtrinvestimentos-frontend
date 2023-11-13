import * as universal from '../entries/pages/company/_companyId_/_page.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/_companyId_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/company/[companyId]/+page.ts";
export const imports = ["_app/immutable/nodes/4.9630aa12.js","_app/immutable/chunks/config.c4e28fd4.js","_app/immutable/chunks/index.78e4d4d0.js","_app/immutable/chunks/CompanyCard.275e1a09.js","_app/immutable/chunks/Tag.76d206e0.js","_app/immutable/chunks/navigation.55c11801.js","_app/immutable/chunks/singletons.8a477a58.js","_app/immutable/chunks/index.08e11ec5.js","_app/immutable/chunks/index.8852ef22.js","_app/immutable/chunks/PersonCard.58d8ce11.js"];
export const stylesheets = [];
export const fonts = [];
