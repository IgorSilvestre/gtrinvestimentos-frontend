import { c as create_ssr_component, a as assign, i as is_function, b as subscribe, e as escape, d as each, f as add_attribute, v as validate_component } from "../../chunks/index2.js";
import { t as toastStore } from "../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<header class="bg-black py-3 flex justify-center"><span class="font-rockwell text-white text-2xl absolute left-2">gtr</span>
	<nav class="ml-4">
		
		<a class="no-underline hover:underline text-white mx-3" href="/company">Empresas</a>
		
		<a class="no-underline hover:underline text-white mx-3" href="/person">Pessoas</a>
		<a class="no-underline hover:underline text-white mx-3" href="/search-cnpj">Busca CNPJ</a>
		<a class="no-underline hover:underline text-white mx-3" href="/company-search">Busca Empresa</a></nav></header>`;
});
const skeleton = "";
function cubicInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1;
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function crossfade(_a) {
  var { fallback } = _a, defaults = __rest(_a, ["fallback"]);
  const to_receive = /* @__PURE__ */ new Map();
  const to_send = /* @__PURE__ */ new Map();
  function crossfade2(from_node, node, params) {
    const { delay = 0, duration = (d2) => Math.sqrt(d2) * 30, easing = cubicOut } = assign(assign({}, defaults), params);
    const from = from_node.getBoundingClientRect();
    const to = node.getBoundingClientRect();
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const dw = from.width / to.width;
    const dh = from.height / to.height;
    const d = Math.sqrt(dx * dx + dy * dy);
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    const opacity = +style.opacity;
    return {
      delay,
      duration: is_function(duration) ? duration(d) : duration,
      easing,
      css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
    };
  }
  function transition(items, counterparts, intro) {
    return (node, params) => {
      items.set(params.key, node);
      return () => {
        if (counterparts.has(params.key)) {
          const other_node = counterparts.get(params.key);
          counterparts.delete(params.key);
          return crossfade2(other_node, node, params);
        }
        items.delete(params.key);
        return fallback && fallback(node, params, intro);
      };
    };
  }
  return [
    transition(to_send, to_receive, false),
    transition(to_receive, to_send, true)
  ];
}
const cWrapper = "flex fixed top-0 left-0 right-0 bottom-0 pointer-events-none";
const cSnackbar = "flex flex-col gap-y-2";
const cToast = "flex justify-between items-center pointer-events-auto";
const cToastActions = "flex items-center space-x-2";
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesWrapper;
  let classesSnackbar;
  let classesToast;
  let filteredToasts;
  let $toastStore, $$unsubscribe_toastStore;
  $$unsubscribe_toastStore = subscribe(toastStore, (value) => $toastStore = value);
  let { position = "b" } = $$props;
  let { max = 3 } = $$props;
  let { duration = 250 } = $$props;
  let { background = "variant-filled-secondary" } = $$props;
  let { width = "max-w-[640px]" } = $$props;
  let { color = "" } = $$props;
  let { padding = "p-4" } = $$props;
  let { spacing = "space-x-4" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { shadow = "shadow-lg" } = $$props;
  let { zIndex = "z-[888]" } = $$props;
  let { buttonAction = "btn variant-filled" } = $$props;
  let { buttonDismiss = "btn-icon btn-icon-sm variant-filled" } = $$props;
  let { buttonDismissLabel = "✕" } = $$props;
  let cPosition;
  let cAlign;
  let animAxis = { x: 0, y: 0 };
  switch (position) {
    case "t":
      cPosition = "justify-center items-start";
      cAlign = "items-center";
      animAxis = { x: 0, y: -100 };
      break;
    case "b":
      cPosition = "justify-center items-end";
      cAlign = "items-center";
      animAxis = { x: 0, y: 100 };
      break;
    case "l":
      cPosition = "justify-start items-center";
      cAlign = "items-start";
      animAxis = { x: -100, y: 0 };
      break;
    case "r":
      cPosition = "justify-end items-center";
      cAlign = "items-end";
      animAxis = { x: 100, y: 0 };
      break;
    case "tl":
      cPosition = "justify-start items-start";
      cAlign = "items-start";
      animAxis = { x: -100, y: 0 };
      break;
    case "tr":
      cPosition = "justify-end items-start";
      cAlign = "items-end";
      animAxis = { x: 100, y: 0 };
      break;
    case "bl":
      cPosition = "justify-start items-end";
      cAlign = "items-start";
      animAxis = { x: -100, y: 0 };
      break;
    case "br":
      cPosition = "justify-end items-end";
      cAlign = "items-end";
      animAxis = { x: 100, y: 0 };
      break;
  }
  crossfade({
    duration: (d) => Math.sqrt(d * duration),
    fallback(node) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;
      return {
        duration,
        easing: cubicInOut,
        css: (t, u) => `
					transform: ${transform} scale(${t}) translate(${u * animAxis.x}%, ${u * animAxis.y}%);
					opacity: ${t}
				`
      };
    }
  });
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  if ($$props.buttonAction === void 0 && $$bindings.buttonAction && buttonAction !== void 0)
    $$bindings.buttonAction(buttonAction);
  if ($$props.buttonDismiss === void 0 && $$bindings.buttonDismiss && buttonDismiss !== void 0)
    $$bindings.buttonDismiss(buttonDismiss);
  if ($$props.buttonDismissLabel === void 0 && $$bindings.buttonDismissLabel && buttonDismissLabel !== void 0)
    $$bindings.buttonDismissLabel(buttonDismissLabel);
  classesWrapper = `${cWrapper} ${cPosition} ${zIndex} ${$$props.class || ""}`;
  classesSnackbar = `${cSnackbar} ${cAlign} ${padding}`;
  classesToast = `${cToast} ${width} ${color} ${padding} ${spacing} ${rounded} ${shadow}`;
  filteredToasts = Array.from($toastStore).slice(0, max);
  $$unsubscribe_toastStore();
  return `${$toastStore.length ? `
	<div class="${"snackbar-wrapper " + escape(classesWrapper, true)}" data-testid="snackbar-wrapper">
		<div class="${"snackbar " + escape(classesSnackbar, true)}">${each(filteredToasts, (t, i) => {
    return `<div${add_attribute("role", t.hideDismiss ? "alert" : "alertdialog", 0)} aria-live="polite">
					<div class="${"toast " + escape(classesToast, true) + " " + escape(t.background ?? background, true) + " " + escape(t.classes ?? "", true)}" data-testid="toast"><div class="text-base"><!-- HTML_TAG_START -->${t.message}<!-- HTML_TAG_END --></div>
						${t.action || !t.hideDismiss ? `<div class="${"toast-actions " + escape(cToastActions, true)}">${t.action ? `<button${add_attribute("class", buttonAction, 0)}><!-- HTML_TAG_START -->${t.action.label}<!-- HTML_TAG_END --></button>` : ``}
								${!t.hideDismiss ? `<button${add_attribute("class", buttonDismiss, 0)} aria-label="Dismiss toast">${escape(buttonDismissLabel)}</button>` : ``}
							</div>` : ``}</div>
				</div>`;
  })}</div></div>` : ``}`;
});
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `
${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})}


<div class="app">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

	<main>${slots.default ? slots.default({}) : ``}</main>

	<footer></footer></div>`;
});
export {
  Layout as default
};
