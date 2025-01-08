import vscode from "./vscode-module.js";
import { insertNote } from "./note-db.js";

/**
 * @param {vscode.ExtensionContext} context
 */
export async function addNote(context) {
  await vscode.workspace.fs.createDirectory(context.globalStorageUri);
  const input = await vscode.window.showInputBox({
    placeHolder: "Type your input here",
    prompt: "Enter something:",
  });
  const editor = vscode.window.activeTextEditor;
  if (editor && editor.document.uri.scheme === "file") {
    const filePath = editor.document.uri.fsPath;
    insertNote(filePath, input);
    vscode.window.showInformationMessage(`add note: ${input}`);
  }
}
