const fs = require('fs');

const expectedFiles = ['dist/index.js', 'dist/index.mjs', 'dist/index.d.ts'];

expectedFiles.forEach((file) => {
  if (!fs.existsSync(file)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
});

console.log('Package verification successful!');
