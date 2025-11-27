import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const conflictRegexes = [/^<<<<<<< .+/m, /^=======$/m, /^>>>>>>> .+/m];
const ignoredDirectories = new Set([
  ".git",
  "node_modules",
  "dist",
  ".vite",
  "build",
  "coverage"
]);

const filesWithConflicts = [];

async function scanDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoredDirectories.has(entry.name)) {
      continue;
    }

    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      await scanDirectory(fullPath);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const content = await readFile(fullPath, "utf8");
    if (conflictRegexes.some((regex) => regex.test(content))) {
      filesWithConflicts.push(fullPath);
    }
  }
}

const appRoot = fileURLToPath(new URL("..", import.meta.url));
await scanDirectory(appRoot);

if (filesWithConflicts.length > 0) {
  console.error("Merge conflict markers detected in the following files:\n");
  for (const file of filesWithConflicts) {
    console.error(` - ${file}`);
  }
  console.error("\nPlease resolve these conflicts before running the app.");
  process.exit(1);
}
