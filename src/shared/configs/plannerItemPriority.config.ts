import { ReactComponent as FlagIcon } from '../../assets/Images/flag-icon.svg';
import { PlannerItemPriorityEnum } from '../enums/plannerItemPriority.enum';
import theme from '../../theme/theme';
import i18next from '../locales/i18n';
type PlannerItemPriorityConfigType = {
  [key: string]: {
    label: PlannerItemPriorityEnum;
    id: PlannerItemPriorityEnum;
    icon: any;
    iconColor: string;
    borderColor: string;
    backgroundColor: string;
  };
};

export const plannerItemPriorityConfig: PlannerItemPriorityConfigType = {
  [PlannerItemPriorityEnum.high]: {
    id: PlannerItemPriorityEnum.high,
    label: i18next.t('general.priority.high'),
    icon: FlagIcon,
    iconColor: theme.palette.case.red.r500,
    borderColor: theme.palette.case.red.r300,
    backgroundColor: theme.palette.case.neutral.n0,
  },
  [PlannerItemPriorityEnum.middle]: {
    id: PlannerItemPriorityEnum.middle,
    label: i18next.t('general.priority.middle'),
    icon: FlagIcon,
    iconColor: theme.palette.case.yellow.y500,
    borderColor: theme.palette.case.yellow.y300,
    backgroundColor: theme.palette.case.neutral.n0,
  },
  [PlannerItemPriorityEnum.low]: {
    id: PlannerItemPriorityEnum.low,
    label: i18next.t('general.priority.low'),
    icon: FlagIcon,
    iconColor: theme.palette.case.primary.p500,
    borderColor: theme.palette.case.primary.p300,
    backgroundColor: theme.palette.case.neutral.n0,
  },
  [PlannerItemPriorityEnum.none]: {
    id: PlannerItemPriorityEnum.none,
    label: i18next.t('general.priority.none'),
    icon: FlagIcon,
    iconColor: theme.palette.case.neutral.n700,
    borderColor: theme.palette.case.neutral.n500,
    backgroundColor: theme.palette.case.neutral.n0,
  },
};
