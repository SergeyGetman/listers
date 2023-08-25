import React, { FC, useCallback, useMemo, useState } from 'react';
import { TabContext, TabPanel } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useAppSelector } from '../../../../../shared/hooks/redux';
import { PlannerItemModalNavigationEnum } from '../../../../../shared/enums/plannerItemModalNavigationEnum';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import PlannerItemModalNavigation from '../../../../modalsElements/components/PlannerItemModalNavigation';
import PlannerItemModalChecklists from '../../../../modalsElements/components/PlannerItemModalChecklists';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import typeGuardFormActionMenu from '../../../../../shared/functions/typeGuardFormActionMenu';
import MainPaymentView from '../MainPaymentView';
import MainPaymentEdit from '../MainPaymentEdit';
import PlannerItemModalNotes from '../../../../modalsElements/components/PlannerItemModalNotes';
import PlannerItemModalComments from '../../../../modalsElements/components/PlannerItemModalComments';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type ViewPaymentModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  payment: any;
  setIsShowUnsavedDataModal: (val: boolean) => void;
  isShowUnsavedDataModal: boolean;
  isOpenEditMode?: boolean;
};
const ViewPaymentModalContainer: FC<ViewPaymentModalContainerProps> = ({
  onClose,
  payment,
  setIsShowUnsavedDataModal,
  isShowUnsavedDataModal,
  isOpenEditMode,
}) => {
  const [isEditView, setIsEditView] = useState<boolean>(isOpenEditMode ? isOpenEditMode : false);
  const [navigationTab, setNavigationTab] = useState<PlannerItemModalNavigationEnum>(
    PlannerItemModalNavigationEnum.main,
  );

  const currentUserId = useAppSelector(({ profile }) => profile.data.id);
  const { t } = useTranslation();
  const isEditor = useMemo(() => {
    return (
      payment.current_user.role === AssignPeoplePermissionsEnum.editor ||
      payment.current_user.role === AssignPeoplePermissionsEnum.creator
    );
  }, [payment.current_user.role]);

  const handleChangeMainView = useCallback(
    (val: boolean) => {
      if (isShowUnsavedDataModal) {
        modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
          props: {
            title: t('general.modals.unsavedData.title'),
            text: t('general.modals.unsavedData.text'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: () => {
              setIsEditView(val);
              setIsShowUnsavedDataModal(false);
            },
          },
        });
      } else {
        setIsEditView(val);
      }
    },
    [isShowUnsavedDataModal, setIsShowUnsavedDataModal, t],
  );

  const menuList: ActionMenuListModel = [
    isEditor && {
      label: t('general.actionMenus.edit'),
      callback: () => {
        handleChangeMainView(true);
        setNavigationTab(PlannerItemModalNavigationEnum.main);
      },
      isDisabled: false,
    },
  ].filter(typeGuardFormActionMenu);

  const handleChangeNavigationTab = useCallback(
    (val: PlannerItemModalNavigationEnum) => {
      if (isShowUnsavedDataModal) {
        modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
          props: {
            title: t('general.modals.unsavedData.title'),
            text: t('general.modals.unsavedData.text'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: () => {
              setNavigationTab(val);
              handleChangeMainView(false);
              setIsShowUnsavedDataModal(false);
            },
          },
        });
      } else {
        setNavigationTab(val);
        handleChangeMainView(false);
      }
    },
    [handleChangeMainView, isShowUnsavedDataModal, setIsShowUnsavedDataModal, t],
  );

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: navigationTab === PlannerItemModalNavigationEnum.main ? 'auto' : 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <MuiDefaultDrawerHeader
        onClose={onClose}
        headerMenuList={menuList}
        isShowHeaderMenu={isEditor}
        title={payment.title}
      />
      <Box
        sx={{
          padding: '0 10px',
          width: '100%',
          flexGrow: '1',
          height: '100%',
          overflow: navigationTab === PlannerItemModalNavigationEnum.main ? 'auto' : 'hidden',
          '& .MuiTabPanel-root': {
            p: '0',
          },
        }}
      >
        <TabContext value={navigationTab}>
          <PlannerItemModalNavigation
            commentCount={payment?.comment_count}
            handleChangeNavigationTab={handleChangeNavigationTab}
          />
          <TabPanel value={PlannerItemModalNavigationEnum.main}>
            {isEditView ? (
              <MainPaymentEdit
                setIsShowUnsavedDataModal={setIsShowUnsavedDataModal}
                setIsEditView={setIsEditView}
                handleChangeMainView={handleChangeMainView}
                payment={payment}
                currentUserId={currentUserId}
              />
            ) : (
              <MainPaymentView currentUserId={currentUserId} payment={payment} />
            )}
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value={PlannerItemModalNavigationEnum.checklist}>
            <PlannerItemModalChecklists
              isEditor={isEditor}
              currentUserId={currentUserId}
              creatorId={payment?.owner?.id}
              entityId={payment.id}
            />
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value={PlannerItemModalNavigationEnum.notes}>
            <PlannerItemModalNotes
              currentUserId={currentUserId}
              isEditor={isEditor}
              creatorId={payment?.owner?.id}
              entityId={payment.id}
            />
          </TabPanel>
          <TabPanel sx={{ height: '100%' }} value={PlannerItemModalNavigationEnum.comments}>
            <PlannerItemModalComments
              currentUserId={currentUserId}
              isEditor={isEditor}
              creatorId={payment?.owner?.id}
              entityId={payment.id}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ViewPaymentModalContainer;
