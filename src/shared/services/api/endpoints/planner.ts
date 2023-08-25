import axios from 'axios';
import { EventItemModel } from '../../../models/event/eventItem.model';
import { PlannerFiltersType } from '../../../../store/planner/plannerSlice';
import { CalendarFiltersType } from '../../../../store/calendar/calendarSlice';

const plannerEndpoint = {
  getPlannerMinMaxDate: (params: PlannerFiltersType): Promise<{ finished_at: string; started_at: string }> =>
    axios.get(`/planner/calendar/info`, { params }),
  getPlannerDates: (
    params: { start_date: string; finish_date: string } & PlannerFiltersType,
  ): Promise<string[]> => axios.get(`/planner/calendar/dates`, { params }),
  getPlannerItemsByData: (
    params: { started_at: string; finished_at: string } & CalendarFiltersType,
  ): Promise<any> => axios.get(`/planner/calendar/items`, { params }),
  changeEventDate: (
    params: { is_all_day: boolean; started_at: string; finished_at: string },
    eventId: number,
  ): Promise<EventItemModel> => axios.put(`/planner/events/${eventId}/date`, params),
};

export default plannerEndpoint;
