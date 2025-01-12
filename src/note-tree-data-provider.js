import { relative } from "path";
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
    return element.children;
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }
}

function makeTree() {
  const notes = getNotes(vscode.workspace.workspaceFolders[0].uri.fsPath);
  const groupedNotes = notes.reduce((groupedNotes, note) => {
    const key = note.path;
    if (!groupedNotes[key]) {
      groupedNotes[key] = [];
    }
    groupedNotes[key].push(note);
    return groupedNotes;
  }, {});
  return Object.keys(groupedNotes).map((path) => {
    const noteNode = new NoteNode(
      path,
      vscode.TreeItemCollapsibleState.Expanded
    );
    noteNode.tooltip = noteNode.label;
    noteNode.label = relative(
      vscode.workspace.workspaceFolders[0].uri.fsPath,
      path
    );
    noteNode.iconPath = vscode.ThemeIcon.File;
    groupedNotes[path].forEach((note) => {
      noteNode.children.push(new NoteNode(note.note));
    });
    return noteNode;
  });
}

class NoteNode extends vscode.TreeItem {
  /**
   * @param {string | vscode.TreeItemLabel} label
   * @param {vscode.TreeItemCollapsibleState} [collapsibleState]
   */
  constructor(label, collapsibleState) {
    super(label, collapsibleState);
    this.children = [];
  }
}
