import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import MainMeetingView from '../MainMeetingView';
import MainMeetingEdit from '../MainMeetingEdit';
import { useAppSelector } from '../../../../../shared/hooks/redux';
import typeGuardFormActionMenu from '../../../../../shared/functions/typeGuardFormActionMenu';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import useMeetingActions from './hooks/useMeetingActions';
import { MeetingModel } from '../../../../../shared/models/meeting/meeting.model';
import { PackageEnum } from '../../../../../shared/enums/package.enum';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';

type ViewMeetingModalContainerProps = {
  onClose: (isForceClose?: boolean) => void;
  event: MeetingModel;
  setIsShowUnsavedDataModal: (val: boolean) => void;
};

const ViewMeetingModalContainer: FC<ViewMeetingModalContainerProps> = ({
  onClose,
  event,
  setIsShowUnsavedDataModal,
}) => {
  const profileData = useAppSelector(({ profile }) => profile);
  const isStarterPackage =
    profileData?.data?.subscription?.package === PackageEnum.starter ||
    !profileData?.data?.subscription?.package;
  const {
    handleRemoveYourselfFromEvent,
    handleDeleteMeeting,
    handleUnArchive,
    handleArchive,
    handleChangeStatus,
    handleDecline,
    handleAccept,
    handleUpdateMeetingOnPage,
    isArchive,
    isAcceptLoading,
    isDeclineLoading,
    isEditor,
    isCreator,
    isShowUnArchiveBtn,
    userNotifications,
  } = useMeetingActions({
    onClose,
    meeting: event,
  });
  const isEditView = isEditor && !userNotifications;

  const { t } = useTranslation();

  const handleOpenUpgradePackageModal = () => {
    modalObserver.addModal(ModalNamesEnum.purchaseModal, {});
  };

  const menuList: ActionMenuListModel = [
    isShowUnArchiveBtn && {
      label: t('general.actionMenus.unArchive'),
      callback: () => handleUnArchive(),
      tooltipTitle: 'Upgrade',
      disableCallback: handleOpenUpgradePackageModal,
      isDisabled: isStarterPackage,
    },
    !isArchive && {
      label: t('general.actionMenus.archive'),
      callback: () => handleArchive(),
      tooltipTitle: 'Upgrade',
      disableCallback: handleOpenUpgradePackageModal,
      isDisabled: isStarterPackage,
    },
    !isCreator && {
      label: t('general.actionMenus.removeYourself'),
      callback: () => handleRemoveYourselfFromEvent(),
      isDisabled: false,
    },
    isCreator && {
      label: t('general.actionMenus.deleteEvent'),
      callback: () => handleDeleteMeeting(),
      isDisabled: false,
    },
  ].filter(typeGuardFormActionMenu);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {isEditView ? (
        <MainMeetingEdit
          setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
          event={event}
          handleUpdateMeetingOnPage={handleUpdateMeetingOnPage}
          menuList={menuList}
          onClose={onClose}
        />
      ) : (
        <MainMeetingView
          event={event}
          handleChangeStatus={handleChangeStatus}
          menuList={menuList}
          onClose={onClose}
          isArchive={isArchive}
          isFooterButton={userNotifications}
          handleAccept={handleAccept}
          isAcceptLoading={isAcceptLoading}
          isDeclineLoading={isDeclineLoading}
          handleDecline={handleDecline}
        />
      )}
    </Box>
  );
};

export default ViewMeetingModalContainer;
