import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	base: '/esri/',
	server: {
		fs: {
			allow: ['..', '/Users/marouen/Desktop/my-esri-map'],
		},
	},
});
