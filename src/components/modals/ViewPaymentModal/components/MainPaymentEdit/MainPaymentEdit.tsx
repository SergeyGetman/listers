/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import Moment from 'moment';
import { Box } from '@mui/material';
import draftToHtml from 'draftjs-to-html';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { transformToAssignUserSelectValueWithRole } from '../../../../../shared/functions/transformToAssignUserSelectValueWithRole';
import { AssignPeopleSelectValueModel } from '../../../../../shared/models/assignPeopleSelectValue.model';
import { MediaType } from '../../../../../shared/models/media.model';
import DescriptionContainer from '../../../../formContainers/DescriptionContainer';
import GalleryContainer from '../../../../viewContainers/GalleryContainer';
import DocumentsContainer from '../../../../viewContainers/DocumentsContainer';
import MuiDotAccordion from '../../../../accordions/MuiDotAccordion';
import GeneralShareEdit from '../../../../assignPeople/GeneralShareEdit';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import PaymentFormContainer from '../../../../formContainers/PaymentFormContainer';
import { getSelectOptionValue } from '../../../../../shared/utils/generateSelectOptions';
import { PhotoEntityTypeEnum } from '../../../../../shared/enums/photoEntityType.enum';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import errorsHandler from '../../../../../shared/functions/errorsHandler';
import { updatePaymentItem } from '../../../../../store/payment/paymentThunk';
import { EventItemModel } from '../../../../../shared/models/event/eventItem.model';
import router from '../../../../../shared/services/router';
import { updateCalendarItem } from '../../../../../store/calendar/calendarSlice';
import { addPlannerListItem, removePlannerListItem } from '../../../../../store/planner/plannerSlice';
import { PlannerItemModelTypeEnum } from '../../../../../shared/enums/plannerItemModelType.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type MainPaymentEditProps = {
  handleChangeMainView: (value: boolean) => void;
  payment: any;
  setIsEditView: (value: boolean) => void;
  setIsShowUnsavedDataModal: (value: boolean) => void;
  currentUserId: number;
};

