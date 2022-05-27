import * as vscode from "vscode";

import { RemindersCronJob } from "services/reminders-cron-job";
import type { IRemindersCronJob } from "services/reminders-cron-job";

export interface RemindersCronJobFactory extends IRemindersCronJob {}
export class RemindersCronJobFactory {
  constructor() {
    this.pattern = "* * * * * *";
  }

  withVscodeContext(context: vscode.ExtensionContext) {
    this.context = context;
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
    });
  }
}
