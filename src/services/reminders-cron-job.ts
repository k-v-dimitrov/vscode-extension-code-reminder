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
      if (this.shouldFireReminder(reminder.date)) {
        console.log("should fire already");
      }
    });
  }

  private shouldFireReminder(reminderDate: Date) {
    console.log();
    return Date.now() - reminderDate.getTime() >= 0;
  }
}

// Shows the VSCODE information message
// this.showVSCodeInformationMessage(
//   `Reminder: ${reminder.name}`,
//   "Go To File"
// );

// Helper function
// private showVSCodeInformationMessage = (
//   content: string,
//   okBtnText: string
// ) => {
//   vscode.window.showInformationMessage(content, okBtnText);
// };
