const {build} = require('esbuild');
const {execSync} = require('child_process');
const {tsconfigPathsPlugin} = require('esbuild-plugin-tsconfig-paths')

// Generate type declarations
// execSync('tsc --emitDeclarationOnly');

// Bundle with esbuild
build({
  entryPoints: ['src/**/*.ts'],
  bundle: false,
  minify: false,
  sourcemap: false,
  platform: 'node',
  format: 'cjs',
  outdir: 'dist',
  target: ['es2020'],
  plugins: [
    tsconfigPathsPlugin( {
      filter: /.*/,
    })
  ],
}).catch(() => process.exit(1));
