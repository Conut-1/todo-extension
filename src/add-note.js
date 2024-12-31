import vscode from "./vscode-module.js";

/**
 * @param {vscode.ExtensionContext} context
 */
export function addNote(context) {
  vscode.window.showInformationMessage("add note");
}
