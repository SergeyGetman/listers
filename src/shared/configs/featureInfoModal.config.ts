import roadmapImgFirst from '../../assets/Images/features/roadmap/roadmap-img-first.png';
import roadmapImgSecond from '../../assets/Images/features/roadmap/roadmap-img-second.png';
import roadmapImgThird from '../../assets/Images/features/roadmap/roadmap-img-third.png';
import roadmapImgFourth from '../../assets/Images/features/roadmap/roadmap-img-fourth.png';

import eventsImgFirst from '../../assets/Images/features/events/events-img-first.png';
import eventsImgSecond from '../../assets/Images/features/events/events-img-second.png';
import eventsImgThird from '../../assets/Images/features/events/events-img-third.png';
import eventsImgFourth from '../../assets/Images/features/events/events-img-fourth.png';

import garageImgFirst from '../../assets/Images/hubs/garage/garage-img-first.png';
import garageImgSecond from '../../assets/Images/hubs/garage/garage-img-second.png';
import garageImgThird from '../../assets/Images/hubs/garage/garage-img-third.png';
import garageImgFifth from '../../assets/Images/hubs/garage/garage-img-fifth.png';

import calendarImgFirst from '../../assets/Images/features/calendar/calendar-img-first.png';
import calendarImgSecond from '../../assets/Images/features/calendar/calendar-img-second.png';
import calendarImgThird from '../../assets/Images/features/calendar/calendar-img-third.png';
import calendarImgFourth from '../../assets/Images/features/calendar/calendar-img-fourth.png';

import journalImgFirst from '../../assets/Images/features/journal/journal-img-first.png';
import journalImgSecond from '../../assets/Images/features/journal/journal-img-second.png';
import journalImgThird from '../../assets/Images/features/journal/journal-img-third.png';
import journalImgFourth from '../../assets/Images/features/journal/journal-img-fourth.png';

import backlogImgFirst from '../../assets/Images/features/backlog/backlog-img-first.png';
import backlogImgSecond from '../../assets/Images/features/backlog/backlog-img-second.png';
import backlogImgThird from '../../assets/Images/features/backlog/backlog-img-third.png';
import backlogImgFourth from '../../assets/Images/features/backlog/backlog-img-fourth.png';

import archiveImgFirst from '../../assets/Images/features/archive/archive-img-first.png';
import archiveImgSecond from '../../assets/Images/features/archive/archive-img-second.png';
import archiveImgThird from '../../assets/Images/features/archive/archive-img-third.png';
import archiveImgFourth from '../../assets/Images/features/archive/archive-img-fourth.png';

import todoImgFirst from '../../assets/Images/features/todo/todo-img-first.png';
import todoImgSecond from '../../assets/Images/features/todo/todo-img-second.png';
import todoImgThird from '../../assets/Images/features/todo/todo-img-third.png';
import todoImgFourth from '../../assets/Images/features/todo/todo-img-fourth.png';

import i18next from '../locales/i18n';
import { FeaturesEnum } from '../enums/features.enum';
import { HubsEnum } from '../enums/hubs.enum';

type featureModalInfoConfigType = {
  [key: string]: {
    description: string;
    img?: any;
    title?: string;
  }[];
};

