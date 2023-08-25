import { TFunction } from 'i18next';
import i18next from '../../../../shared/locales/i18n';
import { ReactComponent as PlannerIcon } from '../../../../assets/Images/sidebar/journal.svg';
import { ReactComponent as ProfileIcon } from '../../../../assets/Images/sidebar/profile.svg';
import { ReactComponent as GarageIcon } from '../../../../assets/Images/sidebar/garage.svg';
import { ReactComponent as PlusIcon } from '../../../../assets/Images/sidebar/plus.svg';
import { ReactComponent as RoadmapIcon } from '../../../../assets/Images/sidebar/roadmap.svg';
import { ReactComponent as BacklogIcon } from '../../../../assets/Images/sidebar/backlog.svg';
import { ReactComponent as EventsIcon } from '../../../../assets/Images/sidebar/events.svg';
import { ReactComponent as CalendarIcon } from '../../../../assets/Images/sidebar/calendar.svg';
import { ReactComponent as TodoIcon } from '../../../../assets/Images/sidebar/todo.svg';
import { ReactComponent as SettingsIcon } from '../../../../assets/Images/sidebar/settings.svg';
import { ReactComponent as PlansIcon } from '../../../../assets/Images/sidebar/plans.svg';
import { ReactComponent as WalletIcon } from '../../../../assets/Images/sidebar/wallet.svg';
import { ReactComponent as ArchiveIcon } from '../../../../assets/Images/sidebar/archive.svg';
import { ReactComponent as FeedbackIcon } from '../../../../assets/Images/sidebar/feedback.svg';
import { ReactComponent as NetworkIcon } from '../../../../assets/Images/network/network-icon.svg';
import { ReactComponent as ChatIcon } from '../../../../assets/Images/chat-icon.svg';
import { ReactComponent as FeedIcon } from '../../../../assets/Images/feed-icon.svg';
import router from '../../../../shared/services/router';
import { SidebarEnum } from '../../../../shared/enums/sidebar.enum';
import theme from '../../../../theme/theme';

type SidebarConfigType = {
  [key: string]: {
    label: string;
    id: SidebarEnum;
    to: string;
    icon?: any;
    isShowBottomDivider?: boolean;
    color?: string;
  };
};

export const getSidebarConfig = (t: TFunction): SidebarConfigType => ({
  [SidebarEnum.todo]: {
    id: SidebarEnum.todo,
    label: t('general.leftSidebar.items.todo.label'),
    icon: TodoIcon,
    to: router.todo.path,
  },
  [SidebarEnum.hubs]: {
    id: SidebarEnum.hubs,
    label: t('general.leftSidebar.items.hubs.label'),
    icon: PlusIcon,
    to: `${router.settings.path}/${router.settings.children.hubs.path}`,
  },
  [SidebarEnum.organizer]: {
    id: SidebarEnum.organizer,
    label: t('general.leftSidebar.items.organizer.label'),
    to: `${router.organizer.path}`,
  },
  [SidebarEnum.settings]: {
    id: SidebarEnum.settings,
    label: t('general.leftSidebar.items.settings.label'),
    icon: SettingsIcon,
    to: `${router.settings.path}`,
    isShowBottomDivider: true,
  },
  [SidebarEnum.plans]: {
    id: SidebarEnum.plans,
    label: t('general.leftSidebar.items.plans.label'),
    icon: PlansIcon,
    to: `${router.settings.path}/${router.settings.children.plans.path}`,
  },
  [SidebarEnum.wallet]: {
    id: SidebarEnum.wallet,
    label: t('general.leftSidebar.items.wallet.label'),
    icon: WalletIcon,
    to: `${router.settings.path}/${router.settings.children.wallet.path}`,
    isShowBottomDivider: true,
  },
  [SidebarEnum.network]: {
    id: SidebarEnum.network,
    label: t('general.leftSidebar.items.network.label'),
    icon: NetworkIcon,
    to: `${router.network.path}`,
  },
  [SidebarEnum.chat]: {
    id: SidebarEnum.chat,
    label: t('general.leftSidebar.items.chat.label'),
    icon: ChatIcon,
    to: `${router.chat.path}`,
  },
  [SidebarEnum.notification]: {
    id: SidebarEnum.notification,
    label: t('general.leftSidebar.items.notification.label'),
    icon: FeedIcon,
    to: `${router.settings.path}/${router.settings.children.wallet.path}`,
  },
  [SidebarEnum.feedback]: {
    id: SidebarEnum.feedback,
    label: t('general.leftSidebar.items.feedback.label'),
    icon: FeedbackIcon,
    to: `${router.feedback.path}`,
    isShowBottomDivider: true,
  },
  [SidebarEnum.archive]: {
    id: SidebarEnum.archive,
    label: t('general.leftSidebar.items.archive.label'),
    icon: ArchiveIcon,
    to: `${router.settings.path}/${router.settings.children.archive.path}`,
  },
  [SidebarEnum.calendar]: {
    id: SidebarEnum.calendar,
    label: t('general.leftSidebar.items.calendar.label'),
    icon: CalendarIcon,
    to: router.calendar.path,
  },
  [SidebarEnum.planner]: {
    id: SidebarEnum.planner,
    label: t('general.leftSidebar.items.planner.label'),
    icon: PlannerIcon,
    to: router.journal.path,
  },
  [SidebarEnum.events]: {
    id: SidebarEnum.events,
    label: t('general.leftSidebar.items.events.label'),
    icon: EventsIcon,
    to: router.events.path,
  },
  [SidebarEnum.roadmap]: {
    id: SidebarEnum.roadmap,
    label: t('general.leftSidebar.items.tasks.label'),
    icon: RoadmapIcon,
    to: router.roadmap.path,
  },
  [SidebarEnum.backlog]: {
    id: SidebarEnum.backlog,
    label: t('general.leftSidebar.items.backlog.label'),
    icon: BacklogIcon,
    to: router.backlog.path,
  },

  [SidebarEnum.profile]: {
    id: SidebarEnum.profile,
    label: t('general.leftSidebar.items.profile.label'),
    icon: ProfileIcon,
    to: router.profile.path,
  },
  [SidebarEnum.garage]: {
    id: SidebarEnum.garage,
    label: t('general.leftSidebar.items.garage.label'),
    icon: GarageIcon,
    to: router.garageNew.path,
  },
  [SidebarEnum.garage_new]: {
    id: SidebarEnum.garage_new,
    label: t('general.leftSidebar.items.garage_new.label'),
    icon: GarageIcon,
    to: router.garageNew.path,
    color: theme.palette.case.primary.p600,
  },
  [SidebarEnum.test_create_car]: {
    id: SidebarEnum.test_create_car,
    label: 'Create Car',
    icon: GarageIcon,
    to: router.createNewCar.path,
    color: theme.palette.case.primary.p600,
  },
});

const SidebarConfig = getSidebarConfig(i18next.t);

export default SidebarConfig;
