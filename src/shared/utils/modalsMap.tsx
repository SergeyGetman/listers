import { lazy } from 'react';
import { componentLoader } from './componentLoader';
import { ModalNamesEnum } from '../enums/modalNames.enum';

const PhotoCropModal = lazy(() =>
  componentLoader(() => import('../../components/modals/PhotoCropModal/PhotoCropModal')),
);

const FeatureInfoModal = lazy(() =>
  componentLoader(() => import('../../components/modals/FeatureInfoModal/FeatureInfoModal')),
);
const BaseConfirmModal = lazy(() =>
  componentLoader(() => import('../../components/modals/confirmModals/BaseConfirmModal/BaseConfirmModal')),
);
const PurchaseModal = lazy(() =>
  componentLoader(() => import('../../components/modals/PurchaseModal/PurchaseModal')),
);
const ConfirmWithTwoVariantModal = lazy(() =>
  componentLoader(
    () =>
      import('../../components/modals/confirmModals/ConfirmWithTwoVariantModal/ConfirmWithTwoVariantModal'),
  ),
);
const ConfirmModalWithThreeVariant = lazy(() =>
  componentLoader(
    () =>
      import(
        '../../components/modals/confirmModals/ConfirmModalWithThreeVariant/ConfirmModalWithThreeVariant'
      ),
  ),
);
const ConfirmModalWithPassword = lazy(() =>
  componentLoader(
    () => import('../../components/modals/confirmModals/ConfirmModalWithPassword/ConfirmModalWithPassword'),
  ),
);
const TodoConfirmModal = lazy(() =>
  componentLoader(() => import('../../components/modals/confirmModals/TodoConfirmModal/TodoConfirmModal')),
);
const ConfirmModalWithSelect = lazy(() =>
  componentLoader(
    () => import('../../components/modals/confirmModals/ConfirmModalWithSelect/ConfirmModalWithSelect'),
  ),
);

const ConfirmDeclineModal = lazy(() =>
  componentLoader(
    () => import('../../components/modals/confirmModals/ConfirmDeclineModal/ConfirmDeclineModal'),
  ),
);
const UserFullNameModal = lazy(() =>
  componentLoader(() => import('../../components/modals/UserFullNameModal/UserFullNameModal')),
);

