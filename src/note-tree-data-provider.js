import vscode from "./vscode-module.js";
import { getNotes } from "./note-db.js";

/**
 * @implements {vscode.TreeDataProvider}
 */
export class NoteTreeDataProvider {
  /**
   * @param {vscode.ExtensionContext} context
   */
  constructor(context) {
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    this.context = context;
  }

  /**
   * @returns {vscode.TreeItem}
   */
  getTreeItem(element) {
    return element;
  }

  getChildren(element) {
    if (!element) {
      return makeTree();
    }
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }
}

function makeTree() {
  const notes = getNotes(vscode.workspace.workspaceFolders[0].uri.fsPath);
  return notes.map((note) => {
    return new NoteNode(note.note);
  });
}

class NoteNode extends vscode.TreeItem {
  constructor(label, collapsibleState) {
    super(label, collapsibleState);
  }
}
