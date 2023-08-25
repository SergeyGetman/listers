import { ReactComponent as AttachmentIcon } from '../../assets/Images/actionsIcons/convert.svg';
import { ReactComponent as LocationIcon } from '../../assets/Images/location-icon.svg';
import { ReactComponent as NoteIcon } from '../../assets/Images/todoIcons/note.svg';
import { ReactComponent as ChecklistIcon } from '../../assets/Images/todoIcons/checklist.svg';
import i18next from '../locales/i18n';
import { PlannerItemNavigationEnum } from '../enums/plannerItemNavigation.enum';
export type PlannerItemNavigationConfigType = {
  [key: string]: {
    label: string;
    id: PlannerItemNavigationEnum;
    icon: any;
  };
};

export const plannerItemNavigationConfig: PlannerItemNavigationConfigType = {
  [PlannerItemNavigationEnum.attachments]: {
    id: PlannerItemNavigationEnum.attachments,
    label: i18next.t('general.plannerItemNavigation.attachments'),
    icon: AttachmentIcon,
  },
  [PlannerItemNavigationEnum.agenda]: {
    id: PlannerItemNavigationEnum.agenda,
    label: i18next.t('general.plannerItemNavigation.agenda'),
    icon: ChecklistIcon,
  },
  [PlannerItemNavigationEnum.location]: {
    id: PlannerItemNavigationEnum.location,
    label: i18next.t('general.plannerItemNavigation.location'),
    icon: LocationIcon,
  },
  [PlannerItemNavigationEnum.checklists]: {
    id: PlannerItemNavigationEnum.checklists,
    label: i18next.t('general.plannerItemNavigation.checklists'),
    icon: ChecklistIcon,
  },
  [PlannerItemNavigationEnum.notes]: {
    id: PlannerItemNavigationEnum.notes,
    label: i18next.t('general.plannerItemNavigation.notes'),
    icon: NoteIcon,
  },
  [PlannerItemNavigationEnum.comments]: {
    id: PlannerItemNavigationEnum.comments,
    label: i18next.t('general.plannerItemNavigation.comments'),
    icon: AttachmentIcon,
  },
};