const TermsModal = lazy(() => componentLoader(() => import('../../components/modals/TermsModal/TermsModal')));
const PolicyModal = lazy(() =>
  componentLoader(() => import('../../components/modals/PolicyModal/PolicyModal')),
);
const GeneralSettingsModal = lazy(() =>
  componentLoader(() => import('../../components/modals/GeneralSettingsModal/GeneralSettingsModal')),
);
const ProfileGeneralInformationModal = lazy(() =>
  componentLoader(
    () =>
      import('../../components/modals/profile/ProfileGeneralInformationModal/ProfileGeneralInformationModal'),
  ),
);
const ProfileAppearanceModal = lazy(() =>
  componentLoader(
    () => import('../../components/modals/profile/ProfileAppearanceModal/ProfileAppearanceModal'),
  ),
);
const BodyArtsModal = lazy(() =>
  componentLoader(() => import('../../components/modals/profile/BodyArtsModal/BodyArtsModal')),
);
const ProfileContactsModal = lazy(() =>
  componentLoader(() => import('../../components/modals/profile/ProfileContactsModal/ProfileContactsModal')),
);
const RoadmapFiltersModal = lazy(() =>
  componentLoader(() => import('../../components/modals/RoadmapFiltersModal/RoadmapFiltersModal')),
);
const NetworkFiltersModal = lazy(() =>
  componentLoader(() => import('../../components/modals/NetworkFiltersModal/NetworkFiltersModal')),
);
const ContactsFiltersModal = lazy(() =>
  componentLoader(() => import('../../components/modals/ContactsFiltersModal/ContactsFiltersModal')),
);
const BacklogFiltersModal = lazy(() =>
  componentLoader(() => import('../../components/modals/BacklogFiltersModal/BacklogFiltersModal')),
);
const EventsFiltersModal = lazy(() =>
  componentLoader(() => import('../../components/modals/EventsFiltersModal/EventsFiltersModal')),
);
const ArchiveFiltersModal = lazy(() =>
  componentLoader(() => import('../../components/modals/ArchiveFiltersModal/ArchiveFiltersModal')),
);
const ArchiveSettingsModal = lazy(() =>
  componentLoader(() => import('../../components/modals/ArchiveSettingsModal/ArchiveSettingsModal')),
);
const CalendarFilterModal = lazy(() =>
  componentLoader(() => import('../../components/modals/CalendarFilterModal/CalendarFilterModal')),
);
const PlannerFiltersModal = lazy(() =>
  componentLoader(() => import('../../components/modals/PlannerFiltersModal/PlannerFiltersModal')),
);
const CreateTaskModal = lazy(() =>
  componentLoader(() => import('../../components/modals/CreateTaskModal/CreateTaskModal')),
);
const CreateTodoModal = lazy(() =>
  componentLoader(() => import('../../components/modals/CreateTodoModal/CreateTodoModal')),
);
const ViewTaskModal = lazy(() =>
  componentLoader(() => import('../../components/modals/ViewTaskModal/ViewTaskModal')),
);
const ViewPaymentModal = lazy(() =>
  componentLoader(() => import('../../components/modals/ViewPaymentModal/ViewPaymentModal')),
);
const ViewTodoModal = lazy(() =>
  componentLoader(() => import('../../components/modals/ViewTodoModal/ViewTodoModal')),
);
const CreateEventModal = lazy(() =>
  componentLoader(() => import('../../components/modals/CreateEventModal/CreateEventModal')),
);
const ViewEventModal = lazy(() =>
  componentLoader(() => import('../../components/modals/ViewEventModal/ViewEventModal')),
);
const ReplyModal = lazy(() =>
  componentLoader(() => import('../../components/modals/chat/ReplyModal/ReplyModal')),
);
const GroupModal = lazy(() =>
  componentLoader(() => import('../../components/modals/chat/GroupModal/GroupModal')),
);
const InviteModal = lazy(() =>
  componentLoader(() => import('../../components/modals/network/InviteModal/InviteModal')),
);
const VehicleStickerModal = lazy(() =>
  componentLoader(() => import('../../components/modals/garage/VehicleSticker/VehicleStickerModal')),
);
const UserProfileModal = lazy(() =>
  componentLoader(() => import('../../components/modals/UserProfileModal/UserProfileModal')),
);
const UserShortProfileModal = lazy(() =>
  componentLoader(() => import('../../components/modals/UserShortProfileModal/UserProfileModal')),
);
const NetworkSharingModal = lazy(() =>
  componentLoader(() => import('../../components/modals/NetworkSharingModal/NetworkSharingModal')),
);
const EditNetworkConnectionModal = lazy(() =>
  componentLoader(
    () => import('../../components/modals/EditNetworkConnectionModal/EditNetworkConnectionModal'),
  ),
);
const GarageGeneralInformationModal = lazy(() =>
  componentLoader(
    () => import('../../components/modals/garage/GarageGeneralInformation/GarageGeneralInformationModal'),
  ),
);
const CreateContactModal = lazy(() =>
  componentLoader(() => import('../../components/modals/network/CreateContactModal/CreateContactModal')),
);
const LicencePlateStickerModal = lazy(() =>
  componentLoader(
    () => import('../../components/modals/garage/LicencePlateSticker/LicencePlateStickerModal'),
  ),
);
const ContactViewModal = lazy(() =>
  componentLoader(() => import('../../components/modals/network/ContactViewModal/ContactViewModal')),
);
const InsuranceModal = lazy(() =>
  componentLoader(() => import('../../components/modals/garage/Insuranse/InsuranceModal')),
);
const TransportSharingModal = lazy(() =>
  componentLoader(() => import('../../components/modals/garage/TransportSharing/TransportSharing')),
);
const PaymentModal = lazy(() => componentLoader(() => import('../../components/modals/payment')));
const DowngradePlanModal = lazy(() =>
  componentLoader(() => import('../../components/modals/plan/DowngradePlanModal/DowngradePlanModal')),
);
const DowngradePlanModalNew = lazy(() =>
  componentLoader(() => import('../../components/modals/plan/DowngradePlanModalNew/DowngradePlanModalNew')),
);

