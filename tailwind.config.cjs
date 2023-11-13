/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  './src/**/*.{html,js,svelte,ts}',
	  require('path').join(
		require.resolve('@skeletonlabs/skeleton'),
		'../**/*.{html,js,svelte,ts}'
	  ),
	],
	theme: {
	  extend: {},
	},
	plugins: [
	  ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')(),
	  // Add the @tailwind base directive
	  function ({ addBase, config }) {
		addBase({
		  // Add your base styles here if needed
		  // For example:
		  body: {
			color: config('theme.colors.black'),
			backgroundColor: config('theme.colors.white'),
		  },
		});
	  },
	],
  };
  