export const featureModalInfoConfig: featureModalInfoConfigType = {
  [FeaturesEnum.journal]: [
    {
      title: i18next.t('featuresInfo.journal.title1'),
      description: i18next.t('featuresInfo.journal.description1'),
      img: journalImgFirst,
    },
    {
      title: i18next.t('featuresInfo.journal.title2'),
      description: i18next.t('featuresInfo.journal.description2'),
      img: journalImgSecond,
    },
    {
      title: i18next.t('featuresInfo.journal.title3'),
      description: i18next.t('featuresInfo.journal.description3'),
      img: journalImgThird,
    },
    {
      title: i18next.t('featuresInfo.journal.title4'),
      description: i18next.t('featuresInfo.journal.description4'),
      img: journalImgFourth,
    },
  ],
  [FeaturesEnum.backlog]: [
    {
      title: i18next.t('featuresInfo.backlog.title1'),
      description: i18next.t('featuresInfo.backlog.description1'),
      img: backlogImgFirst,
    },
    {
      title: i18next.t('featuresInfo.backlog.title2'),
      description: i18next.t('featuresInfo.backlog.description2'),
      img: backlogImgSecond,
    },
    {
      title: i18next.t('featuresInfo.backlog.title3'),
      description: i18next.t('featuresInfo.backlog.description3'),
      img: backlogImgThird,
    },
    {
      title: i18next.t('featuresInfo.backlog.title4'),
      description: i18next.t('featuresInfo.backlog.description4'),
      img: backlogImgFourth,
    },
  ],
  [FeaturesEnum.roadmap]: [
    {
      title: i18next.t('featuresInfo.roadmap.title1'),
      description: i18next.t('featuresInfo.roadmap.description1'),
      img: roadmapImgFirst,
    },
    {
      title: i18next.t('featuresInfo.roadmap.title2'),
      description: i18next.t('featuresInfo.roadmap.description2'),
      img: roadmapImgSecond,
    },
    {
      title: i18next.t('featuresInfo.roadmap.title3'),
      description: i18next.t('featuresInfo.roadmap.description3'),
      img: roadmapImgThird,
    },
    {
      title: i18next.t('featuresInfo.roadmap.title4'),
      description: i18next.t('featuresInfo.roadmap.description4'),
      img: roadmapImgFourth,
    },
  ],
  [FeaturesEnum.events]: [
    {
      title: i18next.t('featuresInfo.events.title1'),
      description: i18next.t('featuresInfo.events.description1'),
      img: eventsImgFirst,
    },
    {
      title: i18next.t('featuresInfo.events.title2'),
      description: i18next.t('featuresInfo.events.description2'),
      img: eventsImgSecond,
    },
    {
      title: i18next.t('featuresInfo.events.title3'),
      description: i18next.t('featuresInfo.events.description3'),
      img: eventsImgThird,
    },
    {
      title: i18next.t('featuresInfo.events.title4'),
      description: i18next.t('featuresInfo.events.description4'),
      img: eventsImgFourth,
    },
  ],
  [FeaturesEnum.calendar]: [
    {
      title: i18next.t('featuresInfo.calendar.title1'),
      description: i18next.t('featuresInfo.calendar.description1'),
      img: calendarImgFirst,
    },
    {
      title: i18next.t('featuresInfo.calendar.title2'),
      description: i18next.t('featuresInfo.calendar.description2'),
      img: calendarImgSecond,
    },
    {
      title: i18next.t('featuresInfo.calendar.title3'),
      description: i18next.t('featuresInfo.calendar.description3'),
      img: calendarImgThird,
    },
    {
      title: i18next.t('featuresInfo.calendar.title4'),
      description: i18next.t('featuresInfo.calendar.description4'),
      img: calendarImgFourth,
    },
  ],
  [FeaturesEnum.todo]: [
    {
      title: i18next.t('featuresInfo.todo.title1'),
      description: i18next.t('featuresInfo.todo.description1'),
      img: todoImgFirst,
    },
    {
      title: i18next.t('featuresInfo.todo.title2'),
      description: i18next.t('featuresInfo.todo.description2'),
      img: todoImgSecond,
    },
    {
      title: i18next.t('featuresInfo.todo.title3'),
      description: i18next.t('featuresInfo.todo.description3'),
      img: todoImgThird,
    },
    {
      title: i18next.t('featuresInfo.todo.title4'),
      description: i18next.t('featuresInfo.todo.description4'),
      img: todoImgFourth,
    },
  ],
  [FeaturesEnum.archive]: [
    {
      title: i18next.t('featuresInfo.archive.title1'),
      description: i18next.t('featuresInfo.archive.description1'),
      img: archiveImgFirst,
    },
    {
      title: i18next.t('featuresInfo.archive.title2'),
      description: i18next.t('featuresInfo.archive.description2'),
      img: archiveImgSecond,
    },
    {
      title: i18next.t('featuresInfo.archive.title3'),
      description: i18next.t('featuresInfo.archive.description3'),
      img: archiveImgThird,
    },
    {
      title: i18next.t('featuresInfo.archive.title4'),
      description: i18next.t('featuresInfo.archive.description4'),
      img: archiveImgFourth,
    },
  ],
  [HubsEnum.garage]: [
    {
      title: i18next.t('hubs.hubsInfoModalContainers.garage.title1'),
      description: i18next.t('hubs.hubsInfoModalContainers.garage.description1'),
      img: garageImgFirst,
    },
    {
      title: i18next.t('hubs.hubsInfoModalContainers.garage.title2'),
      description: i18next.t('hubs.hubsInfoModalContainers.garage.description2'),
      img: garageImgSecond,
    },
    {
      title: i18next.t('hubs.hubsInfoModalContainers.garage.title3'),
      description: i18next.t('hubs.hubsInfoModalContainers.garage.description3'),
      img: garageImgThird,
    },
    {
      title: i18next.t('hubs.hubsInfoModalContainers.garage.title4'),
      description: i18next.t('hubs.hubsInfoModalContainers.garage.description4'),
      img: garageImgFifth,
    },
  ],
};
