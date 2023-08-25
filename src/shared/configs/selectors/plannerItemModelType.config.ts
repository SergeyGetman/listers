import i18next from 'i18next';

import { PlannerItemModelTypeEnum } from '../../enums/plannerItemModelType.enum';

type PlannerItemModelTypeConfigType = {
  [key: string]: {
    label: string;
    value: PlannerItemModelTypeEnum;
  };
};

export const PlannerItemModelTypeConfig: PlannerItemModelTypeConfigType = {
  [PlannerItemModelTypeEnum.task]: {
    value: PlannerItemModelTypeEnum.task,
    label: i18next.t('general.PlannerItemModelType.task'),
  },
  [PlannerItemModelTypeEnum.event]: {
    value: PlannerItemModelTypeEnum.event,
    label: i18next.t('general.PlannerItemModelType.event'),
  },
  [PlannerItemModelTypeEnum.payment]: {
    value: PlannerItemModelTypeEnum.payment,
    label: i18next.t('general.PlannerItemModelType.payment'),
  },
};
