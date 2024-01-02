import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'

export default defineConfig({
    plugins: [
        react(),
        electron([
            {
                entry: 'electron/main.js',
            },
            {
                entry: 'electron/preload.js',
                onstart(options) {
                    // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, instead of restarting the entire Electron App.
                    options.reload()
                },
            },
        ]),
    ],
    resolve: {
        alias: {
            'path': 'path-browserify',
            'util': 'util/'
        },
    },
    build: {
        rollupOptions: {
            plugins: [
                require('rollup-plugin-node-polyfills')(),
            ]
        }
    },
    optimizeDeps: {
        allowNodeBuiltins: ['util', 'path']
    }
})
