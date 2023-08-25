import firstSlide from '../../../assets/Images/welcomePage/archive/firstSlide.png';
import firstSlideMobile from '../../../assets/Images/welcomePage/archive/firstSlideMobile.png';
import secondSlide from '../../../assets/Images/welcomePage/archive/secondSlide.png';
import secondSlideMobile from '../../../assets/Images/welcomePage/archive/secondSlideMobile.png';
import thirdSlide from '../../../assets/Images/welcomePage/archive/thirdSlide.png';
import thirdSlideMobile from '../../../assets/Images/welcomePage/archive/thirdSlideMobile.png';

import i18next from '../../locales/i18n';

import { ViewContainersEnum } from '../../enums/viewContainers.enum';

export const archiveWelcomePageStubConfig = {
  id: ViewContainersEnum.is_view_archive,
  slides: [
    {
      title: i18next.t('stubs.welcomePage.archive.fistSlide.title'),
      description: i18next.t('stubs.welcomePage.archive.fistSlide.description'),
      imgDesktop: firstSlide,
      imgMobile: firstSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.archive.secondSlide.title'),
      description: i18next.t('stubs.welcomePage.archive.secondSlide.description'),
      imgDesktop: secondSlide,
      imgMobile: secondSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.archive.thirdSlide.title'),
      description: i18next.t('stubs.welcomePage.archive.thirdSlide.description'),
      imgDesktop: thirdSlide,
      imgMobile: thirdSlideMobile,
    },
  ],
};
