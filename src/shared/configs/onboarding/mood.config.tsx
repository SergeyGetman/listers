import React from 'react';
import { TFunction } from 'i18next';
import { ReactComponent as HappyMoodIcon } from '../../../assets/Images/onboarding/happyMood.svg';
import { ReactComponent as ExitedMoodIcon } from '../../../assets/Images/onboarding/exitedMood.svg';
import { ReactComponent as TiredMoodIcon } from '../../../assets/Images/onboarding/tiredMood.svg';
import { ReactComponent as SadMoodIcon } from '../../../assets/Images/onboarding/sadMood.svg';
import { ReactComponent as LazyMoodIcon } from '../../../assets/Images/onboarding/lazyMood.svg';
import { ReactComponent as AngryMoodIcon } from '../../../assets/Images/onboarding/angryMood.svg';
import { MoodEnum } from '../../enums/onboarding/mood.enum';

type MoodItemType = {
  key: MoodEnum;
  label: string;
  icon: JSX.Element;
};

export const getMoodConfig = (t: TFunction): MoodItemType[] => [
  {
    icon: <HappyMoodIcon />,
    label: t('onboarding.fistStep.selectors.happy'),
    key: MoodEnum.happy,
  },
  {
    icon: <SadMoodIcon />,
    label: t('onboarding.fistStep.selectors.sad'),
    key: MoodEnum.sad,
  },
  {
    icon: <ExitedMoodIcon />,
    label: t('onboarding.fistStep.selectors.excited'),
    key: MoodEnum.excited,
  },
  {
    icon: <LazyMoodIcon />,
    label: t('onboarding.fistStep.selectors.lazy'),
    key: MoodEnum.lazy,
  },
  {
    icon: <TiredMoodIcon />,
    label: t('onboarding.fistStep.selectors.tired'),
    key: MoodEnum.tired,
  },
  {
    icon: <AngryMoodIcon />,
    label: t('onboarding.fistStep.selectors.angry'),
    key: MoodEnum.angry,
  },
];
