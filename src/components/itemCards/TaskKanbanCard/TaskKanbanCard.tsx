import React, { FC, useCallback, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { DraggableProvided } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { TaskItemModel } from '../../../shared/models/tasks/taskItem.model';
import MuiBaseInputView from '../../formElements/MuiBaseInputView';
import { plannerItemPriorityConfig } from '../../../shared/configs/plannerItemPriority.config';
import { TaskKanbanCardContainer, TaskKanbanCardDraggable } from './TaskKanbanCard.style';
import { RecurringTypeConfig } from '../../../shared/configs/selectors/recurringType.config';
import theme from '../../../theme/theme';
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

type TaskKanbanCardProps = {
  task: TaskItemModel;
  provided: DraggableProvided;
  handleOpenViwTaskModal: (id: number, isEdit?: boolean) => void;
};
const TaskKanbanCard: FC<TaskKanbanCardProps> = ({ task, provided, handleOpenViwTaskModal }) => {
  const { t } = useTranslation();
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
  const priorityItem = task?.priority
    ? plannerItemPriorityConfig[task?.priority]
    : plannerItemPriorityConfig.none;
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
    <TaskKanbanCardDraggable {...provided.draggableProps} ref={provided.innerRef}>
      <TaskKanbanCardContainer onClick={() => handleOpenViwTaskModal(task.id)}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '85%' }}>
            <Typography noWrap variant="default_bolt">
              {task.title}
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
          <Box
            className="kanban-card-dnd-btn"
            sx={{ '&:hover': { opacity: '0.7' }, cursor: 'grab !important' }}
            {...provided.dragHandleProps}
          >
            <DragIndicatorIcon
              sx={{ color: theme.palette.case.neutral.n400, width: '20px', height: '20px' }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: '16px' }}>
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
        </Box>

        <Box sx={{ marginTop: '16px' }}>
          <PlannerItemsInfoContainer
            modelType={task?.model_type}
            site={task?.site}
            description={task?.description}
            location={task?.location?.map}
            address={task?.location?.address}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <Box sx={{ width: '50%', borderRight: `1px dashed ${theme.palette.case.neutral.n400}` }}>
            <MuiAvatarGroup
              isShowAddUserBtn={isEditor && !isStarterPackage}
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
      </TaskKanbanCardContainer>
    </TaskKanbanCardDraggable>
  );
};

export default TaskKanbanCard;