const ShareModal = lazy(() => componentLoader(() => import('../../components/modals/ShareModal/ShareModal')));
const PlanUpgradeModal = lazy(() =>
  componentLoader(() => import('../../components/modals/plan/PlanUpgradeModal/PlanUpgradeModal')),
);
const PlanAddCardModal = lazy(() =>
  componentLoader(() => import('../../components/modals/plan/PlanAddCardModal/PlanAddCardModal')),
);
const EventModal = lazy(() => componentLoader(() => import('../../components/modals/EventModal')));
const MediaModal = lazy(() => componentLoader(() => import('../../components/modals/MediaModal/MediaModal')));

const CreateGarageItemModal = lazy(() =>
  componentLoader(() => import('../../components/modals/garage/CreateGarageItemModal/CreateGarageItemModal')),
);

const ChecklistTemplatesModal = lazy(() =>
  componentLoader(() => import('../../components/modals/todo/ChecklistTemplatesModal')),
);

const WithCreateVariantsModal = lazy(() =>
  componentLoader(() => import('../../components/modals/WithCreateVariantsModal')),
);

const TodoFiltersModal = lazy(() =>
  componentLoader(() => import('../../components/modals/todo/TodoFiltersModal')),
);

const GarageFiltersModal = lazy(() =>
  componentLoader(() => import('../../compositeComponents/modals/garage/GarageFiltersModal')),
);

const AttachFilesModal = lazy(() =>
  componentLoader(() => import('../../components/modals/AttachFilesModal')),
);
const AlertModal = lazy(() => componentLoader(() => import('../../compositeComponents/modals/alertModal')));
const ChooseInsuranceModal = lazy(() =>
  componentLoader(() => import('../../pages/GarageNew/GaragePreSteps/chooseInsurance')),
);
const CreateMeetingModal = lazy(() =>
  componentLoader(() => import('../../components/modals/CreateMeetingModal')),
);
const ViewMeetingModal = lazy(() =>
  componentLoader(() => import('../../components/modals/ViewMeetingModal')),
);

