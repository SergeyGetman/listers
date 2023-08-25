import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { ReactComponent as PlansIcon } from '../../../../assets/Images/plans.svg';
import { ReactComponent as HubsIcon } from '../../../../assets/Images/hubs.svg';
import { ReactComponent as StorageIcon } from '../../../../assets/Images/storage.svg';
import { ReactComponent as ArchiveIcon } from '../../../../assets/Images/archive.svg';
import { ReactComponent as LogOutIcon } from '../../../../assets/Images/logOut.svg';

import i18next from '../../../../shared/locales/i18n';
import { HubsEnum } from '../../../../shared/enums/hubs.enum';

export const settingsHeaderConfig = [
  {
    id: 'GeneralSettings',
    label: i18next.t('settings.header.generalSettings'),
    icon: SettingsIcon,
    to: '',
  },
  {
    id: 'PlansPricing',
    label: i18next.t('settings.header.plans'),
    icon: PlansIcon,
    to: 'plans',
  },
  {
    id: 'Hubs',
    label: i18next.t('settings.header.hubs'),
    icon: HubsIcon,
    to: 'hubs',
  },
  {
    id: 'Wallet',
    label: i18next.t('settings.header.wallet'),
    icon: AccountBalanceWalletIcon,
    to: 'wallet',
  },
  {
    id: 'Storage',
    label: i18next.t('settings.header.storage'),
    icon: StorageIcon,
    isComing: true,
    to: 'storage',
  },
  {
    id: 'Archive',
    label: i18next.t('settings.header.archive'),
    icon: ArchiveIcon,
    to: 'archive',
    isHub: true,
    hubId: HubsEnum.archive,
  },
  {
    id: 'LogOut',
    label: i18next.t('settings.header.logOut'),
    icon: LogOutIcon,
    isLogout: true,
    to: 'logout',
  },
];
