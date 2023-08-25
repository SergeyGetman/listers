import axios from 'axios';
import { CalendarFiltersType } from '../../../../store/calendar/calendarSlice';
import { EventItemModel } from '../../../models/event/eventItem.model';
import { TaskItemModel } from '../../../models/tasks/taskItem.model';

const calendarEndpoint = {
  getCalendarData: (
    params: { started_at: string; finished_at: string } & CalendarFiltersType,
  ): Promise<TaskItemModel[] | EventItemModel[]> => axios.get(`/planner/calendar/items`, { params }),
  getCalendarDates: (
    params: { start_date: string; finish_date: string } & CalendarFiltersType,
  ): Promise<string[]> => axios.get(`/planner/calendar/dates`, { params }),
  changeTaskDate: (
    params: { is_all_day: boolean; started_at: string; finished_at: string; confirmation_status?: string },
    taskId: number,
  ): Promise<TaskItemModel> => axios.put(`/planner/tasks/${taskId}/date`, params),
  changeEventDate: (
    params: { is_all_day: boolean; started_at: string; finished_at: string; confirmation_status?: string },
    eventId: number,
  ): Promise<EventItemModel> => axios.put(`/planner/events/${eventId}/date`, params),
  changeCalendarItemDate: (
    params: { is_all_day: boolean; started_at: string; finished_at: string; confirmation_status?: string },
    itemId: number,
  ): Promise<EventItemModel> => axios.put(`/planner/calendar/items/${itemId}/date`, params),
};

export default calendarEndpoint;
