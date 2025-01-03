import { dirname, resolve } from "path";
import Mocha from "mocha";
import { glob } from "glob";
import { fileURLToPath } from "url";

export async function run() {
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
  });
  mocha.lazyLoadFiles(true);

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const testsRoot = __dirname;

  const files = await glob("**/**.test.js", { cwd: testsRoot });
  files.forEach((file) => mocha.addFile(resolve(testsRoot, file)));
  await mocha.loadFilesAsync();

  const failures = await new Promise((resolve) => {
    mocha.run((failures) => resolve(failures));
  });

  if (failures > 0) {
    throw new Error(`${failures} tests failed.`);
  }
}
