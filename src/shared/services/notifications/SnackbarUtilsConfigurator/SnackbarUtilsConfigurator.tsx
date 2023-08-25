import React from 'react';
import { useSnackbar, VariantType, WithSnackbarProps } from 'notistack';
import BaseNotification from '../../../../components/notifications/BaseNotification';
import { MessageModel, ThreadModel } from '../../../models/chat/chat.model';
import ChatNotification from '../../../../components/notifications/ChatNotification';
import PlannerNotification from '../../../../components/notifications/PlannerNotification';

interface Props {
  setUseSnackbarRef: (showSnackbar: WithSnackbarProps) => void;
}
const InnerSnackbarUtilsConfigurator: React.FC<Props> = ({ setUseSnackbarRef }) => {
  setUseSnackbarRef(useSnackbar());
  return null;
};

let useSnackbarRef: WithSnackbarProps;
const setUseSnackbarRef = (useSnackbarRefProp: WithSnackbarProps) => {
  useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = () => {
  return <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />;
};

type NotificationServiceContentType = {
  onClose: (key: number) => void;
  key: number;
};

export const NotificationService = {
  success(msg: string, title?: string) {
    this.toast(msg, 'success', ({ onClose, key }: NotificationServiceContentType) => {
      return (
        <BaseNotification msg={msg} onClose={onClose} notificationKey={key} title={title} variant="success" />
      );
    });
  },
  error(msg: string, title?: string) {
    this.toast(msg, 'error', ({ onClose, key }: NotificationServiceContentType) => {
      return (
        <BaseNotification msg={msg} onClose={onClose} notificationKey={key} title={title} variant="error" />
      );
    });
  },
  update(msg: string, title?: string) {
    this.toast(msg, 'warning', ({ onClose, key }: NotificationServiceContentType) => {
      return (
        <BaseNotification msg={msg} onClose={onClose} notificationKey={key} title={title} variant="update" />
      );
    });
  },
  info(msg: string, title?: string) {
    this.toast(msg, 'info', ({ onClose, key }: NotificationServiceContentType) => {
      return (
        <BaseNotification msg={msg} onClose={onClose} notificationKey={key} title={title} variant="info" />
      );
    });
  },
  chatMessage(thread: ThreadModel, message: MessageModel, onSend: (message: string) => void) {
    this.toast(
      '',
      'default',
      ({ onClose, key }: NotificationServiceContentType) => {
        return (
          <ChatNotification
            message={message}
            thread={thread}
            onClose={onClose}
            notificationKey={key}
            onSend={onSend}
          />
        );
      },
      false,
    );
  },
  plannerItemUpdate(message?: string, userName?: string) {
    this.toast(
      '',
      'default',
      ({ onClose, key }: NotificationServiceContentType) => {
        return (
          <PlannerNotification userName={userName} msg={message} onClose={onClose} notificationKey={key} />
        );
      },
      false,
    );
  },
  maintenance(msg: string, title?: string) {
    this.toast(msg, 'info', ({ onClose, key }: NotificationServiceContentType) => {
      return (
        <BaseNotification
          msg={msg}
          onClose={onClose}
          notificationKey={key}
          title={title}
          variant="maintenance"
        />
      );
    });
  },

  toast(msg: string, variant: VariantType = 'default', content?: any, preventDuplicate: boolean = true) {
    useSnackbarRef.enqueueSnackbar(msg, {
      variant,
      preventDuplicate,
      autoHideDuration: 6000,
      content: content
        ? (SnackbarKey) => content({ onClose: useSnackbarRef.closeSnackbar, key: SnackbarKey })
        : null,
    });
  },
};
