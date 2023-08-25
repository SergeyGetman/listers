import axios from 'axios';

import { ItemUserModel } from '../../../models/itemUser.model';

const getProgressLoaded = (total: number, loaded: number) => {
  return Math.round((loaded / total) * 100);
};

const commonEndpoints = {
  fileDownload: (token: string): Promise<Blob> =>
    axios.get(`/media/documents/${token}/download`, { responseType: 'blob' }),
  photoDownload: (token: string): Promise<Blob> =>
    axios.get(`/media/photos/${token}/download`, { responseType: 'blob' }),
  uploadFile: (file: FormData, handleChangeProgress: (progress: number) => void) =>
    axios.post('/media/documents', file, {
      onUploadProgress: (progressEvent) =>
        handleChangeProgress(getProgressLoaded(progressEvent.total, progressEvent.loaded)),
    }),
  uploadPhoto: (data: FormData, handleChangeProgress: (progress: number) => void) =>
    axios.post('/media/photos', data, {
      onUploadProgress: (progressEvent) =>
        handleChangeProgress(getProgressLoaded(progressEvent.total, progressEvent.loaded)),
    }),
  deleteMedia: (token: string) => axios.delete(`/media/photos/${token}`),
  getFriends: (): Promise<ItemUserModel[]> => axios.get('/network/friends'),
};

export default commonEndpoints;
