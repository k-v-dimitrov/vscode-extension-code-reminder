import * as vscode from "vscode";
import * as cron from "node-cron";
import { RemindersProvider } from "./reminders-provider";

export interface IRemindersCronJob {
  context: vscode.ExtensionContext;
  pattern: string;
}

export interface RemindersCronJob extends IRemindersCronJob {}
export class RemindersCronJob {
  /**
   *
   */
  constructor(props: IRemindersCronJob) {
    const { context, pattern } = props;
    this.context = context;
    this.pattern = pattern;
    this.checkReminders = this.checkReminders.bind(this);
  }

  start() {
    const checkRemindersTask = cron.schedule(this.pattern, this.checkReminders);
    checkRemindersTask.start();
  }

  private checkReminders() {
    RemindersProvider.getInstance().reminders.map((reminder) => {
      // TODO: fix new Date(reminder.date);
      if (this.shouldFireReminder(new Date(reminder.date))) {
        // this.showVSCodeInformationMessage(
        //   `Reminder: ${reminder.name}`,
        //   "Go To File"
        // );
      }
    });
  }

  // private showVSCodeInformationMessage = (
  //   content: string,
  //   okBtnText: string
  // ) => {
  //   vscode.window.showInformationMessage(content, okBtnText);
  // };

  private shouldFireReminder(reminderDate: Date) {
    console.log("Diff: ", Date.now().valueOf(), reminderDate.valueOf());

    return Date.now().valueOf() - reminderDate.valueOf() >= 0;
  }
}
