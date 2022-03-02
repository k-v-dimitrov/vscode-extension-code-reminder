import Reminder from "../reminder";

export default class ReminderFactory {
  private name?: string;
  private reminderDate?: Date;

  withName(name: string) {
    this.name = name;
    return this;
  }

  withReminderDate(date: Date) {
    this.reminderDate = date;
    return this;
  }

  create() {
    if (!this.name) {
      throw new Error("Cannot create Reminder without name");
    }

    if (!this.reminderDate) {
      throw new Error("Cannot create Reminder without date");
    }

    return new Reminder(this.name, this.reminderDate);
  }
}
