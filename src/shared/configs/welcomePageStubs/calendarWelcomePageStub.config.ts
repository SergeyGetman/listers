import firstSlide from '../../../assets/Images/welcomePage/calendar/firstSlide.png';
import firstSlideMobile from '../../../assets/Images/welcomePage/calendar/firstSlideMobile.png';
import secondSlide from '../../../assets/Images/welcomePage/calendar/secondSlide.png';
import secondSlideMobile from '../../../assets/Images/welcomePage/calendar/secondSlideMobile.png';
import thirdSlide from '../../../assets/Images/welcomePage/calendar/thirdSlide.png';
import thirdSlideMobile from '../../../assets/Images/welcomePage/calendar/thirdSlideMobile.png';
import fourthSlide from '../../../assets/Images/welcomePage/calendar/fourthSlide.png';
import fourthSlideMobile from '../../../assets/Images/welcomePage/calendar/fourthSlideMobile.png';

import i18next from '../../locales/i18n';

import { ViewContainersEnum } from '../../enums/viewContainers.enum';

export const calendarWelcomePageStubConfig = {
  id: ViewContainersEnum.is_view_calendar,
  slides: [
    {
      title: i18next.t('stubs.welcomePage.calendar.fistSlide.title'),
      description: i18next.t('stubs.welcomePage.calendar.fistSlide.description'),
      imgDesktop: firstSlide,
      imgMobile: firstSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.calendar.secondSlide.title'),
      description: i18next.t('stubs.welcomePage.calendar.secondSlide.description'),
      imgDesktop: secondSlide,
      imgMobile: secondSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.calendar.thirdSlide.title'),
      description: i18next.t('stubs.welcomePage.calendar.thirdSlide.description'),
      imgDesktop: thirdSlide,
      imgMobile: thirdSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.calendar.fourthSlide.title'),
      description: i18next.t('stubs.welcomePage.calendar.fourthSlide.description'),
      imgDesktop: fourthSlide,
      imgMobile: fourthSlideMobile,
    },
  ],
};
