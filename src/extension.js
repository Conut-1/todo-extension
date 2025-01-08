import vscode from "./vscode-module.js";
import { addNote } from "./add-note.js";
import { TestTreeDataProvider } from "./test-tree-data-provider.js";
import { initDB, closeDB } from "./note-db.js";

/**
 * @param {vscode.ExtensionContext} context
 */
export async function activate(context) {
  await initDB(context.globalStorageUri);

  const testTreeDataProvider = new TestTreeDataProvider(context);

  const addNoteCommand = vscode.commands.registerCommand(
    "todo-note.addNote",
    async () => {
      await addNote();
      testTreeDataProvider.refresh();
    }
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

export function deactivate() {
  closeDB();
}
