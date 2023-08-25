import DoneIcon from '@mui/icons-material/Done';
import theme from '../../theme/theme';
import i18next from '../locales/i18n';
import { AssignPeoplePermissionsEnum } from '../enums/assignPeoplePermissions.enum';
type AssignPeoplePermissionsConfigType = {
  [key: string]: {
    label: string;
    id: AssignPeoplePermissionsEnum;
    isHideIcon?: boolean;
    icon: any;
    iconColor: string;
  };
};

export const assignPeoplePermissionsConfig: AssignPeoplePermissionsConfigType = {
  viewer: {
    id: AssignPeoplePermissionsEnum.viewer,
    label: i18next.t('general.permission.viewer'),
    icon: DoneIcon,
    isHideIcon: true,
    iconColor: theme.palette.primary.main,
  },
  editor: {
    id: AssignPeoplePermissionsEnum.editor,
    label: i18next.t('general.permission.editor'),
    icon: DoneIcon,
    isHideIcon: true,
    iconColor: theme.palette.primary.main,
  },
  creator: {
    id: AssignPeoplePermissionsEnum.editor,
    label: i18next.t('general.permission.editor'),
    icon: DoneIcon,
    isHideIcon: true,
    iconColor: theme.palette.primary.main,
  },
};
