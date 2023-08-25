import { TFunction } from 'i18next';

import backlogImgFirst from '../../assets/Images/organizer/backlog/backlog-img-first.png';
import backlogImgSecond from '../../assets/Images/organizer/backlog/backlog-img-second.png';
import backlogImgThird from '../../assets/Images/organizer/backlog/backlog-img-third.png';
import backlogImgFourth from '../../assets/Images/organizer/backlog/backlog-img-fourth.png';
import backlogImgFirstMobile from '../../assets/Images/organizer/backlog/backlog-img-first-mobile.png';
import backlogImgSecondMobile from '../../assets/Images/organizer/backlog/backlog-img-second-mobile.png';
import backlogImgThirdMobile from '../../assets/Images/organizer/backlog/backlog-img-third-mobile.png';
import backlogImgFourthMobile from '../../assets/Images/organizer/backlog/backlog-img-fourth-mobile.png';

import calendarImgFirst from '../../assets/Images/organizer/calendar/calendar-img-first.png';
import calendarImgSecond from '../../assets/Images/organizer/calendar/calendar-img-second.png';
import calendarImgThird from '../../assets/Images/organizer/calendar/calendar-img-third.png';
import calendarImgFourth from '../../assets/Images/organizer/calendar/calendar-img-fourth.png';
import calendarImgFirstMobile from '../../assets/Images/organizer/calendar/calendar-img-first-mobile.png';
import calendarImgSecondMobile from '../../assets/Images/organizer/calendar/calendar-img-second-mobile.png';
import calendarImgThirdMobile from '../../assets/Images/organizer/calendar/calendar-img-third-mobile.png';
import calendarImgFourthMobile from '../../assets/Images/organizer/calendar/calendar-img-fourth-mobile.png';

import journalImgFirst from '../../assets/Images/organizer/journal/journal-img-first.png';
import journalImgSecond from '../../assets/Images/organizer/journal/journal-img-second.png';
import journalImgThird from '../../assets/Images/organizer/journal/journal-img-third.png';
import journalImgFourth from '../../assets/Images/organizer/journal/journal-img-fourth.png';
import journalImgFirstMobile from '../../assets/Images/organizer/journal/journal-img-first-mobile.png';
import journalImgSecondMobile from '../../assets/Images/organizer/journal/journal-img-second-mobile.png';
import journalImgThirdMobile from '../../assets/Images/organizer/journal/journal-img-third-mobile.png';
import journalImgFourthMobile from '../../assets/Images/organizer/journal/journal-img-fourth-mobile.png';

import taskImgFirst from '../../assets/Images/organizer/roadmap/task-img-first.png';
import taskImgSecond from '../../assets/Images/organizer/roadmap/task-img-second.png';
import taskImgThird from '../../assets/Images/organizer/roadmap/task-img-third.png';
import taskImgFourth from '../../assets/Images/organizer/roadmap/task-img-fourth.png';
import taskImgFirstMobile from '../../assets/Images/organizer/roadmap/task-img-first-mobile.png';
import taskImgSecondMobile from '../../assets/Images/organizer/roadmap/task-img-second-mobile.png';
import taskImgThirdMobile from '../../assets/Images/organizer/roadmap/task-img-third-mobile.png';
import taskImgFourthMobile from '../../assets/Images/organizer/roadmap/task-img-fourth-mobile.png';

import todoImgFirst from '../../assets/Images/organizer/todo/todo-img-first.png';
import todoImgSecond from '../../assets/Images/organizer/todo/todo-img-second.png';
import todoImgThird from '../../assets/Images/organizer/todo/todo-img-third.png';
import todoImgFourth from '../../assets/Images/organizer/todo/todo-img-fourth.png';
import todoImgFirstMobile from '../../assets/Images/organizer/todo/todo-img-first-mobile.png';
import todoImgSecondMobile from '../../assets/Images/organizer/todo/todo-img-second-mobile.png';
import todoImgThirdMobile from '../../assets/Images/organizer/todo/todo-img-third-mobile.png';
import todoImgFourthMobile from '../../assets/Images/organizer/todo/todo-img-fourth-mobile.png';

