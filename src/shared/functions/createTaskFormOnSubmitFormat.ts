import Moment from 'moment';
import { slateToHtml } from 'slate-serializers';
import { PlannerItemStatusesEnum } from '../enums/plannerItemStatuses.enum';
import { PlannerItemPriorityEnum } from '../enums/plannerItemPriority.enum';
import { TaskModalFormModel } from '../models/tasks/TaskModalForm.model';
import { MediaType } from '../models/media.model';
import { formatRecurringValue } from './formatRecurringValue';
import i18next from '../locales/i18n';
import { ItemUserModel } from '../models/itemUser.model';
import { TagsEnum } from '../enums/tags.enum';
import { tagsConfig } from '../configs/tags.config';
import { serializeSlateToText } from '../utils/serializeSlateToText';
import { ReminderTimeEnum } from '../enums/reminderTime.enum';

type CreateTaskFormOnSubmitFormatProps = {
  data: TaskModalFormModel;
  status: PlannerItemStatusesEnum;
  users: ItemUserModel[];
  priority?: PlannerItemPriorityEnum;
  gallery?: MediaType[];
  files?: MediaType[];
  tag?: TagsEnum | null;
  notes?: any;
  checklists?: any;
};

export const createTaskFormOnSubmitFormat = ({
  data,
  status,
  users,
  notes,
  checklists,
}: CreateTaskFormOnSubmitFormatProps) => {
  // TODO change after add new pages
  const taskPriority = data.priority === 'none' ? null : data.priority;
  const documents = data.documents.map((item: MediaType) => ({
    id: item.id,
  }));
  const taskTag = data.tag_id && data.tag_id !== TagsEnum.none ? tagsConfig[data.tag_id].tagId : null;
  const location =
    data?.physicalAddress?.address && data?.physicalAddress?.map
      ? {
          address: data.physicalAddress.address,
          map: data.physicalAddress.map,
        }
      : null;
  const notifyBefore =
    data.notify_before && data.notify_before !== ReminderTimeEnum.never_remind ? data.notify_before : null;
  const startedAt =
    status !== PlannerItemStatusesEnum.backlog
      ? `${
          data.is_all_day
            ? Moment(
                `${Moment(data.start_date).format('MM/DD/YYYY')} ${Moment('12:00:00', 'HH:mm:ss').format(
                  'HH:mm:ss',
                )}`,
              )
                .utc()
                .format('YYYY-MM-DD HH:mm:ss')
            : Moment(
                `${Moment(data.start_date).format('MM/DD/YYYY')} ${Moment(data.start_time).format(
                  'HH:mm:ss',
                )}`,
              )
                .utc()
                .format('YYYY-MM-DD HH:mm:ss')
        }`
      : null;

  const finishedAt =
    status !== PlannerItemStatusesEnum.backlog
      ? `${
          data.is_all_day
            ? Moment(
                `${Moment(data.finish_date).format('MM/DD/YYYY')} ${Moment('12:10:00', 'HH:mm:ss').format(
                  'HH:mm:ss',
                )}`,
              )
                .utc()
                .format('YYYY-MM-DD HH:mm:ss')
            : Moment(
                `${Moment(data.finish_date).format('MM/DD/YYYY')} ${Moment(data.finish_time).format(
                  'HH:mm:ss',
                )}`,
              )
                .utc()
                .format('YYYY-MM-DD HH:mm:ss')
        }`
      : null;

  const dueDatedAt = data.due_date
    ? `${
        data.is_all_day_due_date || status === PlannerItemStatusesEnum.backlog
          ? Moment(
              `${Moment(data.due_date).format('MM/DD/YYYY')} ${Moment('12:00:00', 'HH:mm:ss').format(
                'HH:mm:ss',
              )}`,
            )
              .utc()
              .format('YYYY-MM-DD HH:mm:ss')
          : Moment(
              `${Moment(data.due_date).format('MM/DD/YYYY')} ${Moment(data.due_time).format('HH:mm:ss')}`,
            )
              .utc()
              .format('YYYY-MM-DD HH:mm:ss')
      } `
    : null;
  const description =
    serializeSlateToText(data.description).trim().length > 0 ? slateToHtml(data.description) : '';
  const recurringData =
    status !== PlannerItemStatusesEnum.backlog
      ? formatRecurringValue(data.recurring_pattern, startedAt || '')
      : {
          is_recurring: false,
          recurring_pattern: {},
        };

  const submitData = {
    ...data,
    global_status: status,
    users,
    priority: taskPriority,
    documents,
    description,
    tag_id: taskTag,
    started_at: startedAt,
    finished_at: finishedAt,
    due_dated_at: dueDatedAt,
    notes,
    checklists,
    // TODO remove is_same checker after back refactor this
    is_same: false,
    location,
    notify_before: notifyBefore,
    title: data.title || i18next.t('general.header.newTask'),
    ...recurringData,
  };

  delete submitData.due_date;
  delete submitData.due_time;
  delete submitData.start_date;
  delete submitData.start_time;
  delete submitData.finish_date;
  delete submitData.finish_time;
  return submitData;
};
