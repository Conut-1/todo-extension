import vscode from "./vscode-module.js";

export function deleteNote(noteNode) {
  vscode.window.showInformationMessage(`delete note: ${noteNode.label}`);
}
