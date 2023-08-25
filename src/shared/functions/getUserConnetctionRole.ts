import i18next from '../locales/i18n';
import { NetworkUserStatus } from '../enums/networkUserStatus.enum';
import { ItemUserModel } from '../models/itemUser.model';

export const getUserConnectionRole = (user: ItemUserModel, currentUserId: number) => {
  let connectionRole;

  if (user?.id === currentUserId) {
    connectionRole = '';
  } else if (user?.entity_type === NetworkUserStatus.contact || user?.is_fake) {
    connectionRole = i18next.t('network.status.connections');
  } else if (user?.connection_role) {
    if (user?.entity_type === NetworkUserStatus.outgoing) {
      connectionRole = i18next.t('network.status.sentRequests');
    } else if (user?.entity_type === NetworkUserStatus.incoming) {
      connectionRole = i18next.t('network.status.pendingRequest');
    } else {
      connectionRole = user?.connection_role;
    }
  } else {
    connectionRole = i18next.t('network.status.notConnected');
  }

  return connectionRole;
};
