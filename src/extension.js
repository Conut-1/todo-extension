import { createRequire } from "module";
const require = createRequire(import.meta.url);
const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {
  console.log("Todo Note is now active!");
  const disposable = vscode.commands.registerCommand(
    "todo-note.helloWorld",
    function () {
      vscode.window.showInformationMessage("Hello World from Todo Note!");
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
