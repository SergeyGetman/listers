import { ReactComponent as TodoStatus } from '../../assets/Images/planerItemStatuses/todo-status.svg';
import { ReactComponent as InProgressStatus } from '../../assets/Images/planerItemStatuses/in-progress-status.svg';
import { ReactComponent as DoneStatus } from '../../assets/Images/planerItemStatuses/done-status.svg';
import { ReactComponent as BacklogStatus } from '../../assets/Images/planerItemStatuses/backlog-status.svg';
import { ReactComponent as MissedStatus } from '../../assets/Images/planerItemStatuses/missed-status.svg';
import { ReactComponent as WentStatus } from '../../assets/Images/planerItemStatuses/went-status.svg';
import { ReactComponent as GoingsStatus } from '../../assets/Images/planerItemStatuses/going-status.svg';
import { ReactComponent as NotGoingStatus } from '../../assets/Images/planerItemStatuses/not-going-status.svg';
import { ReactComponent as PendingStatus } from '../../assets/Images/planerItemStatuses/pending-status.svg';
import { ReactComponent as MaybeStatus } from '../../assets/Images/planerItemStatuses/maybe-status.svg';
import { ReactComponent as PaidStatus } from '../../assets/Images/planerItemStatuses/paid-status.svg';
import { ReactComponent as LateStatus } from '../../assets/Images/planerItemStatuses/late-status.svg';
import { ReactComponent as NoAnswerStatus } from '../../assets/Images/planerItemStatuses/no-answer-status.svg';
import { ReactComponent as ScheduledStatus } from '../../assets/Images/planerItemStatuses/scheduled-status.svg';
import { ReactComponent as Accept } from '../../assets/Images/planerItemStatuses/accept-icon.svg';
import theme from '../../theme/theme';
import { PlannerItemStatusesEnum } from '../enums/plannerItemStatuses.enum';
import i18next from '../locales/i18n';

export type PlannerItemStatusesConfigType = {
  [key: string]: {
    label: string;
    id: PlannerItemStatusesEnum;
    icon: any;
    selectedBgColor: string;
    hoverBgColor: string;
    iconColor?: string;
    color?: string;
  };
};

