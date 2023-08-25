import firstSlide from '../../../assets/Images/welcomePage/roadmap/firstSlide.png';
import firstSlideMobile from '../../../assets/Images/welcomePage/roadmap/firstSlideMobile.png';
import secondSlide from '../../../assets/Images/welcomePage/roadmap/secondSlide.png';
import secondMobile from '../../../assets/Images/welcomePage/roadmap/secondSlideMobile.png';
import thirdSlide from '../../../assets/Images/welcomePage/roadmap/thirdSlide.png';
import thirdSlideMobile from '../../../assets/Images/welcomePage/roadmap/thirdSlideMobile.png';
import fourthSlide from '../../../assets/Images/welcomePage/roadmap/fourthSlide.png';
import fourthSlideMobile from '../../../assets/Images/welcomePage/roadmap/fourthSlideMobile.png';
import fifthSlide from '../../../assets/Images/welcomePage/roadmap/fifthSlide.png';
import fifthSlideMobile from '../../../assets/Images/welcomePage/roadmap/fifthSlideMobile.png';

import i18next from '../../locales/i18n';

import { ViewContainersEnum } from '../../enums/viewContainers.enum';

export const roadmapWelcomePageStubConfig = {
  id: ViewContainersEnum.is_view_tasks,
  slides: [
    {
      title: i18next.t('stubs.welcomePage.roadmap.fistSlide.title'),
      description: i18next.t('stubs.welcomePage.roadmap.fistSlide.description'),
      imgDesktop: firstSlide,
      imgMobile: firstSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.roadmap.secondSlide.title'),
      description: i18next.t('stubs.welcomePage.roadmap.secondSlide.description'),
      imgDesktop: secondSlide,
      imgMobile: secondMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.roadmap.thirdSlide.title'),
      description: i18next.t('stubs.welcomePage.roadmap.thirdSlide.description'),
      imgDesktop: thirdSlide,
      imgMobile: thirdSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.roadmap.fourthSlide.title'),
      description: i18next.t('stubs.welcomePage.roadmap.fourthSlide.description'),
      imgDesktop: fourthSlide,
      imgMobile: fourthSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.roadmap.fifthSlide.title'),
      description: i18next.t('stubs.welcomePage.roadmap.fifthSlide.description'),
      imgDesktop: fifthSlide,
      imgMobile: fifthSlideMobile,
    },
  ],
};
