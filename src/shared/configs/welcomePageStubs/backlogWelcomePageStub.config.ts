import firstSlide from '../../../assets/Images/welcomePage/backlog/firstSlide.png';
import firstSlideMobile from '../../../assets/Images/welcomePage/backlog/firstSlideMobile.png';
import secondSlide from '../../../assets/Images/welcomePage/backlog/secondSlide.png';
import secondSlideMobile from '../../../assets/Images/welcomePage/backlog/secondSlideMobile.png';
import thirdSlide from '../../../assets/Images/welcomePage/backlog/thirdSlide.png';
import thirdSlideMobile from '../../../assets/Images/welcomePage/backlog/thirdSlideMobile.png';
import fourthSlide from '../../../assets/Images/welcomePage/backlog/fourthSlide.png';
import fourthSlideMobile from '../../../assets/Images/welcomePage/backlog/fourthSlideMobile.png';

import i18next from '../../locales/i18n';

import { ViewContainersEnum } from '../../enums/viewContainers.enum';

export const backlogWelcomePageStubConfig = {
  id: ViewContainersEnum.is_view_backlog,
  slides: [
    {
      title: i18next.t('stubs.welcomePage.backlog.fistSlide.title'),
      description: i18next.t('stubs.welcomePage.backlog.fistSlide.description'),
      imgDesktop: firstSlide,
      imgMobile: firstSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.backlog.secondSlide.title'),
      description: i18next.t('stubs.welcomePage.backlog.secondSlide.description'),
      imgDesktop: secondSlide,
      imgMobile: secondSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.backlog.thirdSlide.title'),
      description: i18next.t('stubs.welcomePage.backlog.thirdSlide.description'),
      imgDesktop: thirdSlide,
      imgMobile: thirdSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.backlog.fourthSlide.title'),
      description: i18next.t('stubs.welcomePage.backlog.fourthSlide.description'),
      imgDesktop: fourthSlide,
      imgMobile: fourthSlideMobile,
    },
  ],
};
