import { MoodEnum } from '../enums/onboarding/mood.enum';
import { GenderEnum } from '../enums/gender.enum';
import { RelationShipEnum } from '../enums/onboarding/relationShip.enum';
import { ChecklistsEnum } from '../enums/onboarding/checklists.enum';
import { ToolsEnum } from '../enums/onboarding/tools.enum';

export type OnboardingModel = {
  feel: MoodEnum[];
  gender: GenderEnum[];
  birthday: string[];
  relationship: RelationShipEnum[];
  checklist: ChecklistsEnum[];
  tools: ToolsEnum[];
  summarizing: string[];
  package: string[];
  welcome_to_hubmee: string[];
};

export type OnboardingSaveModel = {
  key: string;
  answers: {
    text: string;
  }[];
};
