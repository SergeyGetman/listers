import React, { FC, memo, useCallback, useMemo } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import { PlannerItemModelTypeEnum } from '../../../shared/enums/plannerItemModelType.enum';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
import {
  PlannerItemAdditionalInfoContainer,
  PlannerItemContainer,
  PlannerItemMainContainer,
  PlannerItemTimeContainer,
  PlannerItemUsersContainer,
  PlannerStatusContainer,
  PlannerStatusContentBlock,
} from '../../../shared/styles/PlannerItemContainers';
import PlannerItemTimeBlock from '../../PlannerItemBlocks/PlannerItemTimeBlock';
import PlannerItemMainBlock from '../../PlannerItemBlocks/PlannerItemMainBlock';
import { ReactComponent as PaymentIcon } from '../../../assets/Images/payment.svg';
import AdditionalInfo from '../../AdditionalInfo';
import MuiAvatarGroup from '../../avatars/MuiAvatarGroup';
import PaperActionMenu from '../../actionMenus/PaperActionMenu';
import PlannerItemStatusesView from '../../plannerItemStatuses/PlannerItemStatusesView';
import BaseActionMenu from '../../actionMenus/BaseActionMenu';
import { plannerItemStatusesConfig } from '../../../shared/configs/plannerItemStatuses.config';
import { ActionMenuListModel } from '../../../shared/models/actionMenuList.model';
import typeGuardFormActionMenu from '../../../shared/functions/typeGuardFormActionMenu';
import { AssignPeoplePermissionsEnum } from '../../../shared/enums/assignPeoplePermissions.enum';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { updatePlannerListItemWithoutSplit } from '../../../store/planner/plannerSlice';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { changePaymentStatus } from '../../../store/payment/paymentThunk';
type PlannerPaymentProps = {
  item: any;
  containerDate: string;
  handleOpenPlannerItem: (itemId: number, modelType: PlannerItemModelTypeEnum, isEditMode?: boolean) => void;
};

const PlannerPayment: FC<PlannerPaymentProps> = ({ item, containerDate, handleOpenPlannerItem }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isEditor = useMemo(() => {
    return item?.current_user?.role !== AssignPeoplePermissionsEnum.viewer;
  }, [item?.current_user?.role]);
  const dispatch = useAppDispatch();
  const status = useMemo(() => {
    return item?.is_global_late && item?.current_user?.status !== PlannerItemStatusesEnum.paid
      ? PlannerItemStatusesEnum.late
      : item?.current_user.status;
  }, [item?.current_user?.status, item?.is_global_late]);
  const isTabletDisplay = useMediaQuery(theme.breakpoints.down('md'));
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const isBlur = useMemo(() => {
    return (
      status === PlannerItemStatusesEnum.paid &&
      Moment(containerDate, 'MMMM DD, YYYY').diff(Moment(), 'days') < 0
    );
  }, [status, containerDate]);
  const isUnread = useMemo(() => {
    return (
      item.current_user.is_unread_documents ||
      item.current_user.is_unread_comments ||
      item.current_user.is_unread_photos
    );
  }, [
    item.current_user.is_unread_documents,
    item.current_user.is_unread_comments,
    item.current_user.is_unread_photos,
  ]);
  const handleChangeStatus = useCallback(
    (value: PlannerItemStatusesEnum) => {
      return dispatch(changePaymentStatus({ paymentId: item.id, status: value })).then((result) => {
        if (changePaymentStatus.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.paymentStatusUpdated'));
          dispatch(updatePlannerListItemWithoutSplit(result.payload));
        }
      });
    },
    [dispatch, item.id, t],
  );

  const menuList: ActionMenuListModel = useMemo(() => {
    return [
      {
        label: t('general.actionMenus.view'),
        callback: () => handleOpenPlannerItem(item.id, item.model_type),
        isDisabled: false,
      },
      isEditor && {
        label: t('general.actionMenus.edit'),
        callback: () => handleOpenPlannerItem(item.id, item.model_type, true),
        isDisabled: false,
      },
    ].filter(typeGuardFormActionMenu);
  }, [item.id, item.model_type, handleOpenPlannerItem, isEditor, t]);

  const statusMenu = useMemo(() => {
    return [
      {
        item: plannerItemStatusesConfig[PlannerItemStatusesEnum.paid],
        callback: () => handleChangeStatus(PlannerItemStatusesEnum.paid),
        isDisabled: item.current_user.status === PlannerItemStatusesEnum.paid,
      },
      {
        item: plannerItemStatusesConfig[PlannerItemStatusesEnum.unpaid],
        callback: () => handleChangeStatus(PlannerItemStatusesEnum.unpaid),
        isDisabled: item.current_user.status === PlannerItemStatusesEnum.unpaid,
      },
    ];
  }, [handleChangeStatus, item.current_user.status]);

  return (
    <PlannerItemContainer
      isUnread={isUnread}
      onClick={() => handleOpenPlannerItem(item.id, item.model_type)}
      isBlur={isBlur}
    >
      <PlannerItemTimeContainer>
        <PlannerItemTimeBlock
          containerDate={containerDate}
          isAllDay={item.is_all_day}
          statedAt={item.started_at || ''}
          finishedAt={item.finished_at || ''}
        />
      </PlannerItemTimeContainer>
      <PlannerItemMainContainer>
        <PlannerItemMainBlock
          status={status}
          isShowDueDate
          dueDate={item.due_dated_at}
          isLate={item?.is_global_late}
          iconColor={theme.palette.primary.main}
          statusMenu={statusMenu}
          currentStatus={status}
          icon={<PaymentIcon />}
          title={item.title}
          description={item.description}
          isMobileDisplay={isMobileDisplay}
          isRecurring={item.is_recurring}
        />
      </PlannerItemMainContainer>
      <PlannerItemAdditionalInfoContainer>
        <AdditionalInfo
          document_count={item.document_count}
          is_unread_documents={item.current_user.is_unread_documents}
          photo_count={item.photo_count}
          comment_count={item.comment_count}
          is_unread_comments={item.current_user.is_unread_comments}
          is_unread_photos={item.current_user.is_unread_photos}
        />
      </PlannerItemAdditionalInfoContainer>
      <PlannerItemUsersContainer>
        <MuiAvatarGroup isContainOwnerInUsers={false} users={item?.users} owner={item.owner} />
      </PlannerItemUsersContainer>
      <PlannerStatusContainer>
        <PlannerStatusContentBlock>
          <Box sx={{ width: 2 }} />
          <PaperActionMenu menuList={statusMenu} activeItem={status}>
            <Box
              sx={{
                mr: '40%',
                '&:hover': {
                  opacity: '0.7',
                },
              }}
            >
              <PlannerItemStatusesView size={isTabletDisplay ? 'small' : 'large'} variant={status} />
            </Box>
          </PaperActionMenu>
          {!isMobileDisplay && <BaseActionMenu iconSize="medium" menuList={menuList} />}
        </PlannerStatusContentBlock>
      </PlannerStatusContainer>
    </PlannerItemContainer>
  );
};

export default memo(PlannerPayment);
