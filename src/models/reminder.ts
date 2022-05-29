import { v4 as uuid } from "uuid";
import AuditableEntity from "./auditableEntity";
import * as Joi from "joi";
export interface IReminder {
  id: string;
  name: string;
  date: Date;
  reminderLine: number;
  reminderFileLocation: string;
  completed?: boolean;
}

const reminderValidator = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  date: Joi.date().required(),
  reminderLine: Joi.number().required(),
  reminderFileLocation: Joi.string().required(),
});

interface Reminder extends IReminder {}
class Reminder extends AuditableEntity {
  constructor(props: IReminder) {
    super();
    console.log(props);

    if (props.id === "") {
      props.id = uuid();
    }

    Object.assign(this, props);
  }

  static isReminder(obj: any): obj is Reminder {
    return obj && reminderValidator.validate(obj);
  }
}

export default Reminder;
