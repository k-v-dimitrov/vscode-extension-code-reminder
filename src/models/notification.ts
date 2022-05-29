import * as vscode from "vscode";

import { globalEvents } from "../extension";

abstract class Notification {
  async showVSCodeInformationMessage(
    title: string,
    content: string,
    choiceMap: string[]
  ) {
    const choice = await vscode.window.showInformationMessage(
      title,
      { modal: true, detail: content },
      ...choiceMap
    );

    if (choice) {
      this.choiceHandler(choice);
    } else {
      // TODO: handle not selected choice
      console.log(`Did not receive notification choice for: ${content}`);
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
    this.showVSCodeInformationMessage(
      notificationTitle,
      notificationContent,
      choiceMap
    );
  }

  choiceHandler = (selectedChoice: string) => {
    console.log(selectedChoice);
  };
}