export const plannerItemStatusesConfig: PlannerItemStatusesConfigType = {
  [PlannerItemStatusesEnum.todo]: {
    id: PlannerItemStatusesEnum.todo,
    label: i18next.t('general.statuses.todo'),
    icon: TodoStatus,
    iconColor: theme.palette.case.blue.b500,
    color: theme.palette.case.blue.b600,
    selectedBgColor: theme.palette.case.blue.b50,
    hoverBgColor: theme.palette.case.blue.b100,
  },
  [PlannerItemStatusesEnum.in_progress]: {
    id: PlannerItemStatusesEnum.in_progress,
    label: i18next.t('general.statuses.in_progress'),
    icon: InProgressStatus,
    iconColor: theme.palette.case.yellow.y500,
    color: theme.palette.case.yellow.y600,
    selectedBgColor: theme.palette.case.yellow.y50,
    hoverBgColor: theme.palette.case.yellow.y100,
  },
  [PlannerItemStatusesEnum.done]: {
    id: PlannerItemStatusesEnum.done,
    label: i18next.t('general.statuses.done'),
    icon: DoneStatus,
    iconColor: theme.palette.case.primary.p500,
    color: theme.palette.case.primary.p600,
    selectedBgColor: theme.palette.case.primary.p50,
    hoverBgColor: theme.palette.case.primary.p100,
  },
  [PlannerItemStatusesEnum.backlog]: {
    id: PlannerItemStatusesEnum.backlog,
    label: i18next.t('general.statuses.backlog'),
    icon: BacklogStatus,
    iconColor: theme.palette.case.orange.o500,
    color: theme.palette.case.orange.o600,
    selectedBgColor: theme.palette.case.orange.o50,
    hoverBgColor: theme.palette.case.orange.o100,
  },
  [PlannerItemStatusesEnum.late]: {
    id: PlannerItemStatusesEnum.late,
    label: i18next.t('general.statuses.late'),
    icon: LateStatus,
    selectedBgColor: theme.palette.case.warning.high,
    hoverBgColor: theme.palette.case.warning.light,
  },
  [PlannerItemStatusesEnum.missed]: {
    id: PlannerItemStatusesEnum.missed,
    label: i18next.t('general.statuses.missed'),
    icon: MissedStatus,
    selectedBgColor: theme.palette.case.warning.high,
    hoverBgColor: theme.palette.case.warning.light,
  },
  [PlannerItemStatusesEnum.went]: {
    id: PlannerItemStatusesEnum.went,
    label: i18next.t('general.statuses.went'),
    icon: WentStatus,
    iconColor: theme.palette.case.primary.p500,
    color: theme.palette.case.primary.p600,
    selectedBgColor: theme.palette.case.primary.p50,
    hoverBgColor: theme.palette.case.primary.p100,
  },
  [PlannerItemStatusesEnum.going]: {
    id: PlannerItemStatusesEnum.going,
    label: i18next.t('general.statuses.going'),
    icon: GoingsStatus,
    iconColor: theme.palette.case.primary.p500,
    color: theme.palette.case.primary.p600,
    selectedBgColor: theme.palette.case.primary.p50,
    hoverBgColor: theme.palette.case.primary.p100,
  },
  [PlannerItemStatusesEnum.not_going]: {
    id: PlannerItemStatusesEnum.not_going,
    label: i18next.t('general.statuses.not_going'),
    icon: NotGoingStatus,
    selectedBgColor: theme.palette.case.neutral.n400,
    hoverBgColor: theme.palette.case.neutral.n100,
  },
  [PlannerItemStatusesEnum.pending]: {
    id: PlannerItemStatusesEnum.pending,
    label: i18next.t('general.statuses.pending'),
    icon: PendingStatus,
    iconColor: theme.palette.case.purple.p500,
    color: theme.palette.case.purple.p600,
    selectedBgColor: theme.palette.case.purple.p50,
    hoverBgColor: theme.palette.case.purple.p100,
  },
  [PlannerItemStatusesEnum.maybe]: {
    id: PlannerItemStatusesEnum.maybe,
    label: i18next.t('general.statuses.maybe'),
    icon: MaybeStatus,
    iconColor: theme.palette.case.yellow.y500,
    color: theme.palette.case.yellow.y600,
    selectedBgColor: theme.palette.case.yellow.y50,
    hoverBgColor: theme.palette.case.yellow.y100,
  },
  [PlannerItemStatusesEnum.paid]: {
    id: PlannerItemStatusesEnum.paid,
    label: i18next.t('general.statuses.paid'),
    icon: WentStatus,
    selectedBgColor: theme.palette.primary.main,
    hoverBgColor: theme.palette.primary.light,
  },
  [PlannerItemStatusesEnum.unpaid]: {
    id: PlannerItemStatusesEnum.unpaid,
    label: i18next.t('general.statuses.pay'),
    icon: PaidStatus,
    selectedBgColor: theme.palette.case.main.purple.high,
    hoverBgColor: theme.palette.case.main.purple.light,
  },
  [PlannerItemStatusesEnum['no-answer']]: {
    id: PlannerItemStatusesEnum['no-answer'],
    label: i18next.t('general.statuses.no-answer'),
    icon: NoAnswerStatus,
    selectedBgColor: theme.palette.case.neutral.n400,
    hoverBgColor: theme.palette.case.neutral.n100,
  },
  [PlannerItemStatusesEnum.scheduled]: {
    id: PlannerItemStatusesEnum.scheduled,
    label: i18next.t('general.statuses.scheduled'),
    icon: ScheduledStatus,
    selectedBgColor: theme.palette.case.main.blue.high,
    hoverBgColor: theme.palette.case.main.blue.light,
  },

  [PlannerItemStatusesEnum.accept]: {
    id: PlannerItemStatusesEnum.accept,
    label: i18next.t('general.statuses.accept'),
    icon: Accept,
    selectedBgColor: theme.palette.case.primary.p600,
    hoverBgColor: theme.palette.case.primary.p200,
  },
  [PlannerItemStatusesEnum.decline]: {
    id: PlannerItemStatusesEnum.decline,
    label: i18next.t('general.statuses.decline'),
    icon: NotGoingStatus,
    selectedBgColor: theme.palette.case.red.r500,
    hoverBgColor: theme.palette.case.red.r200,
  },
};
