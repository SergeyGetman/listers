import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { ReactComponent as ConnectedIcon } from '../../assets/Images/network/connected.svg';
import { ReactComponent as ChatIcon } from '../../assets/Images/chat-icon.svg';
import { ReactComponent as PendingIcon } from '../../assets/Images/network/pending.svg';
import { ReactComponent as FutureSendRequestIcon } from '../../assets/Images/network/future-send-request.svg';
import { ReactComponent as SentRequestIcon } from '../../assets/Images/network/sent-request.svg';
import { ReactComponent as MyNetworkIcon } from '../../assets/Images/network/my-network.svg';
import { ReactComponent as ResendBtnIcon } from '../../assets/Images/network/resend-btn.svg';
import { ReactComponent as AcceptIcon } from '../../assets/Images/accept-icon.svg';
import { ReactComponent as CancelIcon } from '../../assets/Images/cancel-icon.svg';

import i18next from '../locales/i18n';
import theme from '../../theme/theme';
import { NetworkUserStatus } from '../enums/networkUserStatus.enum';
import { NetworkTypeEnum } from '../enums/networkType.enum';
import { networkActionsType } from '../enums/network/networkActionsType.enum';

export type NetworkUserStatusesItemConfigType = {
  label: string;
  title: string;
  buttonText: string;
  buttonActionType: networkActionsType;
  icon?: any;
  buttonIcon: any;
  buttonColor: string;
  secondButtonIcon?: any;
  secondButtonColor: string;
  secondButtonText: string;
  secondButtonActionType: networkActionsType;
};

type NetworkUserStatusesConfigType = {
  [key: string]: NetworkUserStatusesItemConfigType;
};

export const networkUserStatusesConfig: NetworkUserStatusesConfigType = {
  [NetworkUserStatus.friend]: {
    label: i18next.t('network.status.connected'),
    title: i18next.t('network.title.connected'),
    icon: ConnectedIcon,
    buttonText: i18next.t('general.buttons.chat'),
    buttonColor: theme.palette.case.primary.p600,
    buttonIcon: ChatIcon,
    secondButtonText: '',
    secondButtonColor: '',
    secondButtonActionType: networkActionsType.declinePendingRequest,
    buttonActionType: networkActionsType.confirmPendingRequest,
  },
  [NetworkUserStatus.incoming]: {
    label: i18next.t('network.status.pendingRequest'),
    title: i18next.t('network.title.pendingRequests'),
    icon: PendingIcon,
    buttonText: i18next.t('general.buttons.accept'),
    buttonActionType: networkActionsType.confirmPendingRequest,
    buttonColor: theme.palette.case.contrast.white,
    buttonIcon: AcceptIcon,
    secondButtonIcon: CancelIcon,
    secondButtonColor: theme.palette.case.contrast.white,
    secondButtonText: i18next.t('general.buttons.decline'),
    secondButtonActionType: networkActionsType.declinePendingRequest,
  },
  [NetworkUserStatus.future_outgoing]: {
    label: i18next.t('network.status.futureSentRequest'),
    title: i18next.t('network.title.futureSentRequests'),
    icon: FutureSendRequestIcon,
    buttonText: i18next.t('general.buttons.resend'),
    buttonColor: theme.palette.primary.main,
    buttonIcon: ResendBtnIcon,
    secondButtonIcon: CancelIcon,
    secondButtonText: i18next.t('general.buttons.cancel'),
    secondButtonColor: '',
    secondButtonActionType: networkActionsType.canselFutureSentRequest,
    buttonActionType: networkActionsType.resendFutureRequest,
  },
  [NetworkUserStatus.outgoing]: {
    label: i18next.t('network.status.sentRequest'),
    title: i18next.t('network.title.sentRequests'),
    icon: SentRequestIcon,
    buttonText: i18next.t('general.buttons.resend'),
    buttonColor: theme.palette.primary.main,
    buttonIcon: ResendBtnIcon,
    secondButtonIcon: CancelIcon,
    secondButtonText: i18next.t('general.buttons.cancel'),
    secondButtonColor: '',
    secondButtonActionType: networkActionsType.canselSentRequest,
    buttonActionType: networkActionsType.resendRequest,
  },
  [NetworkUserStatus.contact]: {
    label: i18next.t('network.status.notConnected'),
    title: i18next.t('network.title.contacts'),
    buttonText: i18next.t('general.buttons.invite'),
    buttonColor: theme.palette.primary.main,
    buttonIcon: AddCircleRoundedIcon,
    secondButtonText: '',
    secondButtonColor: '',
    secondButtonActionType: networkActionsType.declinePendingRequest,
    buttonActionType: networkActionsType.confirmPendingRequest,
  },
  [NetworkUserStatus.incoming_contact]: {
    label: i18next.t('network.status.notConnected'),
    title: i18next.t('network.title.incomingContact'),
    buttonText: i18next.t('general.buttons.confirm'),
    buttonColor: theme.palette.case.contrast.white,
    buttonIcon: AcceptIcon,
    secondButtonIcon: CancelIcon,
    secondButtonColor: theme.palette.case.contrast.white,
    secondButtonText: i18next.t('general.buttons.cancel'),
    secondButtonActionType: networkActionsType.declinePendingRequest,
    buttonActionType: networkActionsType.confirmPendingRequest,
  },
};

export const networkRequestStatusesConfig: {
  label: string;
  icon: any;
  value: NetworkTypeEnum;
}[] = [
  { label: i18next.t('network.status.myNetwork'), icon: MyNetworkIcon, value: NetworkTypeEnum.all },
  { label: i18next.t('network.status.connected'), icon: ConnectedIcon, value: NetworkTypeEnum.connected },
  { label: i18next.t('network.status.pendingRequests'), icon: PendingIcon, value: NetworkTypeEnum.pending },
  { label: i18next.t('network.status.sentRequests'), icon: SentRequestIcon, value: NetworkTypeEnum.sent },
  {
    label: i18next.t('network.status.futureSentRequests'),
    icon: FutureSendRequestIcon,
    value: NetworkTypeEnum.future,
  },
];
