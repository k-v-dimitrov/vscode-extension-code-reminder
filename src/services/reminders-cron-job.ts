import * as vscode from "vscode";
import * as cron from "node-cron";
import RemindersProvider from "./reminders-provider";

interface IRemindersCronJob {
  context: vscode.ExtensionContext;
  remindersProvider: RemindersProvider;
  pattern: string;
}
export interface RemindersCronJobFactory extends IRemindersCronJob {}
export class RemindersCronJobFactory {
  constructor() {
    this.pattern = "* * * * * *";
  }

  withVscodeContext(context: vscode.ExtensionContext) {
    this.context = context;
    return this;
  }

  withRemindersProvider(remindersProvider: RemindersProvider) {
    this.remindersProvider = remindersProvider;
    return this;
  }

  withCustomCronPattern(pattern: string) {
    this.pattern = pattern;
    return this;
  }

  create() {
    return new RemindersCronJob({
      context: this.context,
      pattern: this.pattern,
      remindersProvider: this.remindersProvider,
    });
  }
}

interface RemindersCronJob extends IRemindersCronJob {}
class RemindersCronJob {
  /**
   *
   */
  constructor(props: IRemindersCronJob) {
    const { context, pattern, remindersProvider } = props;
    this.context = context;
    this.pattern = pattern;
    this.remindersProvider = remindersProvider;
  }

  start() {
    cron.schedule(this.pattern, this.checkReminders);
  }

  private checkReminders() {
    this.remindersProvider.reminders.map((reminder) => {
      console.log("reminder", reminder.date);
      if (this.shouldFireReminder(reminder.date)) {
        vscode.window.showInformationMessage(
          "REMINDER REMINDER REMINDER",
          reminder.name
        );
        vscode.window.showInformationMessage(
          "REMINDER REMINDER REMINDER",
          reminder.name
        );
        vscode.window.showInformationMessage(
          "REMINDER REMINDER REMINDER",
          reminder.name
        );
      }
    });
  }

  private shouldFireReminder(reminderDate: Date) {
    console.log(Date.now().valueOf() - reminderDate.valueOf() >= 0);
    return Date.now().valueOf() - reminderDate.valueOf() >= 0;
  }
}
