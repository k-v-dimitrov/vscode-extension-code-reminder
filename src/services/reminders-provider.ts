import Reminder from "../models/reminder";
import * as vscode from "vscode";
import ReminderFactory from "../factory/reminder-factory";
export default class RemindersProvider {
  private reminderFactoryInstance;

  constructor(private readonly context: vscode.ExtensionContext) {
    this.reminderFactoryInstance = new ReminderFactory();
  }

  get reminders() {
    return this.context.globalState.keys().map((key) => {
      const reminderPropsObject = this.context.globalState.get(key);
      return this.reminderFactoryInstance
        .fromObject(reminderPropsObject)
        .create();
    });
  }

  saveReminder(reminder: Reminder) {
    console.log(JSON.stringify(reminder, null, 4));

    this.context.globalState.update(reminder.id, reminder);
  }
}
