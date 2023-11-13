import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		outDir: 'dist'
	},
	server: {
		host: '0.0.0.0', // Listen on all network interfaces
		port: 5173, // Customize the port number if needed
		strictPort: true // Enforce the specified port number
	},
	resolve: {
		alias: {
			src: '/src',
			lib: '/src/lib'
		}
	}
})
