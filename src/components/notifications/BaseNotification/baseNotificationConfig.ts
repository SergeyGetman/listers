import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import EngineeringIcon from '@mui/icons-material/Engineering';
import theme from '../../../theme/theme';

type BaseNotificationConfigType = {
  [key: string]: { icon: any; iconColor: string; bgColor: string };
};

export const baseNotificationConfig: BaseNotificationConfigType = {
  success: {
    icon: CheckCircleOutlinedIcon,
    iconColor: theme.palette.primary.main,
    bgColor: theme.palette.primary.light,
  },
  error: {
    icon: ErrorOutlineIcon,
    iconColor: theme.palette.case.warning.high,
    bgColor: theme.palette.case.warning.light,
  },
  update: {
    icon: UpdateOutlinedIcon,
    iconColor: theme.palette.case.main.gey.high,
    bgColor: theme.palette.case.main.gey.light,
  },
  info: {
    icon: InfoOutlinedIcon,
    iconColor: theme.palette.case.main.blue.middle,
    bgColor: theme.palette.case.main.blue.light,
  },
  maintenance: {
    icon: EngineeringIcon,
    iconColor: theme.palette.case.main.yellow.high,
    bgColor: theme.palette.case.main.yellow.light,
  },
};
