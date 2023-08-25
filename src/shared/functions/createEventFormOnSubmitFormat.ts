import Moment from 'moment';
import { slateToHtml } from 'slate-serializers';
import { MediaType } from '../models/media.model';
import { EventModalFormModel } from '../models/event/eventModalFormModel.model';
import { formatRecurringValue } from './formatRecurringValue';
import i18next from '../locales/i18n';
import { ItemUserModel } from '../models/itemUser.model';
import { TagsEnum } from '../enums/tags.enum';
import { tagsConfig } from '../configs/tags.config';
import { ReminderTimeEnum } from '../enums/reminderTime.enum';
import { serializeSlateToText } from '../utils/serializeSlateToText';

type CreateTaskFormOnSubmitFormatProps = {
  data: EventModalFormModel;
  users: ItemUserModel[];
  currentUserId: number;
  notes?: any;
  checklists?: any;
};

export const createEventFormOnSubmitFormat = ({
  data,
  users,
  currentUserId,
  notes,
  checklists,
}: CreateTaskFormOnSubmitFormatProps) => {
  // TODO change after add new pages

  const phone = data.phone ? (data.phone.length > 2 ? data.phone : '') : '';
  const eventTag = data.tag_id && data.tag_id !== TagsEnum.none ? tagsConfig[data.tag_id].tagId : null;
  const documents = data.documents.map((item: MediaType) => ({
    id: item.id,
  }));
  const moneyAction = data?.money_action?.value ? data?.money_action?.value : undefined;
  const notifyBefore =
    data.notify_before && data.notify_before !== ReminderTimeEnum.never_remind ? data.notify_before : null;
  const formatUsers = users.filter((item) => item.id !== currentUserId);
  const location =
    data?.physicalAddress?.address && data?.physicalAddress?.map
      ? {
          address: data.physicalAddress.address,
          map: data.physicalAddress.map,
        }
      : null;
  const startedAt = `${
    data.is_all_day
      ? Moment(
          `${Moment(data.start_date).format('MM/DD/YYYY')} ${Moment('12:00:00', 'HH:mm:ss').format(
            'HH:mm:ss',
          )}`,
        )
          .utc()
          .format('YYYY-MM-DD HH:mm:ss')
      : Moment(
          `${Moment(data.start_date).format('MM/DD/YYYY')} ${Moment(data.start_time).format('HH:mm:ss')}`,
        )
          .utc()
          .format('YYYY-MM-DD HH:mm:ss')
  }`;

  const finishedAt = `${
    data.is_all_day
      ? Moment(
          `${Moment(data.finish_date).format('MM/DD/YYYY')} ${Moment('12:10:00', 'HH:mm:ss').format(
            'HH:mm:ss',
          )}`,
        )
          .utc()
          .format('YYYY-MM-DD HH:mm:ss')
      : Moment(
          `${Moment(data.finish_date).format('MM/DD/YYYY')} ${Moment(data.finish_time).format('HH:mm:ss')}`,
        )
          .utc()
          .format('YYYY-MM-DD HH:mm:ss')
  } `;

  const description =
    serializeSlateToText(data.description).trim().length > 0 ? slateToHtml(data.description) : '';

  const recurringData = formatRecurringValue(data.recurring_pattern, startedAt || '');

  const submitData = {
    ...data,
    users: formatUsers,
    documents,
    description,
    phone,
    notes,
    checklists,
    notify_before: notifyBefore,
    tag_id: eventTag,
    started_at: startedAt,
    finished_at: finishedAt,
    role: data?.role?.value,
    type: data?.type?.value,
    location,
    money_action: moneyAction,
    title: data.title || i18next.t('general.header.newEvent'),
    ...recurringData,
  };

  delete submitData.start_date;
  delete submitData.start_time;
  delete submitData.finish_date;
  delete submitData.finish_time;

  return submitData;
};
