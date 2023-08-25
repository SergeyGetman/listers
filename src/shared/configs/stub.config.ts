import i18next from '../locales/i18n';

import hubmeek from '../../assets/Images/hubbmeek/hubmeek-hi.svg';
import hubmeekGroup from '../../assets/Images/hubbmeek/hubmeek_hm.svg';
import chatStubImg from '../../assets/Images/stub/chat-stub.svg';
import chatNoMassageImg from '../../assets/Images/stub/chat-no-massage-stub.svg';
import noFilterMatchStubImg from '../../assets/Images/stub/no-filter-match-stub-img.svg';
import contactsStubImg from '../../assets/Images/stub/contact-stub-img.svg';
import myNetworkStubImg from '../../assets/Images/stub/my-network-stub.svg';
import noSelectedConnectionStubImg from '../../assets/Images/stub/no-selected-connection-stub.svg';
import connectedStubImg from '../../assets/Images/stub/connected-stub-img.svg';
import pendingRequestStubImg from '../../assets/Images/stub/pending-request-stub-img.svg';
import sentRequestStubImg from '../../assets/Images/stub/sent-request-stub-img.svg';
import futureSentRequestStubImg from '../../assets/Images/stub/future-sent-request-stub-img.svg';
import plannerNoItemStubImg from '../../assets/Images/stub/plannerNoItemStub.svg';
import eventNoItemStubImg from '../../assets/Images/stub/event-no-item-stub-img.svg';
import roadmapNoItemStubImg from '../../assets/Images/stub/roadmap-no-item-stub-img.svg';
import archiveNoItemStubImg from '../../assets/Images/stub/archive-no-item-stub-img.svg';
import toDoStubImg from '../../assets/Images/stub/to-do-stub.svg';
import garageNoVehiclesStubImg from '../../assets/Images/stub/garage-stub.svg';

export const stubConfig = [
  {
    description: i18next.t('stubs.commentsStub.description'),
    img: hubmeek,
  },
];

export const plannerBottomStubConfig = [
  i18next.t('stubs.planner.motivationQuotesStub.description1'),
  i18next.t('stubs.planner.motivationQuotesStub.description2'),
  i18next.t('stubs.planner.motivationQuotesStub.description3'),
  i18next.t('stubs.planner.motivationQuotesStub.description4'),
  i18next.t('stubs.planner.motivationQuotesStub.description5'),
  i18next.t('stubs.planner.motivationQuotesStub.description6'),
  i18next.t('stubs.planner.motivationQuotesStub.description7'),
  i18next.t('stubs.planner.motivationQuotesStub.description8'),
  i18next.t('stubs.planner.motivationQuotesStub.description9'),
  i18next.t('stubs.planner.motivationQuotesStub.description10'),
  i18next.t('stubs.planner.motivationQuotesStub.description11'),
  i18next.t('stubs.planner.motivationQuotesStub.description12'),
  i18next.t('stubs.planner.motivationQuotesStub.description13'),
  i18next.t('stubs.planner.motivationQuotesStub.description14'),
  i18next.t('stubs.planner.motivationQuotesStub.description15'),
  i18next.t('stubs.planner.motivationQuotesStub.description16'),
];

export const plannerListNoItemStubConfig = {
  title: i18next.t('stubs.planner.plannerListNoItemStub.title'),
  description: i18next.t('stubs.planner.plannerListNoItemStub.description'),
  img: plannerNoItemStubImg,
  subtitle: i18next.t('stubs.planner.plannerListNoItemStub.subtitle'),
  subDescription: i18next.t('stubs.planner.plannerListNoItemStub.subDescription'),
};

export const toDoStubConfig = {
  title: i18next.t('stubs.toDo.toDoStub.title'),
  description: i18next.t('stubs.toDo.toDoStub.description'),
  img: toDoStubImg,
  subtitle: i18next.t('stubs.toDo.toDoStub.subtitle'),
  subDescription: i18next.t('stubs.toDo.toDoStub.subDescription'),
};

export const todoNoItemsStubConfig = {
  title: i18next.t('stubs.todo.noItemsStub.title'),
  description: i18next.t('stubs.todo.noItemsStub.description'),
  img: toDoStubImg,
};

export const checklistsNoItemsStubConfig = {
  title: i18next.t('stubs.todo.checklistNoItemsStub.title'),
  description: i18next.t('stubs.todo.checklistNoItemsStub.description'),
  img: toDoStubImg,
};

export const notesNoItemsStubConfig = {
  title: i18next.t('stubs.todo.notesNoItemsStub.title'),
  description: i18next.t('stubs.todo.notesNoItemsStub.description'),
  img: toDoStubImg,
};

export const todoBaseStubConfig = {
  title: i18next.t('stubs.todo.baseStub.title'),
  img: toDoStubImg,
};

export const chatNotFoundPersonStubConfig = {
  description: i18next.t('stubs.chatNotFoundPersonStub.description'),
  img: hubmeek,
  imageAlt: i18next.t('general.hubmeek'),
};

export const chatNotFoundGroupStubConfig = {
  description: i18next.t('stubs.chatNotFoundGroupStub.description'),
  img: hubmeekGroup,
  imageAlt: i18next.t('general.hubmeek'),
};

export const personalChatStubConfig = {
  title: i18next.t('stubs.personalChatStub.title'),
  description: i18next.t('stubs.personalChatStub.description'),
  subDescription: i18next.t('stubs.personalChatStub.subDescription'),
  img: chatStubImg,
  imageAlt: i18next.t('stubs.personalChatStub.imageAlt'),
};

