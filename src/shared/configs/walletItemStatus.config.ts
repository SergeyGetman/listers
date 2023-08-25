import { ReactComponent as UpcomingIcon } from '../../assets/Images/planerItemStatuses/in-progress-status.svg';

import { ReactComponent as PaidIcon } from '../../assets/Images/planerItemStatuses/went-status.svg';

import { ReactComponent as OpenIcon } from '../../assets/Images/planerItemStatuses/late-status.svg';
import theme from '../../theme/theme';
import i18next from '../locales/i18n';

type WalletItemStatusConfigType = {
  [key: string]: { label: string; id: string; icon: any; selectedBgColor: string; hoverBgColor: string };
};

export const walletItemStatusConfig: WalletItemStatusConfigType = {
  paid: {
    id: 'paid',
    label: i18next.t('general.statuses.paid'),
    icon: PaidIcon,
    selectedBgColor: theme.palette.primary.main,
    hoverBgColor: theme.palette.primary.light,
  },
  upcoming: {
    id: 'upcoming',
    label: i18next.t('general.statuses.upcoming'),
    icon: UpcomingIcon,

    selectedBgColor: theme.palette.case.main.yellow.high,
    hoverBgColor: theme.palette.case.main.yellow.light,
  },
  open: {
    id: 'open',
    label: i18next.t('general.statuses.declined'),
    icon: OpenIcon,
    selectedBgColor: theme.palette.case.warning.high,
    hoverBgColor: theme.palette.case.warning.light,
  },
};