const modalsMap: Record<ModalNamesEnum, any> = {
  [ModalNamesEnum.mediaViewer]: MediaModal,
  [ModalNamesEnum.photoCrop]: PhotoCropModal,
  [ModalNamesEnum.featureInfo]: FeatureInfoModal,
  [ModalNamesEnum.baseConfirmModal]: BaseConfirmModal,
  [ModalNamesEnum.purchaseModal]: PurchaseModal,
  [ModalNamesEnum.confirmWithTwoVariantModal]: ConfirmWithTwoVariantModal,
  [ModalNamesEnum.confirmModalWithThreeVariant]: ConfirmModalWithThreeVariant,
  [ModalNamesEnum.confirmModalWithPassword]: ConfirmModalWithPassword,
  [ModalNamesEnum.todoConfirmModal]: TodoConfirmModal,
  [ModalNamesEnum.confirmModalWithSelect]: ConfirmModalWithSelect,
  [ModalNamesEnum.confirmDeclineModal]: ConfirmDeclineModal,
  [ModalNamesEnum.userFullNameModal]: UserFullNameModal,
  [ModalNamesEnum.termsModal]: TermsModal,
  [ModalNamesEnum.policyModal]: PolicyModal,
  [ModalNamesEnum.generalSettings]: GeneralSettingsModal,
  [ModalNamesEnum.profileGeneralInformation]: ProfileGeneralInformationModal,
  [ModalNamesEnum.profileAppearance]: ProfileAppearanceModal,
  [ModalNamesEnum.bodyArts]: BodyArtsModal,
  [ModalNamesEnum.profileContacts]: ProfileContactsModal,
  [ModalNamesEnum.roadmapFiltersModal]: RoadmapFiltersModal,
  [ModalNamesEnum.networkFiltersModal]: NetworkFiltersModal,
  [ModalNamesEnum.contactsFiltersModal]: ContactsFiltersModal,
  [ModalNamesEnum.backlogFiltersModal]: BacklogFiltersModal,
  [ModalNamesEnum.eventsFiltersModal]: EventsFiltersModal,
  [ModalNamesEnum.archiveFiltersModal]: ArchiveFiltersModal,
  [ModalNamesEnum.archiveSettingsModal]: ArchiveSettingsModal,
  [ModalNamesEnum.calendarFiltersModal]: CalendarFilterModal,
  [ModalNamesEnum.plannerFiltersModal]: PlannerFiltersModal,
  [ModalNamesEnum.createTaskModal]: CreateTaskModal,
  [ModalNamesEnum.createTodoModal]: CreateTodoModal,
  [ModalNamesEnum.createMeetingModal]: CreateMeetingModal,
  [ModalNamesEnum.viewTaskModal]: ViewTaskModal,
  [ModalNamesEnum.viewPaymentModal]: ViewPaymentModal,
  [ModalNamesEnum.viewTodoModal]: ViewTodoModal,
  [ModalNamesEnum.viewMeetingModal]: ViewMeetingModal,
  [ModalNamesEnum.createEventModal]: CreateEventModal,
  [ModalNamesEnum.viewEventModal]: ViewEventModal,
  [ModalNamesEnum.replyModal]: ReplyModal,
  [ModalNamesEnum.groupChatModal]: GroupModal,
  [ModalNamesEnum.inviteNetworkModal]: InviteModal,
  [ModalNamesEnum.vehicleStickerModal]: VehicleStickerModal,
  [ModalNamesEnum.userProfileModal]: UserProfileModal,
  [ModalNamesEnum.userShortProfileModal]: UserShortProfileModal,
  [ModalNamesEnum.networkSharingModal]: NetworkSharingModal,
  [ModalNamesEnum.networkEditConnection]: EditNetworkConnectionModal,
  [ModalNamesEnum.garageGeneralInfo]: GarageGeneralInformationModal,
  [ModalNamesEnum.createContactModal]: CreateContactModal,
  [ModalNamesEnum.garageLicense]: LicencePlateStickerModal,
  [ModalNamesEnum.contactViewModal]: ContactViewModal,
  [ModalNamesEnum.insuranceModal]: InsuranceModal,
  [ModalNamesEnum.transportSharing]: TransportSharingModal,
  [ModalNamesEnum.payment]: PaymentModal,
  [ModalNamesEnum.downgradePlan]: DowngradePlanModal,
  [ModalNamesEnum.downgradePlanNew]: DowngradePlanModalNew,
  [ModalNamesEnum.shareModal]: ShareModal,
  [ModalNamesEnum.upgradePlan]: PlanUpgradeModal,
  [ModalNamesEnum.addPlanCard]: PlanAddCardModal,
  [ModalNamesEnum.promocodeEvent]: EventModal,
  [ModalNamesEnum.createGarageItem]: CreateGarageItemModal,
  [ModalNamesEnum.checklistTemplatesModal]: ChecklistTemplatesModal,
  [ModalNamesEnum.withCreateVariantsModal]: WithCreateVariantsModal,
  [ModalNamesEnum.todoFiltersModal]: TodoFiltersModal,
  [ModalNamesEnum.attachFiles]: AttachFilesModal,
  [ModalNamesEnum.alertModal]: AlertModal,
  [ModalNamesEnum.ChooseInsurance]: ChooseInsuranceModal,
  [ModalNamesEnum.garageFiltersModal]: GarageFiltersModal,
};

export default modalsMap;
