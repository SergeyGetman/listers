import i18next from 'i18next';
import { EyeColorEnum } from '../../enums/eyeColor.enum';

type EyeColorConfigType = {
  [key: string]: {
    label: string;
    value: EyeColorEnum;
  };
};

export const EyeColorConfig: EyeColorConfigType = {
  [EyeColorEnum.blue]: {
    value: EyeColorEnum.blue,
    label: i18next.t('general.eyeColor.blue'),
  },
  [EyeColorEnum.black]: {
    value: EyeColorEnum.black,
    label: i18next.t('general.eyeColor.black'),
  },
  [EyeColorEnum.gray]: {
    value: EyeColorEnum.gray,
    label: i18next.t('general.eyeColor.gray'),
  },
  [EyeColorEnum.brown]: {
    value: EyeColorEnum.brown,
    label: i18next.t('general.eyeColor.brown'),
  },
  [EyeColorEnum.hazel]: {
    value: EyeColorEnum.hazel,
    label: i18next.t('general.eyeColor.hazel'),
  },
  [EyeColorEnum.green]: {
    value: EyeColorEnum.green,
    label: i18next.t('general.eyeColor.green'),
  },
  [EyeColorEnum.changes_frequently]: {
    value: EyeColorEnum.changes_frequently,
    label: i18next.t('general.eyeColor.changesFrequently'),
  },
  [EyeColorEnum.other]: {
    value: EyeColorEnum.other,
    label: i18next.t('general.eyeColor.other'),
  },
};
