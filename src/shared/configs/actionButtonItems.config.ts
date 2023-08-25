import { ReactComponent as GoingsStatus } from '../../assets/Images/planerItemStatuses/going-status.svg';
import { ReactComponent as NotGoingStatus } from '../../assets/Images/planerItemStatuses/not-going-status.svg';
import { ReactComponent as MaybeStatus } from '../../assets/Images/planerItemStatuses/maybe-status.svg';
import { ReactComponent as Accept } from '../../assets/Images/planerItemStatuses/accept-icon.svg';
import theme from '../../theme/theme';
import { PlannerItemStatusesEnum } from '../enums/plannerItemStatuses.enum';
import i18next from '../locales/i18n';

type ActionButtonItemsConfigType = {
  [key: string]: { label: string; id: string; icon: any; selectedBgColor: string; hoverBgColor: string };
};

export const actionButtonItemsConfig: ActionButtonItemsConfigType = {
  [PlannerItemStatusesEnum.going]: {
    id: PlannerItemStatusesEnum.going,
    label: i18next.t('general.statuses.going'),
    icon: GoingsStatus,
    selectedBgColor: theme.palette.primary.main,
    hoverBgColor: theme.palette.primary.light,
  },
  [PlannerItemStatusesEnum.not_going]: {
    id: PlannerItemStatusesEnum.not_going,
    label: i18next.t('general.statuses.not_going'),
    icon: NotGoingStatus,
    selectedBgColor: theme.palette.case.contrast.black,
    hoverBgColor: theme.palette.case.neutral.n400,
  },

  [PlannerItemStatusesEnum.maybe]: {
    id: PlannerItemStatusesEnum.maybe,
    label: i18next.t('general.statuses.maybe'),
    icon: MaybeStatus,
    selectedBgColor: theme.palette.case.main.yellow.high,
    hoverBgColor: theme.palette.case.main.yellow.light,
  },
  [PlannerItemStatusesEnum.accept]: {
    id: PlannerItemStatusesEnum.accept,
    label: i18next.t('general.statuses.accept'),
    icon: Accept,
    selectedBgColor: theme.palette.primary.main,
    hoverBgColor: theme.palette.primary.light,
  },
  [PlannerItemStatusesEnum.decline]: {
    id: PlannerItemStatusesEnum.decline,
    label: i18next.t('general.statuses.decline'),
    icon: NotGoingStatus,
    selectedBgColor: theme.palette.case.contrast.black,
    hoverBgColor: theme.palette.case.neutral.n400,
  },
};
