import { access } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

await import("./check-conflicts.mjs");

const appRoot = fileURLToPath(new URL("..", import.meta.url));
const vitePackagePath = join(appRoot, "node_modules", "vite", "package.json");

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
    return false;
  }
}

const hasDependencies = await pathExists(vitePackagePath);

if (!hasDependencies) {
  console.error("Project dependencies are missing.\n");
  console.error(
    "Run `npm run setup` from the new_seminar directory or `npm install` inside new_seminar/app before starting the dev server."
  );
  process.exit(1);
}
