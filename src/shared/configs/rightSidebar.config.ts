import React from 'react';
import { ReactComponent as ChecklistIcon } from '../../assets/Images/rightSidebar/checklist-tab.svg';
import { ReactComponent as NotesChecklist } from '../../assets/Images/rightSidebar/note-tab.svg';
import { ReactComponent as Notifications } from '../../assets/Images/rightSidebar/notifications-tab.svg';
import RightSidebarNotifications from '../../components/layout/navigation/RightSidebar/components/RightSidebarNotifications';

import { RightSidebarTabsEnum } from '../enums/rightSidebarEnum';
import RightSidebarChecklists from '../../components/layout/navigation/RightSidebar/components/RightSidebarChecklists';
import RightSidebarNotes from '../../components/layout/navigation/RightSidebar/components/RightSidebarNotes';

type RightSidebarConfigType = {
  name: RightSidebarTabsEnum;
  icon: any;
  Component: React.FC;
}[];

export const rightSidebarConfig: RightSidebarConfigType = [
  {
    name: RightSidebarTabsEnum.notifications,
    icon: Notifications,
    Component: RightSidebarNotifications,
  },
  {
    name: RightSidebarTabsEnum.checklist,
    icon: ChecklistIcon,
    Component: RightSidebarChecklists,
  },
  {
    name: RightSidebarTabsEnum.notes,
    icon: NotesChecklist,
    Component: RightSidebarNotes,
  },
];
