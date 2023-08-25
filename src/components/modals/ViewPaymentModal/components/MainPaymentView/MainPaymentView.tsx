/* eslint-disable no-console */
import React, { FC } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import ViewPaymentContainer from '../../../../viewContainers/ViewPaymentContainer';
import ViewDescriptionContainer from '../../../../viewContainers/ViewDescriptionContainer';
import GalleryContainer from '../../../../viewContainers/GalleryContainer';
import DocumentsContainer from '../../../../viewContainers/DocumentsContainer';
import MuiDotAccordion from '../../../../accordions/MuiDotAccordion';
import EventViewAssignPeople from '../../../../assignPeople/EventViewAssignPeople';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import router from '../../../../../shared/services/router';
import { updateCalendarItem } from '../../../../../store/calendar/calendarSlice';
import { updatePlannerListItemWithoutSplit } from '../../../../../store/planner/plannerSlice';
import { changePaymentStatus } from '../../../../../store/payment/paymentThunk';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type MainPaymentViewProps = {
  payment: any;
  currentUserId: number;
};
const MainPaymentView: FC<MainPaymentViewProps> = ({ payment, currentUserId }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleUpdateListItem = (value: any) => {
    if (location.pathname === router.calendar.path) {
      dispatch(updateCalendarItem(value));
    } else if (location.pathname === router.journal.path) {
      dispatch(updatePlannerListItemWithoutSplit(value));
    }
  };

  const handleChangeStatus = (
    selectedStatus: PlannerItemStatusesEnum,
    setIsLoading?: (val: boolean) => void,
  ) => {
    if (setIsLoading) {
      setIsLoading(true);
    }
    dispatch(changePaymentStatus({ paymentId: payment.id, status: selectedStatus }))
      .then((result) => {
        if (changePaymentStatus.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.paymentStatusUpdated'));
          modalObserver.updateModalProps(ModalNamesEnum.viewPaymentModal, {
            props: {
              data: result.payload,
            },
          });
          handleUpdateListItem(result.payload);
        }
      })
      .finally(() => {
        if (setIsLoading) {
          setIsLoading(false);
        }
      });
  };

  return (
    <Box>
      <Box sx={{ mt: '30px' }}>
        <ViewPaymentContainer handleChangeStatus={handleChangeStatus} payment={payment} />
      </Box>
      {payment.description && (
        <Box sx={{ mt: '30px' }}>
          <ViewDescriptionContainer description={payment.description} />
        </Box>
      )}
      {!!payment.photos.length && (
        <Box sx={{ mt: '30px' }}>
          <GalleryContainer
            isCanAddMedia={false}
            gallery={payment.photos}
            onAddMedia={() => () => console.log('')}
            permission={{ isDelete: false, isDownload: true, isUpdate: false }}
          />
        </Box>
      )}
      {!!payment.documents.length && (
        <Box sx={{ mt: '30px' }}>
          <DocumentsContainer
            isCanAddMedia={false}
            files={payment.documents}
            onAddMedia={() => console.log('')}
            permission={{ isDelete: false, isDownload: true, isUpdate: false }}
          />
        </Box>
      )}
      <Box sx={{ mt: '30px', pb: '150px' }}>
        <MuiDotAccordion
          label={t('general.containers.sharing')}
          isShowInfoDialog
          isDefaultExpand
          // TODO need tooltip text
          infoTooltipText="Two-factor authentication is a great way to keep your hubmee account secure and private. Choose how you would like to authenticate: using a phone number or email. From now on, no one else can log into your hubmee account, even if they have your username and password. We care about our users’ privacy; enjoy hubmee with peace of mind"
        >
          <EventViewAssignPeople owner={payment.owner} currentUserId={currentUserId} users={payment.users} />
        </MuiDotAccordion>
      </Box>
    </Box>
  );
};

export default MainPaymentView;
