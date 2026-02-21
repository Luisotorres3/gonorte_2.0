const fs = require('fs');
const path = require('path');

const cacheRoot = path.join(process.cwd(), 'node_modules', '.cache');

function safeRemove(targetPath) {
  if (!fs.existsSync(targetPath)) {
    return;
  }

  fs.rmSync(targetPath, { recursive: true, force: true });
  console.log(`Removed: ${targetPath}`);
}

function main() {
  if (!fs.existsSync(cacheRoot)) {
    console.log('No cache directory found.');
    return;
  }

  const entries = fs.readdirSync(cacheRoot, { withFileTypes: true });
  const ghPagesCaches = entries
    .filter((entry) => entry.isDirectory() && entry.name.toLowerCase().includes('gh-pages'))
    .map((entry) => path.join(cacheRoot, entry.name));

  if (ghPagesCaches.length === 0) {
    console.log('No gh-pages cache found.');
    return;
  }

  ghPagesCaches.forEach(safeRemove);
}

main();