import i18next from '../../../../../../../../shared/locales/i18n';
import { ReactComponent as TodoIcon } from '../../../../../../../../assets/Images/sidebar/todo.svg';
import theme from '../../../../../../../../theme/theme';
import { ReactComponent as PlannerIcon } from '../../../../../../../../assets/Images/sidebar/planner.svg';
import { ReactComponent as RoadmapIcon } from '../../../../../../../../assets/Images/sidebar/roadmap.svg';
import { ReactComponent as BacklogIcon } from '../../../../../../../../assets/Images/sidebar/backlog.svg';
import { ReactComponent as EventsIcon } from '../../../../../../../../assets/Images/sidebar/events.svg';
import { ReactComponent as GarageIcon } from '../../../../../../../../assets/Images/sidebar/garage.svg';
import { ReactComponent as NetworkIcon } from '../../../../../../../../assets/Images/sidebar/network.svg';
import { ReactComponent as CalendarIcon } from '../../../../../../../../assets/Images/sidebar/calendar.svg';
import { ReactComponent as ArchiveIcon } from '../../../../../../../../assets/Images/sidebar/archive.svg';
import { ReactComponent as ChatIcon } from '../../../../../../../../assets/Images/sidebar/chat.svg';
import { PlanItemsEnum } from '../../../../../../../../shared/enums/planItems.enum';

export const downgradeHubsConfig = [
  {
    id: PlanItemsEnum.todo,
    label: i18next.t('general.planItems.todo'),
    icon: TodoIcon,
    bgColor: theme.palette.case.contrast.white,
  },
  {
    id: PlanItemsEnum.planner,
    label: i18next.t('general.planItems.journal'),
    icon: PlannerIcon,
    bgColor: theme.palette.case.main.blue.middle,
  },
  {
    id: PlanItemsEnum.roadmap,
    label: i18next.t('general.planItems.roadmap'),
    icon: RoadmapIcon,
    bgColor: theme.palette.case.main.purple.high,
  },
  {
    id: PlanItemsEnum.backlog,
    label: i18next.t('general.planItems.backlog'),
    icon: BacklogIcon,
    bgColor: theme.palette.case.main.orange.high,
  },
  {
    id: PlanItemsEnum.events,
    label: i18next.t('general.planItems.events'),
    icon: EventsIcon,
    bgColor: theme.palette.case.warning.middle,
  },
  {
    id: PlanItemsEnum.garage,
    label: i18next.t('general.planItems.garage'),
    icon: GarageIcon,
    bgColor: theme.palette.primary.main,
  },
  {
    id: PlanItemsEnum.network,
    label: i18next.t('general.planItems.network'),
    icon: NetworkIcon,
    bgColor: theme.palette.case.main.yellow.high,
  },
  {
    id: PlanItemsEnum.chat,
    label: i18next.t('general.planItems.chat'),
    icon: ChatIcon,
    bgColor: theme.palette.case.main.gey.high,
  },
  {
    id: PlanItemsEnum.calendar,
    label: i18next.t('general.planItems.calendar'),
    icon: CalendarIcon,
    bgColor: theme.palette.primary.main,
  },
  {
    id: PlanItemsEnum.archive,
    label: i18next.t('general.planItems.archive'),
    icon: ArchiveIcon,
    bgColor: theme.palette.case.main.orange.high,
  },
];
