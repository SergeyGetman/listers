import { MediaType } from '../media.model';

export type CommentsFormPayloadModel = {
  documents: MediaType[];
  body: string;
};
