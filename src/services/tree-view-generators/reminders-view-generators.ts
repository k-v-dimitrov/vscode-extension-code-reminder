import Reminder from "models/reminder";
import { ReminderDetailTreeItem } from "../reminders-tree-data-provider";

export class DetailItemGenerator {
  private static instance: DetailItemGenerator;

  private static generators: Array<{
    type: keyof Reminder;
    generator: DetailTreeItemGenerator;
  }> = [];

  private constructor() {}

  public addGenerator(
    type: keyof Reminder,
    generator: DetailTreeItemGenerator
  ) {
    DetailItemGenerator.generators.push({ type, generator });
  }

  public static getInstance(): DetailItemGenerator {
    if (!DetailItemGenerator.instance) {
      DetailItemGenerator.instance = new DetailItemGenerator();
    }

    return DetailItemGenerator.instance;
  }

  public generateDetailItem(detailType: keyof Reminder, detailData: string) {
    const suitableGenerator = DetailItemGenerator.generators.find(
      (generator) => generator.type === detailType
    )?.generator;

    if (suitableGenerator) {
      return suitableGenerator.generate(detailData);
    }

    return null;

    // DEV PURPOSES ONLY
    // return new DetailTreeItemGenerator().generate(
    //   `${detailType}: ${detailData}`
    // );
  }
}

class DetailTreeItemGenerator {
  constructor() {}
  generate(detailData: string): ReminderDetailTreeItem {
    return new ReminderDetailTreeItem("⁉️: " + detailData);
  }
}

export class NameGenerator extends DetailTreeItemGenerator {
  generate(detailData: string): ReminderDetailTreeItem {
    return new ReminderDetailTreeItem(`⏰ ${detailData}`);
  }
}

export class DateGenerator extends DetailTreeItemGenerator {
  generate(detailData: string): ReminderDetailTreeItem {
    return new ReminderDetailTreeItem("📅 Remind date : " + detailData);
  }
}

export class FileLocationGenerator extends DetailTreeItemGenerator {
  generate(detailData: string): ReminderDetailTreeItem {
    return new ReminderDetailTreeItem("📂: " + detailData);
  }
}

export class CreatedAtGenerator extends DetailTreeItemGenerator {
  generate(detailData: string): ReminderDetailTreeItem {
    return new ReminderDetailTreeItem("#️⃣ Created At: " + detailData);
  }
}

export class LineAtGenerator extends DetailTreeItemGenerator {
  generate(detailData: string): ReminderDetailTreeItem {
    return new ReminderDetailTreeItem("⚔️ On Line: " + detailData);
  }
}
