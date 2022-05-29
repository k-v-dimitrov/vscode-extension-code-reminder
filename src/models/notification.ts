import deleteReminder from "../handlers/delete-reminder.handler";
import * as vscode from "vscode";

import { globalEvents } from "../extension";
import Reminder from "./reminder";
import updateReminder from "../handlers/update-reminder.handler";

abstract class Notification {
  async showReminderCTA(title: string, content: string, choiceMap: string[]) {
    const reminderText = `${title} ${content}`;

    vscode.window.showInformationMessage(reminderText);

    const choice = await Promise.race([
      vscode.window.showQuickPick(choiceMap, {
        title: reminderText,
        placeHolder: choiceMap[0],
      }),
    ]);

    if (choice) {
      this.choiceHandler(choice);
    } else {
      globalEvents.emit("refresh-tree-data");
    }
  }

  abstract choiceHandler: (selectedChoice: string) => void;
}

// Custom Notifications

export class GoToFileNotification extends Notification {
  constructor(
    private readonly notificationTitle: string,
    private readonly reminder: Reminder,
    private readonly fileLocation: string,
    private readonly choiceMap: string[] = [
      "Open file",
      "Resolved",
      "Notify Again in 1 minutes",
      "Notify Again in 5 minutes",
      "Notify Again in 10 minutes",
    ]
  ) {
    super();
    this.showReminderCTA(notificationTitle, reminder.name, choiceMap);
  }

  choiceHandler = async (selectedChoice: string) => {
    switch (selectedChoice) {
      case "Open file":
        await this.openReminderTextFile();
        deleteReminder(this.reminder.id);
        break;

      case "Resolved":
        deleteReminder(this.reminder.id);
        break;

      case "Notify Again in 1 minutes":
        updateReminder(this.reminder.id, {
          wasNotificationShown: false,
          date: this.addMinutesToDate(this.reminder.date, 1),
        });

        break;

      case "Notify Again in 5 minutes":
        updateReminder(this.reminder.id, {
          wasNotificationShown: false,
          date: this.addMinutesToDate(this.reminder.date, 5),
        });

        break;

      case "Notify Again in 10 minutes":
        updateReminder(this.reminder.id, {
          wasNotificationShown: false,
          date: this.addMinutesToDate(this.reminder.date, 10),
        });

        break;
    }

    globalEvents.emit("refresh-tree-data");
  };

  private async openReminderTextFile() {
    let doc = await vscode.workspace.openTextDocument(this.fileLocation); // calls back into the provider
    await vscode.window.showTextDocument(doc, { preview: false });
  }

  addMinutesToDate(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
  }
}
