import { TFunction } from 'i18next';
import { ReactComponent as ChecklistIcon } from '../../../assets/Images/todoIcons/checklist.svg';
import { ReactComponent as NoteIcon } from '../../../assets/Images/todoIcons/note.svg';

import { TodoItemTypeEnum } from '../../enums/todo/todoItemType.enum';

type getTodoAddItemsConfigType = {
  [key: string]: {
    label: string;
    id: TodoItemTypeEnum;
    icon?: any;
  };
};

export const getTodoAddItemsConfig = (t: TFunction, isStub?: boolean): getTodoAddItemsConfigType => ({
  [TodoItemTypeEnum.checklist]: {
    id: TodoItemTypeEnum.checklist,
    label: isStub ? t('general.add', { item: t('todo.itemType.checklist') }) : t('todo.itemType.checklist'),
    icon: ChecklistIcon,
  },
  [TodoItemTypeEnum.note]: {
    id: TodoItemTypeEnum.note,
    label: isStub ? t('general.add', { item: t('todo.itemType.note') }) : t('todo.itemType.note'),
    icon: NoteIcon,
  },
});
