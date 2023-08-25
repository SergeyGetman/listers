import Moment from 'moment/moment';
import { htmlToSlate } from 'slate-serializers';
import { parsePhoneNumber } from 'react-phone-number-input';
import { DurationTimeConfig } from '../../../../../shared/configs/selectors/durationConfig';
import { tagsConfig } from '../../../../../shared/configs/tags.config';
import { TagsEnum } from '../../../../../shared/enums/tags.enum';
import { ReminderTimeEnum } from '../../../../../shared/enums/reminderTime.enum';
import { EventTypeConfig } from '../../../../../shared/configs/eventType.config';
import { RecurringTypeEnum } from '../../../../../shared/enums/recurringType.enum';
import { MeetingModel } from '../../../../../shared/models/meeting/meeting.model';

export const getInitialValue = (item: MeetingModel) => {
  return {
    documents: item.documents,
    title: item?.title,
    duration: item?.duration ? DurationTimeConfig[item.duration] : undefined,
    tag_id: item?.tags[0]?.name ? tagsConfig[item.tags[0].name || TagsEnum.none].id : TagsEnum.none,
    notify_before: item?.notify_before ? item.notify_before : ReminderTimeEnum.never_remind,
    is_all_day: item?.is_all_day,
    start_date: item?.started_at ? Moment.utc(item.started_at).local() : null,
    start_time: item?.started_at ? (item.is_all_day ? null : Moment.utc(item.started_at).local()) : null,
    description: item?.description
      ? htmlToSlate(item.description)
      : [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
    physicalAddress: item?.location?.address ? item.location : undefined,
    type: item.type ? EventTypeConfig[item.type] : undefined,
    site: item?.site,
    country: item?.country ? item.country : parsePhoneNumber(item?.phone || 'US')?.country,
    phone: item?.phone,
    is_recurring: item?.is_recurring,
    recurring_pattern: {
      frequency_type: item?.recurring_pattern?.frequency_type
        ? item.recurring_pattern.frequency_type
        : RecurringTypeEnum.NONE,
      end_date: item?.recurring_pattern?.end_date ? Moment(item.recurring_pattern.end_date) : null,
      is_endless: item?.recurring_pattern?.is_endless,
      recurring_type: item?.recurring_pattern?.recurring_type
        ? item?.recurring_pattern?.recurring_type
        : RecurringTypeEnum.DAILY,
      repeat_by_days: item?.recurring_pattern?.repeat_by_days ? item.recurring_pattern.repeat_by_days : [],
      repeat_by_months: null,
      repeat_interval: item?.recurring_pattern?.repeat_interval ? item.recurring_pattern.repeat_interval : 1,
      start_date: item?.recurring_pattern?.start_date
        ? Moment(item.recurring_pattern.start_date).format('DD')
        : null,
    },
  };
};
