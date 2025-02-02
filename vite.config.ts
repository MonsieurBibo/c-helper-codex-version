import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { readFileSync } from 'fs';
import mediawikiUserscript from 'vite-plugin-mediawiki-userscript';

// https://vitejs.dev/config/
export default defineConfig( {
	plugins: [
		vue(),
		vueJsx(),
		mediawikiUserscript( {
			name: 'c-helper-codex',
			entry: './src/main.ts',
			using: [
				'vue',
				'jquery',
				'@wikimedia/codex',
				'mediawiki.util'
			],
			banner: readFileSync( './BANNER.txt', 'utf8' )
		} )
	],
	resolve: {
		alias: {
			// eslint-disable-next-line es-x/no-import-meta
			'@': fileURLToPath( new URL( './src', import.meta.url ) )
		}
	},
	server: {
		hmr: true,
		strictPort: true,
		cors: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
		}
	}
} );
