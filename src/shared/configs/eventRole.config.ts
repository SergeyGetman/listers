import { EventRoleEnum } from '../enums/eventRole.enum';
import i18next from '../locales/i18n';

type EventRoleConfigType = {
  [key: string]: {
    label: string;
    value: EventRoleEnum;
  };
};

export const EventRoleConfig: EventRoleConfigType = {
  host: {
    value: EventRoleEnum.host,
    label: i18next.t('general.eventRole.host'),
  },
  guest: {
    value: EventRoleEnum.guest,
    label: i18next.t('general.eventRole.guest'),
  },
};
