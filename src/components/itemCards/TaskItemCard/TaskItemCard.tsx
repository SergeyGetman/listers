import React, { FC, memo, useCallback, useMemo } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import { TaskItemModel } from '../../../shared/models/tasks/taskItem.model';
import { plannerItemPriorityConfig } from '../../../shared/configs/plannerItemPriority.config';
import MuiBaseInputView from '../../formElements/MuiBaseInputView';
import PlannerItemStatusesView from '../../plannerItemStatuses/PlannerItemStatusesView';
import {
  TaskItemCardContainer,
  TaskItemCardContainerInputs,
  TaskItemCardContainerTitle,
  TaskItemCardContainerTitleBox,
  TaskItemCardContainerTitleIcon,
} from './TaskItemCard.style';
import { RecurringTypeConfig } from '../../../shared/configs/selectors/recurringType.config';
import MuiAvatarGroup from '../../avatars/MuiAvatarGroup';
import AdditionalInfo from '../../AdditionalInfo';
import { AssignPeoplePermissionsEnum } from '../../../shared/enums/assignPeoplePermissions.enum';
import PlannerItemsInfoContainer from '../../viewContainers/PlannerItemsInfoContainer';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import { PackageEnum } from '../../../shared/enums/package.enum';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import { AssignPeopleSelectValueModel } from '../../../shared/models/assignPeopleSelectValue.model';
import { updateUsersTask } from '../../../store/roadmap/roadmapThunk';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { updateRoadmapItem } from '../../../store/roadmap/roadmapSlice';
import modalObserver from '../../../shared/utils/observers/modalObserver';

type TaskItemCardProps = {
  task: TaskItemModel;
  isArchive?: boolean;
  handleOpenViwTaskModal: (id: number, isEdit?: boolean) => void;
};

const TaskItemCard: FC<TaskItemCardProps> = memo(
  ({ task, handleOpenViwTaskModal, isArchive }: TaskItemCardProps) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isEditor = useMemo(() => {
      return task.current_user.role !== AssignPeoplePermissionsEnum.viewer;
    }, [task.current_user.role]);
    const profileData = useAppSelector(({ profile }) => profile);
    const isStarterPackage = useMemo(() => {
      return (
        profileData?.data?.subscription?.package === PackageEnum.starter ||
        !profileData?.data?.subscription?.package
      );
    }, [profileData?.data?.subscription?.package]);
    const isTabletDisplay = useMediaQuery(theme.breakpoints.up('sm'));
    const priorityItem = useMemo(() => {
      return task?.priority ? plannerItemPriorityConfig[task?.priority] : plannerItemPriorityConfig.none;
    }, [task?.priority]);

    const dispatch = useAppDispatch();

    const handleOpenShareModal = useCallback(() => {
      modalObserver.addModal(ModalNamesEnum.shareModal, {
        props: {
          users: task?.users,
          owner: task?.owner,
          disableRemoveYourself: false,
          title: `Share "${task?.title}" task`,
          handleConfirm: (users: AssignPeopleSelectValueModel[]) =>
            Promise.resolve().then(() =>
              dispatch(updateUsersTask({ users, taskId: task.id })).then((result) => {
                if (updateUsersTask.fulfilled.match(result)) {
                  if (!!result.payload.current_user.status) {
                    dispatch(updateRoadmapItem(result.payload));

                    NotificationService.success(t('general.notifications.taskUpdated'));
                  }
                }
              }),
            ),
        },
      });
    }, [dispatch, task?.id, task?.owner, task?.title, task?.users, t]);

    return (
      <TaskItemCardContainer onClick={() => handleOpenViwTaskModal(task.id)}>
        <TaskItemCardContainerTitleBox>
          <TaskItemCardContainerTitle>
            <Typography noWrap variant="default_bolt">
              {task.title}
            </Typography>
            <TaskItemCardContainerTitleIcon>
              <priorityItem.icon sx={{ color: priorityItem.iconColor }} />
            </TaskItemCardContainerTitleIcon>
          </TaskItemCardContainerTitle>
          <Box>
            <PlannerItemStatusesView
              size="small"
              variant={task.current_user.status ? task.current_user.status : task.global_status}
            />
          </Box>
        </TaskItemCardContainerTitleBox>
        <TaskItemCardContainerInputs>
          <Box sx={{ width: '86px' }}>
            <MuiBaseInputView
              isLate={task?.current_user?.is_late}
              content={
                task.due_dated_at
                  ? Moment.utc(task.due_dated_at, 'YYYY-MM-DD HH:mm:ss').local().format('MM/DD/YYYY')
                  : 'N/A'
              }
              label={t('general.fieldNames.dueDate')}
            />
          </Box>
          <Box sx={{ width: '86px' }}>
            <MuiBaseInputView
              label={t('general.fieldNames.dueTime')}
              content={
                task.due_dated_at && !task.is_all_day_due_date
                  ? Moment.utc(task.due_dated_at, 'YYYY-MM-DD HH:mm:ss').local().format('hh:mm A')
                  : 'HH:MM'
              }
            />
          </Box>
          <Box sx={{ width: '86px' }}>
            <MuiBaseInputView
              content={
                task.is_recurring
                  ? RecurringTypeConfig[task.recurring_pattern.recurring_type || ''].label
                  : 'N/A'
              }
              label={t('general.fieldNames.repeat')}
            />
          </Box>
        </TaskItemCardContainerInputs>

        {isTabletDisplay && (
          <Box sx={{ marginTop: '16px' }}>
            <PlannerItemsInfoContainer
              modelType={task?.model_type}
              site={task?.site}
              description={task?.description}
              location={task?.location?.map}
              address={task?.location?.address}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <Box sx={{ width: '50%', borderRight: `1px dashed ${theme.palette.case.neutral.n400}` }}>
            <MuiAvatarGroup
              isShowAddUserBtn={!isArchive && isEditor && !isStarterPackage}
              onClickShare={() => handleOpenShareModal()}
              isContainOwnerInUsers={false}
              users={task?.users}
              owner={task.owner}
            />
          </Box>

          <AdditionalInfo
            document_count={task.document_count}
            is_unread_documents={task.current_user.is_unread_documents}
            photo_count={task.photo_count}
            comment_count={task.comment_count}
            is_unread_comments={task.current_user.is_unread_comments}
            is_unread_photos={task.current_user.is_unread_photos}
          />
        </Box>
      </TaskItemCardContainer>
    );
  },
);

export default TaskItemCard;