export const groupChatStubConfig = {
  title: i18next.t('stubs.groupChatStub.title'),
  description: i18next.t('stubs.groupChatStub.description'),
  subDescription: i18next.t('stubs.groupChatStub.subDescription'),
  img: chatStubImg,
  imageAlt: i18next.t('stubs.groupChatStub.imageAlt'),
};

export const noMessagesGroupChatStubConfig = {
  img: chatNoMassageImg,
  title: i18next.t('stubs.noMessagesGroupChatStub.title'),
  imageAlt: i18next.t('stubs.noMessagesGroupChatStub.imageAlt'),
};

export const noMessagesPersonalChatStubConfig = {
  img: chatNoMassageImg,
  title: i18next.t('stubs.noMessagesPersonalChatStub.title'),
  imageAlt: i18next.t('stubs.noMessagesPersonalChatStub.imageAlt'),
};

export const noSelectedConnectionStubConfig = {
  title: i18next.t('stubs.network.noSelectedConnectionStub.title'),
  description: i18next.t('stubs.network.noSelectedConnectionStub.description'),
  img: noSelectedConnectionStubImg,
};

export const networkInviteStubConfig = {
  description: i18next.t('stubs.network.networkInviteStub.description'),
  subDescription: i18next.t('stubs.network.networkInviteStub.subDescription'),
  img: hubmeek,
  imageAlt: i18next.t('general.hubmeek'),
};

export const myNetworkStubConfig = {
  title: i18next.t('stubs.network.myNetworkStub.title'),
  description: i18next.t('stubs.network.myNetworkStub.description'),
  img: myNetworkStubImg,
  subDescription: i18next.t('stubs.network.myNetworkStub.subtitle'),
};

export const networkContactsStubConfig = {
  title: i18next.t('stubs.network.networkContactsStub.title'),
  description: i18next.t('stubs.network.networkContactsStub.description'),
  img: contactsStubImg,
  subDescription: i18next.t('stubs.network.networkContactsStub.subtitle'),
};

export const networkConnectedStubConfig = {
  title: i18next.t('stubs.network.networkConnectedStub.title'),
  description: i18next.t('stubs.network.networkConnectedStub.description'),
  img: connectedStubImg,
  subtitle: i18next.t('stubs.network.networkConnectedStub.subtitle'),
};

export const networkPendingRequestStubConfig = {
  title: i18next.t('stubs.network.networkPendingRequestStub.title'),
  description: i18next.t('stubs.network.networkPendingRequestStub.description'),
  img: pendingRequestStubImg,
  subtitle: i18next.t('stubs.network.networkPendingRequestStub.subtitle'),
};

export const networkSentRequestStubConfig = {
  title: i18next.t('stubs.network.networkSentRequestStub.title'),
  description: i18next.t('stubs.network.networkSentRequestStub.description'),
  img: sentRequestStubImg,
  subtitle: i18next.t('stubs.network.networkSentRequestStub.subtitle'),
};

export const networkFutureSentRequestStubConfig = {
  title: i18next.t('stubs.network.networkFutureSentRequestStub.title'),
  description: i18next.t('stubs.network.networkFutureSentRequestStub.description'),
  img: futureSentRequestStubImg,
  subtitle: i18next.t('stubs.network.networkFutureSentRequestStub.subtitle'),
};

export const eventNoItemStubConfig = {
  title: i18next.t('stubs.event.eventListNoItemStub.title'),
  description: i18next.t('stubs.event.eventListNoItemStub.description'),
  img: eventNoItemStubImg,
  subtitle: i18next.t('stubs.event.eventListNoItemStub.subtitle'),
  subDescription: i18next.t('stubs.event.eventListNoItemStub.subDescription'),
};

export const roadmapNoItemStubConfig = {
  title: i18next.t('stubs.roadmap.roadmapNoItemStub.title'),
  description: i18next.t('stubs.roadmap.roadmapNoItemStub.description'),
  img: roadmapNoItemStubImg,
  subtitle: i18next.t('stubs.roadmap.roadmapNoItemStub.subtitle'),
  subDescription: i18next.t('stubs.roadmap.roadmapNoItemStub.subDescription'),
};

export const backlogNoItemStubConfig = {
  title: i18next.t('stubs.backlog.backlogNoItemStub.title'),
  description: i18next.t('stubs.backlog.backlogNoItemStub.description'),
  img: roadmapNoItemStubImg,
  subtitle: i18next.t('stubs.backlog.backlogNoItemStub.subtitle'),
  subDescription: i18next.t('stubs.backlog.backlogNoItemStub.subDescription'),
};

export const archiveNoItemStubConfig = {
  title: i18next.t('stubs.archive.archiveNoItemStub.title'),
  description: i18next.t('stubs.archive.archiveNoItemStub.description'),
  img: archiveNoItemStubImg,
  subtitle: i18next.t('stubs.archive.archiveNoItemStub.subtitle'),
  subDescription: i18next.t('stubs.archive.archiveNoItemStub.subDescription'),
};

export const noFilterMatchStubConfig = {
  title: i18next.t('stubs.noFilterMatchStub.title'),
  img: noFilterMatchStubImg,
  subtitle: i18next.t('stubs.noFilterMatchStub.description'),
};

export const garageNoItemsStubConfig = {
  title: i18next.t('stubs.garage.garageNoVehiclesStub.title'),
  description: i18next.t('stubs.garage.garageNoVehiclesStub.description'),
  img: garageNoVehiclesStubImg,
  subtitle: i18next.t('stubs.garage.garageNoVehiclesStub.subtitle'),
  subDescription: i18next.t('stubs.garage.garageNoVehiclesStub.subDescription'),
};
