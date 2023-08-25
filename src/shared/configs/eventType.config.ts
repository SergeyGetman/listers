import { EventTypeEnum } from '../enums/eventType.enum';
import i18next from '../locales/i18n';

type EventTypeConfigType = {
  [key: string]: {
    label: string;
    value: EventTypeEnum;
  };
};
export const EventTypeConfig: EventTypeConfigType = {
  online: {
    value: EventTypeEnum.online,
    label: i18next.t('general.eventType.online'),
  },
  in_person: {
    value: EventTypeEnum.in_person,
    label: i18next.t('general.eventType.inPerson'),
  },
  call: {
    value: EventTypeEnum.call,
    label: i18next.t('general.eventType.call'),
  },
};
