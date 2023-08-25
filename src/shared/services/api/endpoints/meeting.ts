import axios from 'axios';
import { PlannerItemStatusesEnum } from '../../../enums/plannerItemStatuses.enum';
import { CreateMeetingFormPayloadModel } from '../../../models/meeting/createMeetingFormPayload.model';
import { MeetingModel } from '../../../models/meeting/meeting.model';

const meetingEndpoints = {
  createMeeting: (params: CreateMeetingFormPayloadModel): Promise<MeetingModel> =>
    axios.post('/planner/meets', params),
  getMeeting: (params: { meetingId: number; is_list?: number }): Promise<MeetingModel> =>
    axios.get(`/planner/meets/${params.meetingId}`, { params }),
  updateMeeting: (
    params: CreateMeetingFormPayloadModel,
    meetingId: number,
    confirmation_status?: string,
  ): Promise<MeetingModel> => axios.put(`/planner/meets/${meetingId}`, { ...params, confirmation_status }),
  deleteMeeting: (params: { meetingId: number; confirmation_status?: string }): Promise<number> =>
    axios.delete(`/planner/meets/${params.meetingId}`, { params }),
  removeMyself: (params: { meetingId: number; confirmation_status?: string }): Promise<number> =>
    axios.delete(`planner/meets/${params.meetingId}/self`, { params }),
  archiveMeeting: (params: {
    meetingId: number;
    confirmation_status?: string;
    is_full: boolean;
  }): Promise<number> => axios.post(`planner/meets/${params.meetingId}/archive`, params),
  unArchiveMeeting: (params: {
    meetingId: number;
    confirmation_status?: string;
    is_full: boolean;
  }): Promise<number> => axios.post(`planner/meets/${params.meetingId}/unarchive`, params),
  changeStatus: (params: {
    meetingId: number;
    status: PlannerItemStatusesEnum;
    is_common?: boolean;
    confirmation_status?: string;
  }): Promise<MeetingModel> => axios.post(`planner/meets/${params.meetingId}/status`, params),
};

export default meetingEndpoints;
