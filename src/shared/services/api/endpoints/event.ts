import axios from 'axios';
import { PlannerItemStatusesEnum } from '../../../enums/plannerItemStatuses.enum';
import { CreateEventFromPayloadModel } from '../../../models/event/createEventFormPayload.model';
import { EventItemModel } from '../../../models/event/eventItem.model';
import { GetEventsDataResponseModel } from '../../../models/event/getEventsDataResponse.model';
import { EventsFilters } from '../../../../store/events/eventsSlice';
import { AssignPeopleSelectValueModel } from '../../../models/assignPeopleSelectValue.model';

const eventEndpoints = {
  createEvent: (params: CreateEventFromPayloadModel): Promise<EventItemModel> =>
    axios.post('/planner/events', params),
  updateEvent: (
    params: CreateEventFromPayloadModel,
    eventId: number,
    confirmation_status?: string,
  ): Promise<EventItemModel> => axios.put(`/planner/events/${eventId}`, { ...params, confirmation_status }),
  removeMyself: (params: { eventId: number; confirmation_status?: string }): Promise<number> =>
    axios.delete(`planner/events/${params.eventId}/self`, { params }),
  archiveEvent: (params: {
    eventId: number;
    confirmation_status?: string;
    is_full: boolean;
  }): Promise<number> => axios.post(`planner/events/${params.eventId}/archive`, params),
  unArchiveEvent: (params: {
    eventId: number;
    confirmation_status?: string;
    is_full: boolean;
  }): Promise<number> => axios.post(`planner/events/${params.eventId}/unarchive`, params),
  getEvent: (params: { eventId: number; is_list?: number }): Promise<EventItemModel> =>
    axios.get(`/planner/events/${params.eventId}`, { params }),
  deleteEvent: (params: { eventId: number; confirmation_status?: string }): Promise<number> =>
    axios.delete(`/planner/events/${params.eventId}`, { params }),
  changeStatus: (params: {
    eventId: number;
    status: PlannerItemStatusesEnum;
    is_common?: boolean;
    confirmation_status?: string;
  }): Promise<EventItemModel> => axios.post(`planner/events/${params.eventId}/status`, params),
  getEventsData: (
    params: EventsFilters & { page?: number; status?: PlannerItemStatusesEnum },
  ): Promise<GetEventsDataResponseModel> => axios.get('/planner/events', { params }),
  updateUsersEvent: (params: {
    users: AssignPeopleSelectValueModel[];
    eventId: number;
  }): Promise<EventItemModel> => axios.put(`planner/events/${params.eventId}/users`, params),
};

export default eventEndpoints;
