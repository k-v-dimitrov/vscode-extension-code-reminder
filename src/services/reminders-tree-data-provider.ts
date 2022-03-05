import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import RemindersProvider from "./reminders-provider";
import Reminder from "models/reminder";

export class RemindersTreeDataProvider
  implements vscode.TreeDataProvider<ReminderTreeItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    ReminderTreeItem | undefined | null | void
  > = new vscode.EventEmitter<ReminderTreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    ReminderTreeItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  constructor(private remindersProvider: RemindersProvider) {}

  getTreeItem(element: ReminderTreeItem): ReminderTreeItem {
    return element;
  }

  getChildren(element?: ReminderTreeItem): ReminderTreeItem[] {
    if (!element) {
      return this.remindersProvider.reminders.map((reminder) => {
        console.log(reminder, "THIS IS FROM THE DATA PROVIDER");

        return new ReminderTreeItem(
          reminder.name,
          vscode.TreeItemCollapsibleState.Collapsed,
          reminder
        );
      });
    }

    return [element];
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}

class ReminderTreeItem extends vscode.TreeItem {
  constructor(
    readonly label: string,
    readonly collapsibleState: vscode.TreeItemCollapsibleState,
    readonly details: Reminder
  ) {
    super(label, collapsibleState);
  }
}