const MainPaymentEdit: FC<MainPaymentEditProps> = ({
  handleChangeMainView,
  payment,
  setIsEditView,
  currentUserId,
  setIsShowUnsavedDataModal,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const blocksFromHTML = htmlToDraft(payment?.description ? payment.description : '');
  const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks);
  const { connections } = useAppSelector(({ profile }) => profile);
  const location = useLocation();

  const creator = useMemo(() => {
    return {
      ...payment?.owner,
      value: payment.owner.id,
      role: AssignPeoplePermissionsEnum.editor,
      label: payment.owner.full_name
        ? payment.owner.full_name
        : `${payment.owner.first_name} ${payment.owner.last_name}`,
    };
  }, [payment.owner]);
  const formatAssignPeopleOptions = useMemo(() => {
    return transformToAssignUserSelectValueWithRole(connections, payment.owner.id);
  }, [connections, payment.owner.id]);

  const formatUsersToOptions = useMemo(() => {
    return transformToAssignUserSelectValueWithRole(payment.users, payment.owner.id);
  }, [payment.users, payment.owner.id]);

  const [assignPeopleList, setAssignPeopleList] = useState<AssignPeopleSelectValueModel[]>([
    creator,
    ...formatUsersToOptions,
  ]);
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const [gallery, setGallery] = useState<MediaType[]>(payment.photos);
  const [files, setFiles] = useState<MediaType[]>(payment.documents);

  const initialValues = {
    title: payment?.title,
    description: EditorState.createWithContent(contentState),
    issued_by: payment?.issued_by,
    policy_number: payment?.policy_number,
    started_at: Moment(payment?.paid_at).toDate(),
    due_dated_at: Moment(payment?.due_dated_at).toDate(),
    frequency: getSelectOptionValue(payment?.item?.frequency, 'garage.frequency'),
    amount: payment?.amount || payment.item?.amount,
    late_fee: payment?.late_fee,
    sticker_reference: payment?.sticker_reference,
    sticker_type: payment?.sticker_type,
    sticker_number: payment?.sticker_number,
    registration_id: payment?.registration_id,
  };
  const { handleSubmit, formState, control, setError } = useForm<any>({
    defaultValues: initialValues,
  });

  const handleUpdateListItem = (value: EventItemModel) => {
    if (location.pathname === router.calendar.path) {
      dispatch(updateCalendarItem(value));
    } else if (location.pathname === router.journal.path) {
      dispatch(removePlannerListItem({ modelType: PlannerItemModelTypeEnum.payment, id: value.id }));
      dispatch(addPlannerListItem(value));
    }
  };

  const onSubmit = (val: any) => {
    setIsShowConfirmLoader(true);

    const documents = files.map((item: MediaType) => ({
      id: item.id,
    }));
    const photos = gallery.map((item: MediaType) => ({ id: item.id }));
    const users = assignPeopleList.filter((item) => item.id !== currentUserId);
    const paid_at = Moment(
      `${Moment(val.started_at).format('MM/DD/YYYY')} ${Moment('12:00:00', 'HH:mm:ss').format('HH:mm:ss')}`,
    )
      .utc()
      .format('YYYY-MM-DD HH:mm:ss');
    const description =
      val.description.getCurrentContent().getPlainText().trim() !== ''
        ? draftToHtml(convertToRaw(val.description.getCurrentContent()))
        : '';
    const late_fee = val.late_fee;
    const submitData = {
      documents,
      photos,
      paid_at,
      description,
      late_fee,
      users,
    };

    dispatch(updatePaymentItem({ params: submitData, paymentId: payment.id }))
      .then((result) => {
        if (updatePaymentItem.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.paymentUpdated'));
          modalObserver.updateModalProps(ModalNamesEnum.viewPaymentModal, {
            props: {
              data: result.payload,
            },
          });
          handleUpdateListItem(result.payload);

          setIsEditView(false);
          setIsShowUnsavedDataModal(false);
        } else {
          errorsHandler(result, setError);
        }
      })
      .finally(() => {
        setIsShowConfirmLoader(false);
      });
    return true;
  };

  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
  }, [formState.isDirty, setIsShowUnsavedDataModal]);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ mt: '30px' }}>
          <PaymentFormContainer paymentType={payment?.type} control={control} />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <DescriptionContainer isDefaultExpand={!!payment?.description} control={control} />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <GalleryContainer
            isDefaultExpand={gallery.length > 0}
            onAddMedia={(newMedia: MediaType[]) => setGallery(newMedia)}
            entityType={PhotoEntityTypeEnum.payment_photo}
            maxPhotoLength={20}
            gallery={gallery}
          />
        </Box>
        <Box sx={{ mt: '30px' }}>
          <DocumentsContainer
            isDefaultExpand={files.length > 0}
            files={files}
            entityType={DocumentsEntityTypeEnum.payment_document}
            onAddMedia={(newMedia: MediaType[]) => setFiles(newMedia)}
          />
        </Box>
        <Box sx={{ mt: '30px', pb: '150px' }}>
          <MuiDotAccordion
            // TODO hide block when connection is not fetching
            label={t('general.containers.sharing')}
            isShowInfoDialog
            isDefaultExpand
            // TODO need tooltip text
            infoTooltipText="Two-factor authentication is a great way to keep your hubmee account secure and private. Choose how you would like to authenticate: using a phone number or email. From now on, no one else can log into your hubmee account, even if they have your username and password. We care about our users’ privacy; enjoy hubmee with peace of mind"
          >
            <GeneralShareEdit
              isDisabledSelect
              isShowSelect={false}
              assignPeopleList={assignPeopleList}
              setAssignPeopleList={setAssignPeopleList}
              creator={creator}
              currentUserId={currentUserId}
              options={formatAssignPeopleOptions}
              isDisableRemoveUsers
            />
          </MuiDotAccordion>
        </Box>
        <ModalFooter
          isShowSecurityInfo
          position="absolute"
          middleBtnProps={{
            isShow: true,
            isLoadingBtn: true,
            label: t('general.buttons.cancel'),
            variant: 'outlined',
            onClick: () => handleChangeMainView(false),
            isStopPropagation: false,
            type: 'button',
          }}
          rightBtnProps={{
            isShow: true,
            isLoadingBtn: true,
            loading: isShowConfirmLoader,
            label: t('general.buttons.save'),
            variant: 'contained',
            isStopPropagation: false,
            type: 'submit',
          }}
        />
      </form>
    </Box>
  );
};

export default MainPaymentEdit;
