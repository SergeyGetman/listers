import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import PaletteIcon from '@mui/icons-material/Palette';
import theme from '../../theme/theme';
import i18next from '../locales/i18n';
import { PlannerItemColorEnum } from '../enums/plannerItemColor.enum';
type PlannerItemColorConfigType = {
  [key: string]: {
    label: PlannerItemColorEnum;
    id: PlannerItemColorEnum;
    icon: any;
    iconColor: string;
  };
};

export const plannerItemColorConfig: PlannerItemColorConfigType = {
  [PlannerItemColorEnum.red]: {
    id: PlannerItemColorEnum.red,
    label: i18next.t('general.colors.red'),
    icon: PaletteIcon,
    iconColor: theme.palette.case.warning.high,
  },
  [PlannerItemColorEnum.yellow]: {
    id: PlannerItemColorEnum.yellow,
    label: i18next.t('general.colors.yellow'),
    icon: PaletteIcon,
    iconColor: theme.palette.case.main.yellow.high,
  },
  [PlannerItemColorEnum.green]: {
    id: PlannerItemColorEnum.green,
    label: i18next.t('general.colors.green'),
    icon: PaletteIcon,
    iconColor: theme.palette.primary.main,
  },
  [PlannerItemColorEnum.purple]: {
    id: PlannerItemColorEnum.purple,
    label: i18next.t('general.colors.purple'),
    icon: PaletteIcon,
    iconColor: theme.palette.case.main.purple.high,
  },
  [PlannerItemColorEnum.none]: {
    id: PlannerItemColorEnum.none,
    label: i18next.t('general.colors.none'),
    icon: PaletteOutlinedIcon,
    iconColor: theme.palette.case.neutral.n400,
  },
};
