import { RelationshipEnum } from '../../enums/relationship.enum';
import { GenderEnum } from '../../enums/gender.enum';

export interface ProfileGeneralInfoFormModel {
  first_name: string;
  last_name: string;
  middle_name: string;
  birth_day: string;
  gender: GenderEnum;
  relationship_status?: RelationshipEnum;
  documents: { id: number }[];
}
