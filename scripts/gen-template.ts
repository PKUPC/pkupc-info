import * as fs from 'fs';
import * as path from 'path';

// Get arguments from command line
const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: pnpm run gen-template <param_folder> <param_index>');
    process.exit(1);
}

const paramFolder = args[0];
const paramIndex = parseInt(args[1], 10);

if (isNaN(paramIndex) || paramIndex < 1 || paramIndex >= 1000) {
    console.error('Error: param_index must be an integer between 1 and 999.');
    process.exit(1);
}

// Format param_index to 3 digits
const paramIndexStr = paramIndex.toString().padStart(3, '0');

// Define source and destination paths
const sourceDir = path.join(__dirname, 'templates');
const destDir = path.join(__dirname, '..', 'content', 'wechat-official-account', paramFolder);
const sourceFile = path.join(sourceDir, `${paramFolder}-000.mdx`);
const destFile = path.join(destDir, `${paramFolder}-${paramIndexStr}.mdx`);
const assetsDir = path.join(destDir, `${paramFolder}-${paramIndexStr}.assets`);

// Ensure the source file exists
if (!fs.existsSync(sourceFile)) {
    console.error(`Error: Template file not found at ${sourceFile}`);
    process.exit(1);
}

// Ensure the destination directory exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Copy and rename the file
fs.copyFileSync(sourceFile, destFile);
console.log(`Copied and renamed file: ${sourceFile} → ${destFile}`);

// Create the assets directory
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
    console.log(`Created assets directory: ${assetsDir}`);
} else {
    console.warn(`Warning: Assets directory already exists: ${assetsDir}`);
}
