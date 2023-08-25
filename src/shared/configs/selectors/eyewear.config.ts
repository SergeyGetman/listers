import i18next from 'i18next';
import { EyewearEnum } from '../../enums/eyewear.enum';

type EyewearConfigType = {
  [key: string]: {
    label: string;
    value: EyewearEnum;
  };
};

export const EyewearConfig: EyewearConfigType = {
  [EyewearEnum.contact_lenses]: {
    value: EyewearEnum.contact_lenses,
    label: i18next.t('general.eyewear.contactLenses'),
  },
  [EyewearEnum.glasses]: {
    value: EyewearEnum.glasses,
    label: i18next.t('general.eyewear.glasses'),
  },
  [EyewearEnum.contact_lenses_glasses]: {
    value: EyewearEnum.contact_lenses_glasses,
    label: i18next.t('general.eyewear.contactLensesGlasses'),
  },
  [EyewearEnum.other]: {
    value: EyewearEnum.other,
    label: i18next.t('general.eyewear.other'),
  },
};
