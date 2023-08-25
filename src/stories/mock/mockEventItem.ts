import moment from 'moment/moment';
import { AssignPeoplePermissionsEnum } from '../../shared/enums/assignPeoplePermissions.enum';
import { EventRoleEnum } from '../../shared/enums/eventRole.enum';
import { EventTypeEnum } from '../../shared/enums/eventType.enum';
import { PlannerItemModelTypeEnum } from '../../shared/enums/plannerItemModelType.enum';
import { PlannerItemStatusesEnum } from '../../shared/enums/plannerItemStatuses.enum';
import { RecurringTypeEnum } from '../../shared/enums/recurringType.enum';
import { EventItemModel } from '../../shared/models/event/eventItem.model';
import { mockItemUsers, mockOwner } from './mockItemUsers';
import { mockPhotos } from './mockPhotos';

export const mockEventItem: EventItemModel = {
  id: 2345,
  title: 'Todo Item Title',
  description: 'Todo Item Description',
  comment_count: 10,
  document_count: 0,
  photo_count: 1,
  model_type: PlannerItemModelTypeEnum.event,
  user_notifications: null,
  current_user: {
    is_unread_comments: true,
    is_unread_documents: true,
    is_unread_photos: true,
    is_can_view_media: true,
    is_archive: false,
    status: PlannerItemStatusesEnum.in_progress,
    role: AssignPeoplePermissionsEnum.creator,
  },
  owner: mockOwner,
  users: mockItemUsers,
  photos: mockPhotos,
  documents: [],
  role: EventRoleEnum.host,
  status: PlannerItemStatusesEnum.in_progress,
  type: EventTypeEnum.in_person,
  is_all_day: true,
  is_archive: false,
  is_recurring: false,
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