import garageImgFirst from '../../assets/Images/hubs/garage/garage-img-first.png';
import garageImgSecond from '../../assets/Images/hubs/garage/garage-img-second.png';
import garageImgThird from '../../assets/Images/hubs/garage/garage-img-third.png';
import garageImgFifth from '../../assets/Images/hubs/garage/garage-img-fifth.png';

import profileImgFirst from '../../assets/Images/hubs/profile/profile-img-first.png';
import profileImgSecond from '../../assets/Images/hubs/profile/profile-img-second.png';
import profileImgThird from '../../assets/Images/hubs/profile/profile-img-third.png';
import profileImgFourth from '../../assets/Images/hubs/profile/profile-img-fourth.png';

import { OrganizersEnum } from '../enums/organizers.enum';
import { HubsEnum } from '../enums/hubs.enum';

type getFeaturesModalConfigProps = {
  type: OrganizersEnum | HubsEnum;
  label: string;
  items: {
    description: string;
    img?: any;
    title?: string;
  }[];
};

export const getFeaturesModalConfig = (t: TFunction, isMobile?: boolean): getFeaturesModalConfigProps[] => [
  {
    type: OrganizersEnum.backlog,
    label: t('organizers.type.backlog.label'),
    items: [
      {
        title: t('organizers.organizerInfoModalContainers.backlog.title1'),
        description: t('organizers.organizerInfoModalContainers.backlog.description1'),
        img: isMobile ? backlogImgFirstMobile : backlogImgFirst,
      },
      {
        title: t('organizers.organizerInfoModalContainers.backlog.title2'),
        description: t('organizers.organizerInfoModalContainers.backlog.description2'),
        img: isMobile ? backlogImgSecondMobile : backlogImgSecond,
      },
      {
        title: t('organizers.organizerInfoModalContainers.backlog.title3'),
        description: t('organizers.organizerInfoModalContainers.backlog.description3'),
        img: isMobile ? backlogImgThirdMobile : backlogImgThird,
      },
      {
        title: t('organizers.organizerInfoModalContainers.backlog.title4'),
        description: t('organizers.organizerInfoModalContainers.backlog.description4'),
        img: isMobile ? backlogImgFourthMobile : backlogImgFourth,
      },
    ],
  },
  {
    type: OrganizersEnum.todo,
    label: t('organizers.type.todo.label'),
    items: [
      {
        title: t('organizers.organizerInfoModalContainers.todo.title1'),
        description: t('organizers.organizerInfoModalContainers.todo.description1'),
        img: isMobile ? todoImgFirstMobile : todoImgFirst,
      },
      {
        title: t('organizers.organizerInfoModalContainers.todo.title2'),
        description: t('organizers.organizerInfoModalContainers.todo.description2'),
        img: isMobile ? todoImgSecondMobile : todoImgSecond,
      },
      {
        title: t('organizers.organizerInfoModalContainers.todo.title3'),
        description: t('organizers.organizerInfoModalContainers.todo.description3'),
        img: isMobile ? todoImgThirdMobile : todoImgThird,
      },
      {
        title: t('organizers.organizerInfoModalContainers.todo.title4'),
        description: t('organizers.organizerInfoModalContainers.todo.description4'),
        img: isMobile ? todoImgFourthMobile : todoImgFourth,
      },
    ],
  },
  {
    type: OrganizersEnum.calendar,
    label: t('organizers.type.calendar.label'),
    items: [
      {
        title: t('organizers.organizerInfoModalContainers.calendar.title1'),
        description: t('organizers.organizerInfoModalContainers.calendar.description1'),
        img: isMobile ? calendarImgFirstMobile : calendarImgFirst,
      },
      {
        title: t('organizers.organizerInfoModalContainers.calendar.title2'),
        description: t('organizers.organizerInfoModalContainers.calendar.description2'),
        img: isMobile ? calendarImgSecondMobile : calendarImgSecond,
      },
      {
        title: t('organizers.organizerInfoModalContainers.calendar.title3'),
        description: t('organizers.organizerInfoModalContainers.calendar.description3'),
        img: isMobile ? calendarImgThirdMobile : calendarImgThird,
      },
      {
        title: t('organizers.organizerInfoModalContainers.calendar.title4'),
        description: t('organizers.organizerInfoModalContainers.calendar.description4'),
        img: isMobile ? calendarImgFourthMobile : calendarImgFourth,
      },
    ],
  },
  {
    type: OrganizersEnum.journal,
    label: t('organizers.type.journal.label'),
    items: [
      {
        title: t('organizers.organizerInfoModalContainers.journal.title1'),
        description: t('organizers.organizerInfoModalContainers.journal.description1'),
        img: isMobile ? journalImgFirstMobile : journalImgFirst,
      },
      {
        title: t('organizers.organizerInfoModalContainers.journal.title2'),
        description: t('organizers.organizerInfoModalContainers.journal.description2'),
        img: isMobile ? journalImgSecondMobile : journalImgSecond,
      },
      {
        title: t('organizers.organizerInfoModalContainers.journal.title3'),
        description: t('organizers.organizerInfoModalContainers.todo.description3'),
        img: isMobile ? journalImgThirdMobile : journalImgThird,
      },
      {
        title: t('organizers.organizerInfoModalContainers.journal.title4'),
        description: t('organizers.organizerInfoModalContainers.todo.description4'),
        img: isMobile ? journalImgFourthMobile : journalImgFourth,
      },
    ],
  },
  {
    type: OrganizersEnum.tasks,
    label: t('organizers.type.tasks.label'),
    items: [
      {
        title: t('organizers.organizerInfoModalContainers.tasks.title1'),
        description: t('organizers.organizerInfoModalContainers.tasks.description1'),
        img: isMobile ? taskImgFirstMobile : taskImgFirst,
      },
      {
        title: t('organizers.organizerInfoModalContainers.tasks.title2'),
        description: t('organizers.organizerInfoModalContainers.tasks.description2'),
        img: isMobile ? taskImgSecondMobile : taskImgSecond,
      },
      {
        title: t('organizers.organizerInfoModalContainers.tasks.title3'),
        description: t('organizers.organizerInfoModalContainers.tasks.description3'),
        img: isMobile ? taskImgThirdMobile : taskImgThird,
      },
      {
        title: t('organizers.organizerInfoModalContainers.tasks.title4'),
        description: t('organizers.organizerInfoModalContainers.tasks.description4'),
        img: isMobile ? taskImgFourthMobile : taskImgFourth,
      },
    ],
  },
  {
    type: HubsEnum.garage,
    label: t('hubs.hubsInfo.garage.label'),
    items: [
      {
        title: t('hubs.hubsInfoModalContainers.garage.title1'),
        description: t('hubs.hubsInfoModalContainers.garage.description1'),
        img: garageImgFirst,
      },
      {
        title: t('hubs.hubsInfoModalContainers.garage.title2'),
        description: t('hubs.hubsInfoModalContainers.garage.description2'),
        img: garageImgSecond,
      },
      {
        title: t('hubs.hubsInfoModalContainers.garage.title3'),
        description: t('hubs.hubsInfoModalContainers.garage.description3'),
        img: garageImgThird,
      },
      {
        title: t('hubs.hubsInfoModalContainers.garage.title4'),
        description: t('hubs.hubsInfoModalContainers.garage.description4'),
        img: garageImgFifth,
      },
    ],
  },
  {
    type: HubsEnum.profile,
    label: t('hubs.hubsInfo.profile.label'),
    items: [
      {
        title: t('hubs.hubsInfoModalContainers.profile.title1'),
        description: t('hubs.hubsInfoModalContainers.profile.description1'),
        img: profileImgFirst,
      },
      {
        title: t('hubs.hubsInfoModalContainers.profile.title2'),
        description: t('hubs.hubsInfoModalContainers.profile.description2'),
        img: profileImgSecond,
      },
      {
        title: t('hubs.hubsInfoModalContainers.profile.title3'),
        description: t('hubs.hubsInfoModalContainers.profile.description3'),
        img: profileImgThird,
      },
      {
        title: t('hubs.hubsInfoModalContainers.profile.title4'),
        description: t('hubs.hubsInfoModalContainers.profile.description4'),
        img: profileImgFourth,
      },
    ],
  },
];
