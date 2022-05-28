import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { RemindersProvider } from "../services/reminders-provider";
import Reminder, { IReminder } from "models/reminder";
import {
  DetailItemGenerator,
  NameGenerator,
  DateGenerator,
  FileLocationGenerator,
  LineAtGenerator,
} from "./tree-view-generators/reminders-view-generators";

export class RemindersTreeDataProvider
  implements vscode.TreeDataProvider<ReminderTreeItem | ReminderDetailTreeItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    ReminderTreeItem | undefined | null | void
  > = new vscode.EventEmitter<ReminderTreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    ReminderTreeItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  private detailItemGenerator: DetailItemGenerator;

  constructor() {
    this.detailItemGenerator = DetailItemGenerator.getInstance();
    this.registerViewGenerators();
  }

  registerViewGenerators() {
    this.detailItemGenerator.addGenerator("date", new DateGenerator());
    this.detailItemGenerator.addGenerator("name", new NameGenerator());
    this.detailItemGenerator.addGenerator(
      "reminderFileLocation",
      new FileLocationGenerator()
    );
    this.detailItemGenerator.addGenerator(
      "reminderLine",
      new LineAtGenerator()
    );
  }

  getTreeItem(element: ReminderTreeItem): ReminderTreeItem {
    return element;
  }

  /**
   * Get the children of `element` or root if no element is passed.
   *
   * Note:  If no element is passed we return the whole list of Reminders using the this.generateRemindersTreeItems()
   *        If element is passed, element.details contains the reminder object and it's details.
   *
   *
   * @param element The element from which the provider gets children. Can be `undefined`.
   * @return Children of `element` or root if no element is passed.
   */

  getChildren(
    element?: ReminderTreeItem
  ): ReminderTreeItem[] | ReminderDetailTreeItem[] {
    if (!element) {
      const reminders = RemindersProvider.getInstance().reminders;
      return this.generateRemindersTreeItems(reminders);
    } else {
      const reminder = element.details;
      return reminder && this.generateReminderDetailsTreeItems(reminder);
    }
  }

  /**
   *
   * @param reminders Should pass all reminders that were found in global context and returned by the provider
   * @returns ReminderTreeItem instances that will be shown on the ui, attaching the reminder details as well
   *
   */

  generateRemindersTreeItems(reminders: Reminder[]): ReminderTreeItem[] {
    return reminders.map((reminder) => {
      return new ReminderTreeItem(
        reminder.reminderFileLocation, // using name as label
        vscode.TreeItemCollapsibleState.Collapsed,
        reminder
      );
    });
  }

  /**
   *
   * @param reminder Single reminder object
   * @returns RemainderDetailTreeItem, to reflect a
   *          single field of the reminder object.
   *          No matter the type of the field of
   *          the item, it always stringifies it
   *          so that it could be used as an label
   *          for the TreeItem
   */

  generateReminderDetailsTreeItems(
    reminder: Reminder
  ): ReminderDetailTreeItem[] {
    return Object.keys(reminder).reduce(
      (
        viewableDetailsAccumulator: Array<ReminderDetailTreeItem>,
        currentDetails
      ) => {
        const castedDetailType = currentDetails as keyof Reminder;
        const detailData = reminder[castedDetailType]!.toString();

        const detailItem = this.detailItemGenerator.generateDetailItem(
          castedDetailType,
          detailData
        );

        if (detailItem) {
          return [...viewableDetailsAccumulator, detailItem];
        }

        return viewableDetailsAccumulator;
      },
      []
    );
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}

// VS-CODE view classes
export class ReminderTreeItem extends vscode.TreeItem {
  constructor(
    readonly label: string,
    readonly collapsibleState: vscode.TreeItemCollapsibleState,
    readonly details: Reminder
  ) {
    super(label, collapsibleState);
  }
}

export class ReminderDetailTreeItem extends vscode.TreeItem {
  constructor(readonly label: string) {
    super(label, vscode.TreeItemCollapsibleState.None);
  }
}
