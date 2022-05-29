import * as vscode from "vscode";

import { globalEvents } from "../extension";

abstract class Notification {
  async showReminderCTA(title: string, content: string, choiceMap: string[]) {
    const reminderText = `${title} ${content}`;

    const choice = await Promise.race([
      vscode.window.showQuickPick(choiceMap, {
        title: reminderText,
        placeHolder: choiceMap[0],
      }),

      vscode.window.showInformationMessage(reminderText, ...choiceMap),
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
    private readonly notificationContent: string,
    private readonly fileLocation: string,
    private readonly choiceMap: string[] = ["Open file", "Resolved"]
  ) {
    super();
    this.showReminderCTA(notificationTitle, notificationContent, choiceMap);
  }

  choiceHandler = async (selectedChoice: string) => {
    switch (selectedChoice) {
      case "Open file":
        console.log("opens file");

        let doc = await vscode.workspace.openTextDocument(this.fileLocation); // calls back into the provider
        await vscode.window.showTextDocument(doc, { preview: false });

        break;

      case "Resolved":
        break;
    }
  };
}
