import { TFunction } from 'i18next';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoneIcon from '@mui/icons-material/Done';

import { ReactComponent as BudgetIcon } from '../../../assets/Images/sidebar/budget.svg';
import { ReactComponent as CloudIcon } from '../../../assets/Images/sidebar/cloud.svg';

import { ReactComponent as CrownSilverIcon } from '../../../assets/Images/сrown-silver-package.svg';
import { ReactComponent as CrownPlatinumIcon } from '../../../assets/Images/crown-platinum-package.svg';
import { ReactComponent as CrownGoldIcon } from '../../../assets/Images/сrown-gold-package.svg';

import { ReactComponent as CustomizeIcon } from '../../../assets/Images/filter.svg';

import { ReactComponent as DuplicateIcon } from '../../../assets/Images/actionsIcons/duplicate.svg';
import { ReactComponent as ShareIcon } from '../../../assets/Images/actionsIcons/share.svg';
import { ReactComponent as ConvertIcon } from '../../../assets/Images/actionsIcons/convert.svg';
import { ReactComponent as DueDateIcon } from '../../../assets/Images/actionsIcons/dueDate.svg';

import { ReactComponent as FinancesIcon } from '../../../assets/Images/onboarding/finances.svg';
import { ReactComponent as TodoIcon } from '../../../assets/Images/sidebar/todo.svg';
import { ReactComponent as CommentIcon } from '../../../assets/Images/actionsIcons/comment.svg';
import { ReactComponent as FlagIcon } from '../../../assets/Images/actionsIcons/flag.svg';
import { ReactComponent as PriorityIcon } from '../../../assets/Images/actionsIcons/priority.svg';

export type PlansTableOrganizerItemsType = {
  title: string;
  icon: JSX.Element;

  listItems: { icon: JSX.Element; text: string }[];
};

export type PlansTableOrganizerItemsComingSoonType = {
  title: string;
  isComingSoon: boolean;
  icon: JSX.Element;
  description: string;
};

