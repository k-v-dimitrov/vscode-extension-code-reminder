import Reminder from "../models/reminder";
import * as vscode from "vscode";
import ReminderFactory from "../factory/reminder-factory";

export class RemindersProvider {
  private static instance: RemindersProvider;
  private reminderFactoryInstance: ReminderFactory;

  private constructor(private readonly context: vscode.ExtensionContext) {
    this.reminderFactoryInstance = new ReminderFactory();
  }

  public static getInstance(
    context?: vscode.ExtensionContext
  ): RemindersProvider {
    if (!this.instance) {
      this.createInstance(context);
    }

    return this.instance;
  }

  private static createInstance(context?: vscode.ExtensionContext) {
    if (!context) {
      throw new Error(
        "Application context instance was not provided to RemindersProvider"
      );
    }
    RemindersProvider.instance = new RemindersProvider(context);
  }

  get reminders() {
    return this.context.globalState.keys().map((key) => {
      const reminderPropsAsString = this.context.globalState.get<string>(key)!;
      const reminderPropsParsedObject = JSON.parse(reminderPropsAsString);
      return this.reminderFactoryInstance
        .fromObject(reminderPropsParsedObject)
        .create();
    });
  }

  saveReminder(reminder: Reminder) {
    const reminderToJSONString = JSON.stringify(reminder);
    this.context.globalState.update(reminder.id, reminderToJSONString);
  }
}
