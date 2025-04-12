const fs = require('fs');

const expectedFiles = ['dist/bootstrap.js'];

expectedFiles.forEach((file) => {
  if (!fs.existsSync(file)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
});

console.log('Package verification successful!');
