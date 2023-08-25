import { ReactComponent as ProfileIcon } from '../../assets/Images/tags/profile-icon.svg';
import { ReactComponent as GarageIcon } from '../../assets/Images/tags/car-icon.svg';
import { ReactComponent as EducationIcon } from '../../assets/Images/tags/education-icon.svg';
import { ReactComponent as WorkIcon } from '../../assets/Images/tags/work-icon.svg';
import { ReactComponent as PetsIcon } from '../../assets/Images/tags/pat-icon.svg';
import { ReactComponent as PropertyIcon } from '../../assets/Images/tags/property-icon.svg';
import { ReactComponent as TagIcon } from '../../assets/Images/tags/tag-icon.svg';

import theme from '../../theme/theme';
import i18next from '../locales/i18n';
import { TagsEnum } from '../enums/tags.enum';
export type TagsConfigType = {
  [key: string]: {
    label: TagsEnum;
    id: TagsEnum;
    value: TagsEnum;
    icon: any;
    tagId: number | null;
    iconColor: string;
    borderColor: string;
    backgroundColor: string;
  };
};

export const tagsConfig: TagsConfigType = {
  [TagsEnum.profile]: {
    id: TagsEnum.profile,
    value: TagsEnum.profile,
    tagId: 2,
    label: i18next.t('general.tags.profile'),
    icon: ProfileIcon,
    iconColor: theme.palette.case.cyan.c600,
    borderColor: theme.palette.case.cyan.c100,
    backgroundColor: theme.palette.case.cyan.c50,
  },
  [TagsEnum.garage]: {
    id: TagsEnum.garage,
    value: TagsEnum.garage,
    label: i18next.t('general.tags.garage'),
    icon: GarageIcon,
    tagId: 1,
    iconColor: theme.palette.case.aquamarine.a600,
    borderColor: theme.palette.case.aquamarine.a100,
    backgroundColor: theme.palette.case.aquamarine.a50,
  },
  [TagsEnum.education]: {
    id: TagsEnum.education,
    value: TagsEnum.education,
    label: i18next.t('general.tags.education'),
    icon: EducationIcon,
    tagId: 5,
    iconColor: theme.palette.case.purple.p600,
    borderColor: theme.palette.case.purple.p100,
    backgroundColor: theme.palette.case.purple.p50,
  },
  [TagsEnum.work]: {
    id: TagsEnum.work,
    value: TagsEnum.work,
    label: i18next.t('general.tags.work'),
    icon: WorkIcon,
    tagId: 4,
    iconColor: theme.palette.case.blue.b600,
    borderColor: theme.palette.case.blue.b100,
    backgroundColor: theme.palette.case.blue.b50,
  },
  [TagsEnum.pets]: {
    id: TagsEnum.pets,
    value: TagsEnum.pets,
    label: i18next.t('general.tags.pets'),
    icon: PetsIcon,
    tagId: 3,
    iconColor: theme.palette.case.orange.o600,
    borderColor: theme.palette.case.orange.o100,
    backgroundColor: theme.palette.case.orange.o50,
  },
  [TagsEnum.property]: {
    id: TagsEnum.property,
    value: TagsEnum.property,
    label: i18next.t('general.tags.property'),
    icon: PropertyIcon,
    tagId: 7,
    iconColor: theme.palette.case.red.r600,
    borderColor: theme.palette.case.red.r100,
    backgroundColor: theme.palette.case.red.r50,
  },
  [TagsEnum.none]: {
    id: TagsEnum.none,
    value: TagsEnum.none,
    label: i18next.t('general.tags.none'),
    icon: TagIcon,
    tagId: null,
    iconColor: theme.palette.case.neutral.n600,
    borderColor: theme.palette.case.neutral.n500,
    backgroundColor: theme.palette.case.neutral.n0,
  },
};
