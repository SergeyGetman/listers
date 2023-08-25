import Moment from 'moment';
import { PlannerItemModelTypeEnum } from '../enums/plannerItemModelType.enum';
import { AssignPeoplePermissionsEnum } from '../enums/assignPeoplePermissions.enum';
import theme from '../../theme/theme';

export const reformatCalendarItem = (item: any, isStarterPackage: boolean) => {
  if (item.model_type === PlannerItemModelTypeEnum.event) {
    return {
      color: theme.palette.case.warning.middle,
      start: Moment.utc(item?.started_at, 'YYYY-MM-DD HH:mm:ss').local().format(),
      end: Moment.utc(item?.finished_at, 'YYYY-MM-DD HH:mm:ss').local().format(),
      title: item?.title,
      allDay: item?.is_all_day,
      userNotification: item?.userNotification,
      id: item?.id,
      is_all_day: item.is_all_day,
      model_type: item?.model_type,
      current_user: item?.current_user,
      finished_at: item?.finished_at,
      started_at: item?.started_at,
      type: item?.type,
      site: item?.site,
      location: item?.location,
      phone: item?.phone,
      is_recurring: item?.is_recurring,
      description: item?.description,
      editable:
        (item?.current_user?.role === AssignPeoplePermissionsEnum.editor ||
          item?.current_user?.role === AssignPeoplePermissionsEnum.creator) &&
        !isStarterPackage &&
        !item?.userNotification,
    };
  }

  if (item.model_type === PlannerItemModelTypeEnum.task) {
    return {
      color: theme.palette.case.main.purple.high,
      start: Moment.utc(item?.started_at, 'YYYY-MM-DD HH:mm:ss').local().format(),
      end: Moment.utc(item?.finished_at, 'YYYY-MM-DD HH:mm:ss').local().format(),
      title: item?.title,
      allDay: item?.is_all_day,
      userNotification: item?.userNotification,
      id: item?.id,
      is_all_day: item.is_all_day,
      model_type: item?.model_type,
      due_dated_at: item?.due_dated_at,
      is_all_day_due_date: item.is_all_day_due_date,
      started_at: item?.started_at,
      finished_at: item?.finished_at,
      current_user: item?.current_user,
      is_recurring: item?.is_recurring,
      site: item?.site,
      location: item?.location,
      usersLength: item?.users?.length,
      description: item?.description,
      editable:
        (item?.current_user?.role === AssignPeoplePermissionsEnum.editor ||
          item?.current_user?.role === AssignPeoplePermissionsEnum.creator) &&
        !isStarterPackage &&
        !item?.userNotification,
      is_same: item.is_same,
    };
  }
  if (item.model_type === PlannerItemModelTypeEnum.payment) {
    return {
      color: theme.palette.primary.main,
      start: Moment.utc(item?.started_at, 'YYYY-MM-DD HH:mm:ss').local().format(),
      end: Moment.utc(item?.finished_at, 'YYYY-MM-DD HH:mm:ss').local().format(),
      title: item?.title,
      allDay: item?.is_all_day,
      userNotification: item?.userNotification,
      id: item?.id,
      is_all_day: item.is_all_day,
      model_type: item?.model_type,
      current_user: item?.current_user,
      due_dated_at: item?.due_dated_at,
      finished_at: item?.finished_at,
      started_at: item?.started_at,
      description: item?.description,
      amount: item?.amount || item.item?.amount,
      editable:
        (item?.current_user?.role === AssignPeoplePermissionsEnum.editor ||
          item?.current_user?.role === AssignPeoplePermissionsEnum.creator) &&
        !isStarterPackage,
    };
  }
  return item;
};
