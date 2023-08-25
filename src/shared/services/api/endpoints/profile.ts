import axios from 'axios';
import { ProfileModel } from '../../../models/profile/profile.model';
import { HubModel } from '../../../models/hub.model';
import { ProfileSettingsModel } from '../../../models/profile/profileSettings.model';
import { GeneralSettingsFormModel } from '../../../models/profile/generalSettingsForm.model';
import { ItemUserModel } from '../../../models/itemUser.model';
import { ProfileGeneralInfoFormModel } from '../../../models/profile/profileGeneralInfoForm.model';
import { ProfileAppearanceFormModel } from '../../../models/profile/profileAppearanceForm.model';
import { ProfileContactsFormModel } from '../../../models/profile/profileContactsForm.model';
import { ProfileBodyArtFormModel } from '../../../models/profile/profileBodyArtForm.model';
import { FeedBackFormType } from '../../../../pages/Feedback/components/FeedbackRateUs/FeedbackRateUs';
import { UserFullNameModalPayload } from '../../../../components/modals/UserFullNameModal/components/UserFullNameModalContainer/UserFullNameModalContainer';

const profileEndpoints = {
  getProfile: (): Promise<ProfileModel> => axios.get('/profile'),
  changeProfileTimezone: (data: { timezone_name: string }): Promise<undefined> =>
    axios.put('/profile/timezone', data),
  getConnections: (): Promise<ItemUserModel[]> => axios.get('/task/connections'),
  deleteProfile: (data: { password: string | null }): Promise<undefined> =>
    axios.delete(`/profile?password=${data.password}`),
  setDeviceToken: (data: { push_token: string; platform: string }): Promise<undefined> =>
    axios.post('/device/tokens', data),
  updateProfileGeneralInfo: (data: ProfileGeneralInfoFormModel): Promise<ProfileModel> =>
    axios.put('/profile/general-info', data),
  updateProfileSidebarItemPosition: (data: any): Promise<ProfileModel> =>
    axios.put(`/sidebar/hubs/${data.hubsId}`, data),
  updateProfileFullName: (data: UserFullNameModalPayload): Promise<ProfileModel> =>
    axios.put('/profile/general-info', data),
  createProfileBodyArt: (data: ProfileBodyArtFormModel): Promise<ProfileModel> =>
    axios.post('/body-arts', data),
  setViewDataItem: (data: { entity: string }): Promise<undefined> => axios.post('/profile/view-data', data),
  updateProfileBodyArt: (data: { id: number } & ProfileBodyArtFormModel): Promise<ProfileModel> =>
    axios.put(`/body-arts/${data.id}`, data),
  deleteProfileBodyArt: (data: { id: number }): Promise<undefined> => axios.delete(`/body-arts/${data.id}`),
  updateProfileContacts: (data: ProfileContactsFormModel): Promise<ProfileModel> =>
    axios.put('/contacts', data),
  updateProfileAppearance: (data: ProfileAppearanceFormModel): Promise<ProfileModel> =>
    axios.put('/appearance', data),
  changeLoginData: (data: GeneralSettingsFormModel): Promise<ProfileSettingsModel> =>
    axios.put('/v1/profile/login-data', data),
  getSettingsProfile: (): Promise<ProfileSettingsModel> => axios.get('/profile/settings'),
  getFullProfile: (): Promise<ProfileSettingsModel> => axios.get('/profile/full'),
  activateHub: (hubId: number): Promise<HubModel> => axios.post(`/packages/hubs/${hubId}`),
  deactivateHub: (hubId: number): Promise<HubModel> => axios.delete(`/packages/hubs/${hubId}`),
  updateFeedsCounter: (): Promise<{
    count_news: number;
    count_requests: number;
    count_notification: number;
  }> => axios.get('/requests/counters'),
  feedback: (data: FeedBackFormType & { documents: { id: number }[] }): Promise<undefined> =>
    axios.post(`/feedback`, data),
  getProfileSettings: (): Promise<any> => axios.get('/settings/permission'),
  setProfileSettings: (data: any): Promise<any> => axios.post('/settings/permission', data),
};

export default profileEndpoints;
