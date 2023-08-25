import { TFunction } from 'i18next';
import { ReactComponent as TodoIcon } from '../../assets/Images/sidebar/todo.svg';
import { ReactComponent as CalendarIcon } from '../../assets/Images/sidebar/calendar.svg';
import { ReactComponent as JournalIcon } from '../../assets/Images/sidebar/journal.svg';
import { ReactComponent as TasksIcon } from '../../assets/Images/sidebar/roadmap.svg';
import { ReactComponent as BacklogIcon } from '../../assets/Images/sidebar/backlog.svg';

import { ReactComponent as BudgetIcon } from '../../assets/Images/sidebar/budget.svg';
import { ReactComponent as CloudIcon } from '../../assets/Images/sidebar/cloud.svg';

import theme from '../../theme/theme';
import { OrganizersEnum } from '../enums/organizers.enum';
import { SidebarEnum } from '../enums/sidebar.enum';

export type OrganizerItemType = {
  type: OrganizersEnum;
  label: SidebarEnum;
  icon?: any;
  color: string;
  description?: string;
  isComing?: boolean;
};

export const getOrganizerConfig = (t: TFunction): OrganizerItemType[] => [
  {
    type: OrganizersEnum.todo,
    label: t('organizers.type.todo.label'),
    icon: TodoIcon,
    color: theme.palette.case.neutral.n600,
    description: t('organizers.type.todo.description'),
  },
  {
    type: OrganizersEnum.calendar,
    label: t('organizers.type.calendar.label'),
    icon: CalendarIcon,
    color: theme.palette.case.neutral.n600,
    description: t('organizers.type.calendar.description'),
  },
  {
    type: OrganizersEnum.journal,
    label: t('organizers.type.journal.label'),
    icon: JournalIcon,
    color: theme.palette.case.neutral.n600,
    description: t('organizers.type.journal.description'),
  },
  {
    type: OrganizersEnum.tasks,
    label: t('organizers.type.tasks.label'),
    icon: TasksIcon,
    color: theme.palette.case.neutral.n600,
    description: t('organizers.type.tasks.description'),
  },
  {
    type: OrganizersEnum.backlog,
    label: t('organizers.type.backlog.label'),
    icon: BacklogIcon,
    color: theme.palette.case.neutral.n600,
    description: t('organizers.type.backlog.description'),
  },
  {
    type: OrganizersEnum.budget,
    label: t('organizers.type.budget.label'),
    icon: BudgetIcon,
    isComing: true,
    color: theme.palette.case.neutral.n600,
    description: t('organizers.type.budget.description'),
  },
  {
    type: OrganizersEnum.cloud,
    label: t('organizers.type.cloud.label'),
    icon: CloudIcon,
    isComing: true,
    color: theme.palette.case.neutral.n600,
    description: t('organizers.type.cloud.description'),
  },
];
