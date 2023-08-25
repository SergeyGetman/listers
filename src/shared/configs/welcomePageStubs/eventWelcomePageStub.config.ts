import firstSlide from '../../../assets/Images/welcomePage/events/firstSlide.png';
import firstSlideMobile from '../../../assets/Images/welcomePage/events/firstSlideMobile.png';
import secondSlide from '../../../assets/Images/welcomePage/events/secondSlide.png';
import secondMobile from '../../../assets/Images/welcomePage/events/secondSlideMobile.png';
import thirdSlide from '../../../assets/Images/welcomePage/events/thirdSlide.png';
import thirdSlideMobile from '../../../assets/Images/welcomePage/events/thirdSlideMobile.png';
import fourthSlide from '../../../assets/Images/welcomePage/events/fourthSlide.png';
import fourthSlideMobile from '../../../assets/Images/welcomePage/events/fourthSlideMobile.png';
import fifthSlide from '../../../assets/Images/welcomePage/events/fifthSlide.png';
import fifthSlideMobile from '../../../assets/Images/welcomePage/events/fifthSlideMobile.png';

import i18next from '../../locales/i18n';

import { ViewContainersEnum } from '../../enums/viewContainers.enum';

export const eventsWelcomePageStubConfig = {
  id: ViewContainersEnum.is_view_events,
  slides: [
    {
      title: i18next.t('stubs.welcomePage.events.fistSlide.title'),
      description: i18next.t('stubs.welcomePage.events.fistSlide.description'),
      imgDesktop: firstSlide,
      imgMobile: firstSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.events.secondSlide.title'),
      description: i18next.t('stubs.welcomePage.events.secondSlide.description'),
      imgDesktop: secondSlide,
      imgMobile: secondMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.events.thirdSlide.title'),
      description: i18next.t('stubs.welcomePage.events.thirdSlide.description'),
      imgDesktop: thirdSlide,
      imgMobile: thirdSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.events.fourthSlide.title'),
      description: i18next.t('stubs.welcomePage.events.fourthSlide.description'),
      imgDesktop: fourthSlide,
      imgMobile: fourthSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.events.fifthSlide.title'),
      description: i18next.t('stubs.welcomePage.events.fifthSlide.description'),
      imgDesktop: fifthSlide,
      imgMobile: fifthSlideMobile,
    },
  ],
};
