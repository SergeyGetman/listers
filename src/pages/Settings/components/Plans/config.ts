import { ReactComponent as CrownSilverIcon } from '../../../../assets/Images/сrown-silver-package.svg';
import { ReactComponent as CrownPlatinumIcon } from '../../../../assets/Images/crown-platinum-package.svg';
import { ReactComponent as CrownGoldIcon } from '../../../../assets/Images/сrown-gold-package.svg';

export const planDescriptionConfig: { [key: string]: { description: string; icon: any } } = {
  starter: {
    description: 'Just for now',
    icon: CrownSilverIcon,
  },
  basic: {
    description: 'Let’s do it',
    icon: CrownGoldIcon,
  },
  premium: {
    description: 'Need a pro',
    icon: CrownPlatinumIcon,
  },
};

export const planListConfig: { [key: string]: string[] } = {
  starter: ['Checklist', 'Notes'],
  basic: ['Task', 'Events', 'Deadlines'],
  premium: ['Payments', 'Meetings', 'Reminders', 'Appointment'],
};

export const planTableColumnConfig = [
  {
    name: 'Garage Hub',
    key: 'garage',
    infoModal: true,
  },
  {
    name: 'To-Do',
    key: 'todo',
    infoModal: true,
  },
  {
    name: 'Network',
    key: 'network',
    infoModal: false,
  },
  {
    name: 'Chat',
    key: 'chat',
    infoModal: false,
  },
  {
    name: 'Profile',
    key: 'profile',
    infoModal: false,
  },
  {
    name: 'Archive',
    key: 'archive',
    infoModal: true,
  },
  {
    name: 'Journal',
    key: 'journal',
    infoModal: true,
  },
  {
    name: 'Calendar',
    key: 'calendar',
    infoModal: true,
  },
  {
    name: 'Roadmap',
    key: 'roadmap',
    infoModal: true,
  },
  {
    name: 'Events',
    key: 'events',
    infoModal: true,
  },
  {
    name: 'Backlog',
    key: 'backlog',
    infoModal: true,
  },
];

export const planTableConfig = {
  starter: {
    garage: true,
    todo: true,
    notes: true,
    network: true,
    chat: true,
    profile: true,
    archive: false,
    journal: false,
    calendar: false,
    roadmap: false,
    events: false,
    backlog: false,
    feeds: false,
    files: false,
    spaceCase: false,
  },
  basic: {
    garage: true,
    todo: true,
    notes: true,
    network: true,
    chat: true,
    profile: true,
    archive: true,
    journal: true,
    calendar: true,
    roadmap: false,
    events: false,
    backlog: false,
    feeds: false,
    files: false,
    spaceCase: false,
  },
  premium: {
    garage: true,
    todo: true,
    notes: true,
    network: true,
    chat: true,
    profile: true,
    archive: true,
    journal: true,
    calendar: true,
    roadmap: true,
    events: true,
    backlog: true,
    feeds: true,
    files: true,
    spaceCase: true,
  },
};

export const planComingSoonTableColumnConfig = [
  'Education Hub',
  'Pets Hub',
  'Health Hub',
  'Work Hub',
  'Budget Hub',
  'Property Hub',
  'Cloud',
];
