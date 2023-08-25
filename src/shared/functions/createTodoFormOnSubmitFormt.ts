import Moment from 'moment';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { AssignPeopleSelectValueModel } from '../models/assignPeopleSelectValue.model';
import { MediaType } from '../models/media.model';
import { PlannerItemColorEnum } from '../enums/plannerItemColor.enum';
import i18next from '../locales/i18n';

type CreateTaskFormOnSubmitFormatProps = {
  data: {
    title?: string;
    description: any;
    due_date?: null | string | Date;
  };
  currentUserId: number;
  color: PlannerItemColorEnum;
  users: AssignPeopleSelectValueModel[];
  icon: any;
  gallery: MediaType[];
  files: MediaType[];
};
// Add local
export const createTodoFormOnSubmitFormat = ({
  data,
  users,
  color,
  icon,
  gallery,
  files,
  currentUserId,
}: CreateTaskFormOnSubmitFormatProps) => {
  const todoColor = color === PlannerItemColorEnum.none ? null : color;
  const todoIcon = !!icon ? icon : null;
  const documents = files.map((item: MediaType) => ({
    id: item.id,
  }));
  const photos = gallery.map((item: MediaType) => ({ id: item.id }));
  const formatUsers = users.filter((item) => item.id !== currentUserId);
  const dueDatedAt = data.due_date
    ? `${Moment(
        `${Moment(data.due_date).format('MM/DD/YYYY')} ${Moment('12:00:00', 'HH:mm:ss').format('HH:mm:ss')}`,
      )
        .utc()
        .format('YYYY-MM-DD HH:mm:ss')}`
    : null;

  const description =
    data.description.getCurrentContent().getPlainText().trim() !== ''
      ? draftToHtml(convertToRaw(data.description.getCurrentContent()))
      : '';

  const submitData = {
    ...data,
    users: formatUsers,
    documents,
    description,
    photos,
    icon: todoIcon,
    color: todoColor,
    due_dated_at: dueDatedAt,
    title: data.title ? data.title : i18next.t('general.header.newChecklist'),
  };

  delete submitData.due_date;

  return submitData;
};
