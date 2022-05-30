/* eslint-disable @typescript-eslint/naming-convention */
const DEV_CONFIG = {
  REMINDER_DEBUG_VALUES: true,
  REMINDER_DELAY_NOTIFICATION: true,
  REMINDER_WIPE_GLOBAl_STATE: true,
  REMINDER_DEV_LOGGER: true,
};

const PROD_CONFIG = {
  REMINDER_DEBUG_VALUES: false,
  REMINDER_DELAY_NOTIFICATION: false,
  REMINDER_WIPE_GLOBAl_STATE: false,
};

export default DEV_CONFIG;
