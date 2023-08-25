import { TFunction } from 'i18next';
import { ReactComponent as FinanceIcon } from '../../../assets/Images/onboarding/finances.svg';
import { ReactComponent as PetsIcon } from '../../../assets/Images/onboarding/pets.svg';
import { ReactComponent as HealsIcon } from '../../../assets/Images/onboarding/health.svg';
import { ReactComponent as WorkIcon } from '../../../assets/Images/onboarding/work.svg';
import { ReactComponent as HomeIcon } from '../../../assets/Images/onboarding/home.svg';
import { ReactComponent as StudiesIcon } from '../../../assets/Images/onboarding/studies.svg';
import { ReactComponent as CarIcon } from '../../../assets/Images/onboarding/car.svg';
import { ReactComponent as HabitsIcon } from '../../../assets/Images/onboarding/habits.svg';
import { ReactComponent as ChildStuffIcon } from '../../../assets/Images/onboarding/childStuffIcon.svg';

import { ChecklistsEnum } from '../../enums/onboarding/checklists.enum';

type CheckListItemType = {
  key: ChecklistsEnum;
  label: string;
  icon: JSX.Element;
  isStroke?: boolean;
};

export const getCheckListLeftConfig = (t: TFunction): CheckListItemType[] => [
  {
    icon: <ChildStuffIcon />,
    isStroke: true,

    label: t('onboarding.fifthSlide.selectors.kids'),
    key: ChecklistsEnum.kids_stuff,
  },
  {
    icon: <FinanceIcon />,
    isStroke: true,

    label: t('onboarding.fifthSlide.selectors.finances'),
    key: ChecklistsEnum.finances,
  },
  {
    icon: <PetsIcon />,
    isStroke: true,

    label: t('onboarding.fifthSlide.selectors.pets'),
    key: ChecklistsEnum.pets_stuff,
  },
  {
    icon: <StudiesIcon />,
    isStroke: true,
    label: t('onboarding.fifthSlide.selectors.studies'),
    key: ChecklistsEnum.studies,
  },
  {
    icon: <HealsIcon />,
    isStroke: true,

    label: t('onboarding.fifthSlide.selectors.health'),
    key: ChecklistsEnum.health,
  },
];

export const getCheckListRightConfig = (t: TFunction): CheckListItemType[] => [
  {
    icon: <WorkIcon />,
    isStroke: true,

    label: t('onboarding.fifthSlide.selectors.work'),
    key: ChecklistsEnum.work,
  },
  {
    icon: <HomeIcon />,
    isStroke: true,
    label: t('onboarding.fifthSlide.selectors.home'),
    key: ChecklistsEnum.home_stuff,
  },
  {
    icon: <CarIcon />,
    isStroke: true,

    label: t('onboarding.fifthSlide.selectors.vehicle'),
    key: ChecklistsEnum.car_stuff,
  },
  {
    icon: <HabitsIcon />,
    isStroke: true,

    label: t('onboarding.fifthSlide.selectors.habits'),
    key: ChecklistsEnum.habits,
  },
];
