import { NetworkUserModel } from '../../../shared/models/network';
import { NetworkUserStatus } from '../../../shared/enums/networkUserStatus.enum';

export const isDisabledNetworkButton = ({ user }: { user: NetworkUserModel }) => {
  switch (user?.entity_type) {
    case NetworkUserStatus.future_outgoing:
      return user.is_resend === false;
      break;
    case NetworkUserStatus.outgoing:
      return user.is_resend === false;
      break;
    case NetworkUserStatus.contact:
      return user.is_invited;
      break;

    default:
      return false;
      break;
  }
};
