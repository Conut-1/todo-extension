import vscode from "./vscode-module.js";
import { join } from "path";
import { writeFile } from "fs/promises";

/**
 * @param {vscode.ExtensionContext} context
 */
export async function addNote(context) {
  await vscode.workspace.fs.createDirectory(context.globalStorageUri);
  const input = await vscode.window.showInputBox({
    placeHolder: "Type your input here",
    prompt: "Enter something:",
  });
  const filePath = join(context.globalStorageUri.fsPath, "note");
  await writeFile(filePath, input);
  vscode.window.showInformationMessage(`add note: ${input}`);
}
