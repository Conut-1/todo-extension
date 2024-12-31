import vscode from "./vscode-module.js";
import { TestTreeDataProvider } from "./test-tree-data-provider.js";

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

  const testTreeDataProvider = vscode.window.registerTreeDataProvider(
    "todo-note-view",
    new TestTreeDataProvider()
  );

  context.subscriptions.push(disposable, testTreeDataProvider);
}

export function deactivate() {}
