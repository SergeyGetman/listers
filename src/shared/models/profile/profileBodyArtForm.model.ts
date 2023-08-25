import { BodyArtTypeEnum } from '../../enums/bodyArtType.enum';

export interface ProfileBodyArtFormModel {
  title: string;
  country: string;
  type: BodyArtTypeEnum;
  email: string;
  phone: string;
  artist: string;
  price: string;
  salon: string;
  location?: { address?: string; map?: { lat: number; lng: number } } | null;
  documents: { id: number }[];
  photos: { id: number }[];
}
