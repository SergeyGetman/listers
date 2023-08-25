import { TFunction } from 'i18next';
import { ReactComponent as ConnectionsIcon } from '../../../assets/Images/network/network-icon.svg';
import { ReactComponent as ContactsIcon } from '../../../assets/Images/network/contacts-icon.svg';
import { ReactComponent as InviteIcon } from '../../../assets/Images/network/invite-icon.svg';

import { NetworkItemTypeEnum } from '../../enums/network/networkItemType.enum';

type getNetworkAddItemsStubConfigType = {
  [key: string]: {
    label: string;
    id: NetworkItemTypeEnum;
    icon?: any;
    backgroundCardColor?: string;
    hoverBackgroundCardColor?: string;
  };
};
export const getNetworkAddItemsStubConfig = (t: TFunction, theme: any): getNetworkAddItemsStubConfigType => ({
  [NetworkItemTypeEnum.connections]: {
    id: NetworkItemTypeEnum.connections,
    label: t('general.add', { item: t('network.connection') }),
    icon: ConnectionsIcon,
  },
  [NetworkItemTypeEnum.contacts]: {
    id: NetworkItemTypeEnum.contacts,
    label: t('general.add', { item: t('network.contact') }),
    icon: ContactsIcon,
  },
  [NetworkItemTypeEnum.invite]: {
    id: NetworkItemTypeEnum.invite,
    backgroundCardColor: theme.palette.case.primary.p50,
    hoverBackgroundCardColor: theme.palette.case.primary.p100,
    label: `${t('network.inviteTo')} <span style="color:${theme.palette.case.primary.p600}">${t(
      'general.hubmee',
    )}</span>`,
    icon: InviteIcon,
  },
});
