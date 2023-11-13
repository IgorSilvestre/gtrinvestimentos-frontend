import { w as writable } from "./index.js";
import { c as create_ssr_component, e as escape, l as null_to_empty } from "./index2.js";
/* empty css                                      */const ITEMS_PER_PAGE = writable(10);
const css = {
  code: "div.svelte-1ezntrv{border-color:currentColor;border-top-color:#3498db}",
  map: null
};
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = "w-12 h-12" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  $$result.css.add(css);
  return `<div class="${escape(null_to_empty(`border-t-4 border-transparent border-solid rounded-full animate-spin ${size} bg-current`), true) + " svelte-1ezntrv"}"></div>`;
});
export {
  ITEMS_PER_PAGE as I,
  Loader as L
};
