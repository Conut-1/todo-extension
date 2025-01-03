import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { runTests } from "@vscode/test-electron";

async function main() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  try {
    const extensionDevelopmentPath = resolve(__dirname, "../");
    const extensionTestsPath = resolve(__dirname, "./index.cjs");

    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: ["--disable-gpu"],
    });
  } catch (err) {
    process.exit(1);
  }
}

main();
