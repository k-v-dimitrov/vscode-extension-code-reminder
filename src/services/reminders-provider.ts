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