export const getPlansTableOrganizerItemsConfig = (
  t: TFunction,
): PlansTableOrganizerItemsType[][] | any | PlansTableOrganizerItemsComingSoonType[] => [
  [
    {
      title: t('silver'),
      icon: <CrownSilverIcon />,
      // label: t('onboarding.fifthSlide.selectors.kids'),
      listItems: [
        { icon: <DoneIcon />, text: t('table.description.createChecklists') },
        { icon: <CustomizeIcon />, text: t('table.description.customize') },
        { icon: <DuplicateIcon />, text: t('table.description.duplicate') },
        { icon: <ShareIcon />, text: t('table.description.share') },
      ],
    },
    {
      title: t('gold'),
      icon: <CrownGoldIcon />,
      listItems: [
        { icon: <DoneIcon />, text: t('table.description.createChecklists') },
        { icon: <CustomizeIcon />, text: t('table.description.customize') },
        { icon: <DuplicateIcon />, text: t('table.description.duplicate') },
        { icon: <ShareIcon />, text: t('table.description.share') },
        { icon: <ConvertIcon />, text: t('table.description.convertToTask') },
        { icon: <DueDateIcon />, text: t('table.description.dueDate') },
      ],
    },
    {
      title: t('platinum'),
      icon: <CrownPlatinumIcon />,
      listItems: [
        { icon: <DoneIcon />, text: t('table.description.createChecklists') },
        { icon: <CustomizeIcon />, text: t('table.description.customize') },
        { icon: <DuplicateIcon />, text: t('table.description.duplicate') },
        { icon: <ShareIcon />, text: t('table.description.share') },
        { icon: <ConvertIcon />, text: t('table.description.convertToTask') },
        { icon: <DueDateIcon />, text: t('table.description.dueDate') },
      ],
    },
  ],
  [
    {
      title: t('silver'),

      icon: <CrownSilverIcon />,
      listItems: [
        { icon: <DoneIcon />, text: t('table.description.limitedEventsTasks') },
        { icon: <TodoIcon />, text: t('table.description.addNotesChecklists') },
        { icon: <CommentIcon />, text: t('table.description.comment') },
        { icon: <CheckCircleOutlineIcon />, text: t('table.description.changeStatus') },
      ],
    },
    {
      title: t('gold'),
      icon: <CrownGoldIcon />,
      listItems: [
        { icon: <DoneIcon />, text: t('table.description.createEventsTasks') },
        { icon: <TodoIcon />, text: t('table.description.addNotesChecklists') },
        { icon: <CommentIcon />, text: t('table.description.comment') },
        { icon: <CheckCircleOutlineIcon />, text: t('table.description.changeStatus') },
        { icon: <FlagIcon />, text: t('table.description.trackProgress') },
        { icon: <DueDateIcon />, text: t('table.description.dueDate') },
        { icon: <PriorityIcon />, text: t('table.description.priority') },
        { icon: <ShareIcon />, text: t('table.description.share') },
      ],
    },
    {
      title: t('platinum'),
      icon: <CrownPlatinumIcon />,
      listItems: [
        { icon: <DoneIcon />, text: t('table.description.createEventsTasks') },
        { icon: <TodoIcon />, text: t('table.description.addNotesChecklists') },
        { icon: <CommentIcon />, text: t('table.description.comment') },
        { icon: <CheckCircleOutlineIcon />, text: t('table.description.changeStatus') },
        { icon: <FlagIcon />, text: t('table.description.trackProgress') },
        { icon: <DueDateIcon />, text: t('table.description.dueDate') },
        { icon: <PriorityIcon />, text: t('table.description.priority') },
        { icon: <ShareIcon />, text: t('table.description.share') },
        { icon: <FinancesIcon />, text: t('table.description.autoScheduledPayments') },
      ],
    },
  ],
  [
    {
      title: t('silver'),

      icon: <CrownSilverIcon />,
      listItems: [
        { icon: <DoneIcon />, text: t('table.description.limitedEventsTasks') },
        { icon: <TodoIcon />, text: t('table.description.addNotesChecklists') },
        { icon: <CheckCircleOutlineIcon />, text: t('table.description.changeStatus') },
        { icon: <CommentIcon />, text: t('table.description.comment') },
      ],
    },
    {
      title: t('gold'),
      icon: <CrownGoldIcon />,
      listItems: [
        { icon: <AddIcon />, text: t('table.description.createTasks') },
        { icon: <TodoIcon />, text: t('table.description.addNotesChecklists') },
        { icon: <CheckCircleOutlineIcon />, text: t('table.description.changeStatus') },
        { icon: <CommentIcon />, text: t('table.description.comment') },
        { icon: <FlagIcon />, text: t('table.description.trackProgress') },
        { icon: <DueDateIcon />, text: t('table.description.dueDate') },
        { icon: <PriorityIcon />, text: t('table.description.priority') },
        { icon: <ShareIcon />, text: t('table.description.share') },
      ],
    },
    {
      title: t('platinum'),
      icon: <CrownPlatinumIcon />,
      listItems: [
        { icon: <AddIcon />, text: t('table.description.createTasks') },
        { icon: <TodoIcon />, text: t('table.description.addNotesChecklists') },
        { icon: <CheckCircleOutlineIcon />, text: t('table.description.changeStatus') },
        { icon: <CommentIcon />, text: t('table.description.comment') },
        { icon: <FlagIcon />, text: t('table.description.trackProgress') },
        { icon: <DueDateIcon />, text: t('table.description.dueDate') },
        { icon: <PriorityIcon />, text: t('table.description.priority') },
        { icon: <ShareIcon />, text: t('table.description.share') },
      ],
    },
  ],
  [
    {
      title: t('silver'),

      icon: <CrownSilverIcon />,
      listItems: [
        { icon: <DoneIcon />, text: t('table.description.limitedEventsTasks') },
        { icon: <TodoIcon />, text: t('table.description.addNotesChecklists') },
        { icon: <CheckCircleOutlineIcon />, text: t('table.description.changeStatus') },
        { icon: <CommentIcon />, text: t('table.description.comment') },
      ],
    },
    {
      title: t('gold'),
      icon: <CrownGoldIcon />,
      listItems: [
        { icon: <AddIcon />, text: t('table.description.createTasks') },
        { icon: <TodoIcon />, text: t('table.description.addNotesChecklists') },
        { icon: <CheckCircleOutlineIcon />, text: t('table.description.changeStatus') },
        { icon: <CommentIcon />, text: t('table.description.comment') },
        { icon: <DueDateIcon />, text: t('table.description.dueDate') },
        { icon: <PriorityIcon />, text: t('table.description.priority') },
        { icon: <ShareIcon />, text: t('table.description.share') },
      ],
    },
    {
      title: t('platinum'),
      icon: <CrownPlatinumIcon />,
      listItems: [
        { icon: <AddIcon />, text: t('table.description.createTasks') },
        { icon: <TodoIcon />, text: t('table.description.addNotesChecklists') },
        { icon: <CheckCircleOutlineIcon />, text: t('table.description.changeStatus') },
        { icon: <CommentIcon />, text: t('table.description.comment') },
        { icon: <DueDateIcon />, text: t('table.description.dueDate') },
        { icon: <PriorityIcon />, text: t('table.description.priority') },
        { icon: <ShareIcon />, text: t('table.description.share') },
      ],
    },
  ],
  {
    title: t('table.leftColumnItems.budget'),
    isComingSoon: true,
    icon: <BudgetIcon />,
    description: t('table.comingSoon.description'),
  },
  {
    title: t('table.leftColumnItems.cloud'),
    isComingSoon: true,
    icon: <CloudIcon />,
    description: t('table.comingSoon.description'),
  },
];
