import React, { FC, useCallback, useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import Moment from 'moment';
import { TaskItemModel } from '../../../../shared/models/tasks/taskItem.model';
import { BacklogItemContainer } from './BacklogCard.style';
import MuiBaseInputView from '../../../../components/formElements/MuiBaseInputView';
import MuiAvatarGroup from '../../../../components/avatars/MuiAvatarGroup';
import AdditionalInfo from '../../../../components/AdditionalInfo';
import { plannerItemPriorityConfig } from '../../../../shared/configs/plannerItemPriority.config';
import { AssignPeoplePermissionsEnum } from '../../../../shared/enums/assignPeoplePermissions.enum';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { AssignPeopleSelectValueModel } from '../../../../shared/models/assignPeopleSelectValue.model';
import { updateUsersTask } from '../../../../store/roadmap/roadmapThunk';
import { updateBacklogItem } from '../../../../store/backlog/backlogSlice';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

type BacklogCardProps = {
  data: TaskItemModel;
  handleOpenViwTaskModal: (id: number, isEdit?: boolean) => void;
  isShowDescription?: boolean;
};

const BacklogCard: FC<BacklogCardProps> = ({ data, handleOpenViwTaskModal, isShowDescription }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isEditor = useMemo(() => {
    return data.current_user.role !== AssignPeoplePermissionsEnum.viewer;
  }, [data.current_user.role]);
  const priorityItem = data.priority
    ? plannerItemPriorityConfig[data.priority]
    : plannerItemPriorityConfig.none;

  const dispatch = useAppDispatch();

  const handleOpenShareModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.shareModal, {
      props: {
        users: data?.users,
        owner: data?.owner,
        disableRemoveYourself: false,
        title: `Share "${data?.title}" task`,
        handleConfirm: (users: AssignPeopleSelectValueModel[]) =>
          Promise.resolve().then(() =>
            dispatch(updateUsersTask({ users, taskId: data.id })).then((result) => {
              if (updateUsersTask.fulfilled.match(result)) {
                if (!!result.payload.current_user.status) {
                  dispatch(updateBacklogItem(result.payload));

                  NotificationService.success(t('general.notifications.taskUpdated'));
                }
              }
            }),
          ),
      },
    });
  }, [dispatch, data?.id, data?.owner, data?.title, data?.users, t]);

  return (
    <BacklogItemContainer onClick={() => handleOpenViwTaskModal(data.id)}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography noWrap variant="default_bolt">
          {data.title}
        </Typography>
        <Box
          sx={{
            marginLeft: '4px',
            svg: {
              width: '15px',
            },
          }}
        >
          <priorityItem.icon sx={{ color: priorityItem.iconColor }} />
        </Box>
      </Box>
      <Box sx={{ marginTop: '16px' }}>
        <MuiBaseInputView
          isLate={data?.current_user?.is_late}
          content={
            data.due_dated_at
              ? Moment.utc(data.due_dated_at, 'YYYY-MM-DD HH:mm:ss').local().format('MM/DD/YYYY')
              : 'N/A'
          }
          label={t('general.fieldNames.dueDate')}
        />
      </Box>
      {isShowDescription && (
        <Box sx={{ marginTop: '16px' }}>
          <MuiBaseInputView
            content={data?.description ? parse(data.description) : 'N/A'}
            label={t('general.fieldNames.description')}
          />
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <Box sx={{ width: '50%', borderRight: `1px dashed ${theme.palette.case.neutral.n400}` }}>
          <MuiAvatarGroup
            isShowAddUserBtn={isEditor}
            onClickShare={() => handleOpenShareModal()}
            isContainOwnerInUsers={false}
            users={data?.users}
            owner={data.owner}
          />
        </Box>

        <AdditionalInfo
          document_count={data.document_count}
          is_unread_documents={data.current_user.is_unread_documents}
          photo_count={data.photo_count}
          comment_count={data.comment_count}
          is_unread_comments={data.current_user.is_unread_comments}
          is_unread_photos={data.current_user.is_unread_photos}
        />
      </Box>
    </BacklogItemContainer>
  );
};

export default BacklogCard;
