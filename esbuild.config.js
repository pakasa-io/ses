// scripts/build.js
const { build } = require('esbuild');
const { execSync } = require('child_process');

// Generate type declarations
execSync('tsc --emitDeclarationOnly');

// Bundle with esbuild
build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: 'node',
  format: 'cjs',
  outfile: 'dist/index.js',
}).catch(() => process.exit(1));

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: 'neutral',
  format: 'esm',
  outfile: 'dist/index.mjs',
}).catch(() => process.exit(1));
