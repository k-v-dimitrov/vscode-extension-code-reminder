import * as vscode from "vscode";
import * as cron from "node-cron";
import { RemindersProvider } from "./reminders-provider";
import updateReminder from "../handlers/update-reminder.handler";
import Reminder from "../models/reminder";
import { GoToFileNotification } from "../models/notification";

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
      if (this.shouldFireReminder(reminder)) {
        new GoToFileNotification(
          `🕖  Reminder:`,
          reminder,
          reminder.reminderFileLocation
        );

        this.markReminderAsSeen(reminder.id);
      }
    });
  }

  private markReminderAsSeen(reminderId: string) {
    const reminder = RemindersProvider.getInstance().getReminder(reminderId);

    if (!reminder) {
      throw new Error(`could not find reminder with id: ${reminderId}`);
    }

    updateReminder(reminder.id, { wasNotificationShown: true });
  }

  private shouldFireReminder(reminder: Reminder): boolean {
    if (reminder.wasNotificationShown) {
      return false;
    }

    return Date.now() - reminder.date.getTime() >= 0;
  }
}
