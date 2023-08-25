import { TFunction } from 'i18next';
import { ToolsEnum } from '../../enums/onboarding/tools.enum';

type ToolsItemType = {
  key: ToolsEnum;
  label: string;
};

export const getToolsLeftConfig = (t: TFunction): ToolsItemType[] => [
  { label: t('onboarding.sixthSlide.selectors.deadlines'), key: ToolsEnum.deadlines },
  { label: t('onboarding.sixthSlide.selectors.meetings'), key: ToolsEnum.meetings },
  { label: t('onboarding.sixthSlide.selectors.appointments'), key: ToolsEnum.appointment },
  { label: t('onboarding.sixthSlide.selectors.events'), key: ToolsEnum.events },
  { label: t('onboarding.sixthSlide.selectors.reminders'), key: ToolsEnum.reminders },
];

export const getToolsRightConfig = (t: TFunction): ToolsItemType[] => [
  { label: t('onboarding.sixthSlide.selectors.tasks'), key: ToolsEnum.tasks },
  { label: t('onboarding.sixthSlide.selectors.checklists'), key: ToolsEnum.checklists },
  { label: t('onboarding.sixthSlide.selectors.payments'), key: ToolsEnum.payments },
  { label: t('onboarding.sixthSlide.selectors.notes'), key: ToolsEnum.notes },
];
