import Reminder from "../models/reminder";
import * as vscode from "vscode";
import ReminderFactory from "../factory/reminder-factory";

export class RemindersProvider {
  private static instance: RemindersProvider;

  private constructor(private readonly context: vscode.ExtensionContext) {}

  public static init(context?: vscode.ExtensionContext) {
    if (!context) {
      throw new Error(
        "Application context instance was not provided to RemindersProvider"
      );
    }
    RemindersProvider.instance = new RemindersProvider(context);
  }

  public static getInstance(): RemindersProvider {
    return this.instance;
  }

  get reminders() {
    return this.context.globalState.keys().map((key) => {
      const reminderPropsAsString = this.context.globalState.get<string>(key)!;
      const reminderPropsParsedObject = JSON.parse(reminderPropsAsString);
      return new ReminderFactory()
        .fromObject(reminderPropsParsedObject)
        .create();
    });
  }

  getReminder(id: string) {
    return this.reminders.find((reminder) => reminder.id === id);
  }

  saveReminder(reminder: Reminder) {
    const reminderToJSONString = JSON.stringify(reminder);
    this.context.globalState.update(reminder.id, reminderToJSONString);
  }
}
