import firstSlide from '../../../assets/Images/welcomePage/todo/firstSlide.png';
import firstSlideMobile from '../../../assets/Images/welcomePage/todo/firstSlideMobile.png';
import secondSlide from '../../../assets/Images/welcomePage/todo/secondSlide.png';
import secondSlideMobile from '../../../assets/Images/welcomePage/todo/secondSlideMobile.png';
import thirdSlide from '../../../assets/Images/welcomePage/todo/thirdSlide.png';
import thirdSlideMobile from '../../../assets/Images/welcomePage/todo/thirdSlideMobile.png';
import fourthSlide from '../../../assets/Images/welcomePage/todo/fourthSlide.png';
import fourthSlideMobile from '../../../assets/Images/welcomePage/todo/fourthSlideMobile.png';

import i18next from '../../locales/i18n';

import { ViewContainersEnum } from '../../enums/viewContainers.enum';

export const todoWelcomePageStubConfig = {
  id: ViewContainersEnum.is_view_todo,
  slides: [
    {
      title: i18next.t('stubs.welcomePage.todo.fistSlide.title'),
      description: i18next.t('stubs.welcomePage.todo.fistSlide.description'),
      imgDesktop: firstSlide,
      imgMobile: firstSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.todo.secondSlide.title'),
      description: i18next.t('stubs.welcomePage.todo.secondSlide.description'),
      imgDesktop: secondSlide,
      imgMobile: secondSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.todo.thirdSlide.title'),
      description: i18next.t('stubs.welcomePage.todo.thirdSlide.description'),
      imgDesktop: thirdSlide,
      imgMobile: thirdSlideMobile,
    },
    {
      title: i18next.t('stubs.welcomePage.todo.fourthSlide.title'),
      description: i18next.t('stubs.welcomePage.todo.fourthSlide.description'),
      imgDesktop: fourthSlide,
      imgMobile: fourthSlideMobile,
    },
  ],
};
