const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building n8n-nodes-genie-dial...');

// Create dist directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Copy icon files
const iconSource = 'nodes/GenieDial/geniedial.svg';
const iconDest = 'dist/nodes/GenieDial/geniedial.svg';

if (fs.existsSync(iconSource)) {
  const destDir = path.dirname(iconDest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(iconSource, iconDest);
  console.log('✓ Icon copied to dist/');
}

console.log('Build completed!');
console.log('Next steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm run build');
console.log('3. Package and publish to npm');

