import { ReactComponent as AttachStubIcon } from '../../assets/Images/illustrations/Attachment.svg';
import { ReactComponent as LocationStubIcon } from '../../assets/Images/illustrations/Location.svg';
import { ReactComponent as ChecklistsStubIcon } from '../../assets/Images/illustrations/To-do.svg';
import { ReactComponent as NotesStubIcon } from '../../assets/Images/illustrations/Note.svg';
import { ReactComponent as CommentStubIcon } from '../../assets/Images/illustrations/Comment.svg';

import i18next from '../locales/i18n';
import { PlannerItemNavigationEnum } from '../enums/plannerItemNavigation.enum';
export type PlannerItemNavigationStubConfigType = {
  [key: string]: {
    description: string;
    id: PlannerItemNavigationEnum;
    icon: any;
  };
};

export const plannerItemNavigationStubConfig: PlannerItemNavigationStubConfigType = {
  [PlannerItemNavigationEnum.attachments]: {
    id: PlannerItemNavigationEnum.attachments,
    description: i18next.t('stubs.plannerItemNavigationStubs.attachments'),
    icon: AttachStubIcon,
  },
  [PlannerItemNavigationEnum.location]: {
    id: PlannerItemNavigationEnum.location,
    description: i18next.t('stubs.plannerItemNavigationStubs.location'),
    icon: LocationStubIcon,
  },
  [PlannerItemNavigationEnum.checklists]: {
    id: PlannerItemNavigationEnum.checklists,
    description: i18next.t('stubs.plannerItemNavigationStubs.checklists'),
    icon: ChecklistsStubIcon,
  },
  [PlannerItemNavigationEnum.notes]: {
    id: PlannerItemNavigationEnum.notes,
    description: i18next.t('stubs.plannerItemNavigationStubs.notes'),
    icon: NotesStubIcon,
  },
  [PlannerItemNavigationEnum.comments]: {
    id: PlannerItemNavigationEnum.comments,
    description: i18next.t('stubs.plannerItemNavigationStubs.comments'),
    icon: CommentStubIcon,
  },
};
