import * as universal from '../entries/pages/company/_companyId_/_page.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/_companyId_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/company/[companyId]/+page.ts";
export const imports = ["_app/immutable/nodes/4.b2dbdf5d.js","_app/immutable/chunks/config.c4e28fd4.js","_app/immutable/chunks/index.78e4d4d0.js","_app/immutable/chunks/CompanyCard.09a4a83c.js","_app/immutable/chunks/Tag.76d206e0.js","_app/immutable/chunks/navigation.b456deb8.js","_app/immutable/chunks/singletons.e29ef17b.js","_app/immutable/chunks/index.08e11ec5.js","_app/immutable/chunks/index.8852ef22.js","_app/immutable/chunks/PersonCard.e777ae80.js"];
export const stylesheets = [];
export const fonts = [];
