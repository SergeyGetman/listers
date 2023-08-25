import { AssignPeoplePermissionsEnum } from '../../shared/enums/assignPeoplePermissions.enum';
import { PlannerItemColorEnum } from '../../shared/enums/plannerItemColor.enum';
import { PlannerItemModelTypeEnum } from '../../shared/enums/plannerItemModelType.enum';
import { TodoItemModel } from '../../shared/models/todo/todoItemModel';
import { mockChecklistItems } from './mockChecklistItems';
import { mockItemUsers, mockOwner } from './mockItemUsers';
import { mockPhotos } from './mockPhotos';

export const mockTodoItem: TodoItemModel = {
  id: 2345,
  is_all_day_due_date: true,
  is_open: 2,
  title: 'Todo Item Title',
  description: 'Todo Item Description',
  color: PlannerItemColorEnum.purple,
  userNotification: null,
  icon: 'custom',
  comment_count: 10,
  document_count: 0,
  photo_count: 1,
  model_type: PlannerItemModelTypeEnum.todo,
  current_user: {
    is_unread_comments: true,
    is_unread_documents: true,
    is_unread_photos: true,
    role: AssignPeoplePermissionsEnum.creator,
    is_late: false,
  },
  owner: mockOwner,
  users: mockItemUsers,
  photos: mockPhotos,
  documents: [],
  checklists: mockChecklistItems,
};
