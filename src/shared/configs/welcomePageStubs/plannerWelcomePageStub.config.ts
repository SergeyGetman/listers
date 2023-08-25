import firstSlide from '../../../assets/Images/welcomePage/planner/firstSlide.png';
import firstSlideMobile from '../../../assets/Images/welcomePage/planner/firstSlideMobile.png';
import secondSlide from '../../../assets/Images/welcomePage/planner/secondSlide.png';
import secondMobile from '../../../assets/Images/welcomePage/planner/secondSlideMobile.png';
import thirdSlide from '../../../assets/Images/welcomePage/planner/thirdSlide.png';
import thirdSlideMobile from '../../../assets/Images/welcomePage/planner/thirdSlideMobile.png';

import i18next from '../../locales/i18n';

import { ViewContainersEnum } from '../../enums/viewContainers.enum';

export const plannerWelcomePageStubConfig = {
  id: ViewContainersEnum.is_view_journal,
  slides: [
    {
      title: i18next.t('stubs.welcomePage.planner.fistSlide.title'),
      description: i18next.t('stubs.welcomePage.planner.fistSlide.description'),
      imgDesktop: firstSlide,
      imgMobile: firstSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.planner.secondSlide.title'),
      description: i18next.t('stubs.welcomePage.planner.secondSlide.description'),
      imgDesktop: secondSlide,
      imgMobile: secondMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.planner.thirdSlide.title'),
      description: i18next.t('stubs.welcomePage.planner.thirdSlide.description'),
      imgDesktop: thirdSlide,
      imgMobile: thirdSlideMobile,
    },
  ],
};
