import vscode from "./vscode-module.js";
import { addNote } from "./add-note.js";
import { deleteNote } from "./delete-note.js";
import { NoteTreeDataProvider } from "./note-tree-data-provider.js";
import { initDB, closeDB } from "./note-db.js";

/**
 * @param {vscode.ExtensionContext} context
 */
export async function activate(context) {
  await initDB(context.globalStorageUri);

  const noteTreeDataProvider = new NoteTreeDataProvider(context);

  const addNoteCommand = vscode.commands.registerCommand(
    "todo-note.addNote",
    async () => {
      await addNote();
      noteTreeDataProvider.refresh();
    }
  );
  const refreshNoteCommand = vscode.commands.registerCommand(
    "todo-note.refreshNote",
    () => noteTreeDataProvider.refresh()
  );
  const deleteNoteCommand = vscode.commands.registerCommand(
    "todo-note.deleteNote",
    (noteNode) => {
      deleteNote(noteNode);
      noteTreeDataProvider.refresh();
    }
  );

  const noteTree = vscode.window.registerTreeDataProvider(
    "todo-note-view",
    noteTreeDataProvider
  );

  context.subscriptions.push(
    addNoteCommand,
    refreshNoteCommand,
    deleteNoteCommand,
    noteTree
  );
}

export function deactivate() {
  closeDB();
}
