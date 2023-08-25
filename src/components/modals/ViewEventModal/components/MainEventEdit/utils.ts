import Moment from 'moment/moment';
import { htmlToSlate } from 'slate-serializers';
import { parsePhoneNumber } from 'react-phone-number-input';
import { tagsConfig } from '../../../../../shared/configs/tags.config';
import { TagsEnum } from '../../../../../shared/enums/tags.enum';
import { ReminderTimeEnum } from '../../../../../shared/enums/reminderTime.enum';
import { EventTypeConfig } from '../../../../../shared/configs/eventType.config';
import { RecurringTypeEnum } from '../../../../../shared/enums/recurringType.enum';
import { EventItemModel } from '../../../../../shared/models/event/eventItem.model';
import { MoneyActionConfig } from '../../../../../shared/configs/moneyEction.config';

export const getInitialValue = (event: EventItemModel) => {
  return {
    documents: event.documents,
    title: event?.title,
    tag_id: event?.tags[0]?.name ? tagsConfig[event?.tags[0].name || TagsEnum.none]?.id : TagsEnum.none,
    fee: event?.fee,
    money_action: event.current_user?.money_action
      ? MoneyActionConfig[event.current_user?.money_action]
      : undefined,
    notify_before: event?.notify_before ? event?.notify_before : ReminderTimeEnum.never_remind,
    is_all_day: event?.is_all_day,
    start_date: event?.started_at ? Moment.utc(event?.started_at).local() : null,
    start_time: event?.started_at ? (event?.is_all_day ? null : Moment.utc(event?.started_at).local()) : null,
    description: event?.description
      ? htmlToSlate(event.description)
      : [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
    finish_date: event?.finished_at ? Moment.utc(event?.finished_at).local() : null,
    finish_time: event?.finished_at
      ? event?.is_all_day
        ? null
        : Moment.utc(event.finished_at).local()
      : null,
    physicalAddress: event?.location?.address ? event.location : undefined,
    meeting_id: event?.meeting_id ? event?.meeting_id : '',
    type: event.type ? EventTypeConfig[event.type] : undefined,
    site: event?.site ? event?.site : '',
    login: event?.login ? event?.login : '',
    country: event?.country ? event?.country : parsePhoneNumber(event?.phone || 'US')?.country,
    phone: event?.phone,
    password: event?.password ? event?.password : '',
    is_recurring: event?.is_recurring,
    recurring_pattern: {
      frequency_type: event?.recurring_pattern?.frequency_type
        ? event?.recurring_pattern?.frequency_type
        : RecurringTypeEnum.NONE,
      end_date: event?.recurring_pattern?.end_date ? Moment(event?.recurring_pattern?.end_date) : null,
      is_endless: event?.recurring_pattern?.is_endless,
      recurring_type: event?.recurring_pattern?.recurring_type
        ? event?.recurring_pattern?.recurring_type
        : null,
      repeat_by_days: event?.recurring_pattern?.repeat_by_days
        ? event?.recurring_pattern?.repeat_by_days
        : [],
      repeat_by_months: null,
      repeat_interval: event?.recurring_pattern?.repeat_interval
        ? event?.recurring_pattern?.repeat_interval
        : 1,
      start_date: event?.recurring_pattern?.start_date
        ? Moment(event?.recurring_pattern?.start_date).format('DD')
        : null,
    },
    role: undefined,
  };
};
