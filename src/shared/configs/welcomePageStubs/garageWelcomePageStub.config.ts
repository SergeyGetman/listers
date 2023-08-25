import firstSlide from '../../../assets/Images/welcomePage/garage/firstSlide.png';
import firstSlideMobile from '../../../assets/Images/welcomePage/garage/firstSlideMobile.png';
import secondSlide from '../../../assets/Images/welcomePage/garage/secondSlide.png';
import secondMobile from '../../../assets/Images/welcomePage/garage/secondSlideMobile.png';
import thirdSlide from '../../../assets/Images/welcomePage/garage/thirdSlide.png';
import thirdSlideMobile from '../../../assets/Images/welcomePage/garage/thirdSlideMobile.png';
import fourthSlide from '../../../assets/Images/welcomePage/garage/fourthSlide.png';
import fourthSlideMobile from '../../../assets/Images/welcomePage/garage/fourthSlideMobile.png';
import fifthSlide from '../../../assets/Images/welcomePage/garage/fifthSlide.png';
import fifthSlideMobile from '../../../assets/Images/welcomePage/garage/fifthSlideMobile.png';
import sixthSlide from '../../../assets/Images/welcomePage/garage/sixthSlide.png';
import sixthSlideMobile from '../../../assets/Images/welcomePage/garage/sixthSlideMobile.png';

import i18next from '../../locales/i18n';

import { ViewContainersEnum } from '../../enums/viewContainers.enum';

export const garageWelcomePageStubConfig = {
  id: ViewContainersEnum.is_view_garage,
  slides: [
    {
      title: i18next.t('stubs.welcomePage.garage.fistSlide.title'),
      description: i18next.t('stubs.welcomePage.garage.fistSlide.description'),
      imgDesktop: firstSlide,
      imgMobile: firstSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.garage.secondSlide.title'),
      description: i18next.t('stubs.welcomePage.garage.secondSlide.description'),
      imgDesktop: secondSlide,
      imgMobile: secondMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.garage.thirdSlide.title'),
      description: i18next.t('stubs.welcomePage.garage.thirdSlide.description'),
      imgDesktop: thirdSlide,
      imgMobile: thirdSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.garage.fourthSlide.title'),
      description: i18next.t('stubs.welcomePage.garage.fourthSlide.description'),
      imgDesktop: fourthSlide,
      imgMobile: fourthSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.garage.fifthSlide.title'),
      description: i18next.t('stubs.welcomePage.garage.fifthSlide.description'),
      imgDesktop: fifthSlide,
      imgMobile: fifthSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.garage.sixthSlide.title'),
      description: i18next.t('stubs.welcomePage.garage.sixthSlide.description'),
      imgDesktop: sixthSlide,
      imgMobile: sixthSlideMobile,
    },
  ],
};
