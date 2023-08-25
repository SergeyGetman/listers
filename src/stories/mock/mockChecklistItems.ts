import { ChecklistItemStatusEnum } from '../../shared/enums/checklistItemStatus.enum';
import { ChecklistItemModel } from '../../shared/models/checklists/checklistItem.model';
import { mockOwner } from './mockItemUsers';

export const mockChecklistItems: ChecklistItemModel[] = [
  {
    id: 11,
    creator: mockOwner,
    status: ChecklistItemStatusEnum.todo,
    updated_at: new Date().toLocaleString(),
    body: 'Checklist Item Body',
  },
];
