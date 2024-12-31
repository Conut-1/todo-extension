import vscode from "./vscode-module.js";

import { addNote } from "./add-note.js";

import { TestTreeDataProvider } from "./test-tree-data-provider.js";

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {
  const addNoteCommand = vscode.commands.registerCommand(
    "todo-note.addNote",
    () => addNote(context)
  );

  const testTreeDataProvider = vscode.window.registerTreeDataProvider(
    "todo-note-view",
    new TestTreeDataProvider()
  );

  context.subscriptions.push(addNoteCommand, testTreeDataProvider);
}

export function deactivate() {}
