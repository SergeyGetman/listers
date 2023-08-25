import moment from 'moment';
import { AssignPeoplePermissionsEnum } from '../../shared/enums/assignPeoplePermissions.enum';
import { PlannerItemModelTypeEnum } from '../../shared/enums/plannerItemModelType.enum';
import { PlannerItemPriorityEnum } from '../../shared/enums/plannerItemPriority.enum';
import { PlannerItemStatusesEnum } from '../../shared/enums/plannerItemStatuses.enum';
import { RecurringTypeEnum } from '../../shared/enums/recurringType.enum';
import { TaskItemModel } from '../../shared/models/tasks/taskItem.model';
import { mockItemUsers, mockOwner } from './mockItemUsers';
import { mockPhotos } from './mockPhotos';

export const mockTaskItem: TaskItemModel = {
  id: 2345,
  is_all_day_due_date: true,
  title: 'Todo Item Title',
  user_notifications: null,
  description: 'Todo Item Description',
  comment_count: 10,
  document_count: 0,
  photo_count: 1,
  model_type: PlannerItemModelTypeEnum.todo,
  current_user: {
    is_unread_comments: true,
    is_unread_documents: true,
    is_unread_photos: true,
    is_archive: false,
    status: PlannerItemStatusesEnum.in_progress,
    role: AssignPeoplePermissionsEnum.creator,
    is_late: false,
  },
  owner: mockOwner,
  users: mockItemUsers,
  photos: mockPhotos,
  documents: [],
  global_status: PlannerItemStatusesEnum.in_progress,
  is_all_day: true,
  is_archive: false,
  is_global_late: false,
  is_hot: true,
  is_recurring: false,
  is_same: false,
  priority: PlannerItemPriorityEnum.middle,
  recurring_pattern: {
    frequency_type: RecurringTypeEnum.DAILY,
    start_date: '',
    end_date: moment(),
    is_endless: false,
    recurring_type: RecurringTypeEnum.DAILY,
    repeat_by_days: [],
    repeat_by_months: null,
    repeat_interval: 1,
  },
};
