import { createRequire } from "module";

const require = createRequire(import.meta.url);
const vscode = require("vscode");

export default vscode;
