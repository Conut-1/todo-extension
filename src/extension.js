import vscode from "./vscode-module.js";

import { addNote } from "./add-note.js";

import { TestTreeDataProvider } from "./test-tree-data-provider.js";

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {
  const testTreeDataProvider = new TestTreeDataProvider();

  const addNoteCommand = vscode.commands.registerCommand(
    "todo-note.addNote",
    () => addNote(context)
  );
  const refreshNoteCommand = vscode.commands.registerCommand(
    "todo-note.refreshNote",
    () => testTreeDataProvider.refresh()
  );

  const testTree = vscode.window.registerTreeDataProvider(
    "todo-note-view",
    testTreeDataProvider
  );

  context.subscriptions.push(addNoteCommand, refreshNoteCommand, testTree);
}

export function deactivate() {}
