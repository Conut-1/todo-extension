import vscode from "./vscode-module.js";
import { insertNote } from "./note-db.js";

export async function addNote() {
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
