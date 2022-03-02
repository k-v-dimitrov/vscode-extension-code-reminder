import Reminder from "../reminder";

export default class ReminderFactory {
  private name?: string;
  private reminderDate?: Date;
  private fileLocation?: string;
  private line?: number;

  withName(name: string) {
    this.name = name;
    return this;
  }

  withReminderDate(date: Date) {
    this.reminderDate = date;
    return this;
  }

  withFileLocation(fileLocation: string) {
    this.fileLocation = fileLocation;
    return this;
  }

  withLineNumber(line: number) {
    this.line = line;
    return this;
  }

  create() {
    if (!this.name) {
      throw new Error("Cannot create Reminder without name");
    }

    if (!this.reminderDate) {
      throw new Error("Cannot create Reminder without date");
    }

    if (!this.fileLocation) {
      throw new Error("Cannot create Reminder without filename");
    }

    if (typeof this.line === "undefined") {
      throw new Error("Cannot create Reminder without selected line");
    }

    return new Reminder(
      this.name,
      this.reminderDate,
      this.line,
      this.fileLocation
    );
  }
}
