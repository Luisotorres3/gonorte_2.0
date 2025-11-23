/**
 * @file check-unused-assets.ts
 * @description Script to identify unused assets in the project
 * Run with: npx tsx scripts/check-unused-assets.ts
 */

import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Asset directories to check
const ASSET_DIRS = ['src/assets'];
const SRC_DIRS = ['src'];

// Asset extensions to check
const ASSET_EXTENSIONS = ['.webp', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.ico'];

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dir: string, files: string[] = []): string[] {
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      getAllFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Get all asset files
 */
function getAssetFiles(): string[] {
  const assets: string[] = [];
  
  for (const dir of ASSET_DIRS) {
    const files = getAllFiles(dir);
    assets.push(...files.filter(f => ASSET_EXTENSIONS.includes(extname(f))));
  }
  
  return assets;
}

/**
 * Get all source files
 */
function getSourceFiles(): string[] {
  const sources: string[] = [];
  
  for (const dir of SRC_DIRS) {
    const files = getAllFiles(dir);
    sources.push(...files.filter(f => ['.tsx', '.ts', '.jsx', '.js', '.css'].includes(extname(f))));
  }
  
  return sources;
}

/**
 * Check if an asset is used in any source file
 */
function isAssetUsed(assetPath: string, sourceFiles: string[]): boolean {
  const assetName = assetPath.split(/[/\\]/).pop() || '';
  
  for (const sourceFile of sourceFiles) {
    try {
      const content = require('fs').readFileSync(sourceFile, 'utf-8');
      if (content.includes(assetName)) {
        return true;
      }
    } catch (error) {
      console.error(`Error reading ${sourceFile}:`, error);
    }
  }
  
  return false;
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Checking for unused assets...\n');
  
  const assets = getAssetFiles();
  const sources = getSourceFiles();
  
  console.log(`Found ${assets.length} asset files`);
  console.log(`Checking against ${sources.length} source files\n`);
  
  const unusedAssets: string[] = [];
  
  for (const asset of assets) {
    if (!isAssetUsed(asset, sources)) {
      unusedAssets.push(asset);
    }
  }
  
  if (unusedAssets.length === 0) {
    console.log('✅ No unused assets found!');
  } else {
    console.log(`⚠️  Found ${unusedAssets.length} potentially unused assets:\n`);
    unusedAssets.forEach(asset => {
      console.log(`  - ${asset}`);
    });
    console.log('\n⚠️  Note: This is a heuristic check. Some assets might be used dynamically.');
  }
}

main();
