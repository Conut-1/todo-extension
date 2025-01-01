import vscode from "./vscode-module.js";
import { join } from "path";
import { readFile } from "fs/promises";

/**
 * @implements {vscode.TreeDataProvider}
 */
export class TestTreeDataProvider {
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

  async getChildren(element) {
    if (!element) {
      const filePath = join(this.context.globalStorageUri.fsPath, "note");
      const content = await readFile(filePath);
      return [new vscode.TreeItem(content.toString())];
    }
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }
}
