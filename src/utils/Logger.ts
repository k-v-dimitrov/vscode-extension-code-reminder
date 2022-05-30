import CONFIG from "../config/config";

export class Logger {
  public static log(message?: any, ...optionalParams: any) {
    CONFIG.REMINDER_DEV_LOGGER &&
      console.log("[INFO]: ", message, ...optionalParams);
  }

  public static error(message?: any, ...optionalParams: any) {
    CONFIG.REMINDER_DEV_LOGGER &&
      console.error("[ERROR]: ", message, ...optionalParams);
  }

  public static warn(message?: any, ...optionalParams: any) {
    CONFIG.REMINDER_DEV_LOGGER &&
      console.warn("[WARN]: ", message, ...optionalParams);
  }
}
