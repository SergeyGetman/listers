import React, { FC, memo, useRef, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/swiper.min.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useTranslation } from 'react-i18next';
import { FilterParams, RootGarageItemsData } from '../../../../../store/types';
import MuiAvatarGroup from '../../../../../../../components/avatars/MuiAvatarGroup';
import { AssignPeoplePermissionsEnum } from '../../../../../../../shared/enums/assignPeoplePermissions.enum';
import { ReactComponent as ArrowRightIcon } from '../../../../../../../assets/Images/newGarage/garage-main-item/Arrow right.svg';
import { ReactComponent as ActionMenuIcon } from '../../../../../../../assets/Images/newGarage/garage-main-item/More-vertical.svg';
import { TransportTypeEnum } from '../../../../../../../shared/enums/garage.enums';
import GarageCreateActionMenu from '../../../../../../../components/actionMenus/GarageCreateActionMenu/GarageCreateActionMenu';
import CardBottomButtons from '../../../../../../../components/CardBottomButtons/CardBottomButtons';
import { SliderViewDocument } from '../SliderViewDocument/SliderViewDocument';
import { ViewVehicleTypeWithCopyClipboard } from '../ViewVehicleTypeWithCopyClipboard/ViewVehicleTypeWithCopyClipboard';
import ProgressBarWithLabel from '../../../../../../../components/ProgressBarWithLabel';
import { TransportInfo, useGarageActionMenu } from '../../../../../hooks/useGarageActionMenu';
import { EmptyTransportTypeIcon } from '../../../../../const/empty-transport-icon';
import {
  CustomNextButton,
  GarageActionMenu,
  GarageDnDGrab,
  GarageDocumentsContainer,
  GarageItemContainer,
  GarageItemContainerForDnd,
  GarageItemImageContainer,
  GarageShareUsersContainer,
  SwiperContainer,
} from './GarageCarditem.style';
import { setLoadingGarage } from '../../../../../store/garageSliceV2';
import router from '../../../../../../../shared/services/router';
import { useAppDispatch } from '../../../../../../../shared/hooks/redux';
import modalObserver from '../../../../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../../../../shared/enums/modalNames.enum';
import { AssignPeopleSelectValueModel } from '../../../../../../../shared/models/assignPeopleSelectValue.model';
import { syncUserShare } from '../../../../../store/garageThunkV2';

type PropsType = {
  item: RootGarageItemsData;
  isDnD?: boolean;
  filters: FilterParams;
};

export enum StatusTransport {
  pending = 'pending',
  accept = 'accept',
}

// TODO i18n
const GarageCardItem: FC<PropsType> = ({ item, isDnD = false, filters }) => {
  const theme = useTheme();

  const isHaveFilters = !!filters.shared_filters.length || !!filters.query;
  const typographyColor = item.cover_photo ? theme.palette.case.neutral.n0 : theme.palette.case.neutral.n800;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const swiperRef = useRef(null);

  const [isShowDndIcon, setIsShowDndIcon] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? 'grabbing' : 'default',
    opacity: 1,
  };

  const bgStyle =
    item.cover_photo !== null
      ? `url(${
          item.cover_photo[0].additional_info.size_urls.gallery || item.cover_photo[0].url
        })center center / cover no-repeat`
      : theme.palette.case.neutral.n100;

  const garageActionMenu = useGarageActionMenu(
    {
      isEditor: item.current.role === AssignPeoplePermissionsEnum.editor,
      isCreator: item.current.role === AssignPeoplePermissionsEnum.creator,
      isViewer: item.current.role === AssignPeoplePermissionsEnum.viewer,
      isDraft: !item.is_public,
    },
    { transportID: item.id, vehicleName: item.make, owner: item.owner, users: item.users },
  );

  const handleOpenShareModal = (transportInfo: Omit<TransportInfo, 'vehicleName'>) => {
    return () => {
      modalObserver.addModal(ModalNamesEnum.shareModal, {
        props: {
          users: transportInfo.users,
          owner: transportInfo.owner,
          title: t('general.header.shareWith'),
          handleConfirm: (users: AssignPeopleSelectValueModel[]) =>
            Promise.resolve().then(() => {
              dispatch(syncUserShare({ transportID: transportInfo.transportID, users }));
            }),
        },
      });
    };
  };

  const renderEmptyIcon = (transportType: TransportTypeEnum) => EmptyTransportTypeIcon[transportType];

  const showDndIcon = () => setIsShowDndIcon(true);
  const doNotShowDndIcon = () => setIsShowDndIcon(false);

  const redirectToViewCardInformation = (transportID: number) => {
    if (item.users.confirm_status === StatusTransport.pending) return;
    dispatch(setLoadingGarage({ isLoading: false }));
    navigate(
      `${router.garageNew.children.garageCardInformation.path}/${transportID}/${router.garageNew.children.garageCardInformation.generalInfo.path}`,
    );
  };
  return !isDragging ? (
    <GarageItemContainer
      ref={setNodeRef}
      style={style}
      isDnD={isDnD}
      onMouseLeave={doNotShowDndIcon}
      onMouseEnter={showDndIcon}
    >
      <GarageItemImageContainer background={bgStyle} onClick={() => redirectToViewCardInformation(item.id)}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="column" width="calc(100% - 54px)">
            <Typography noWrap variant="s1" sx={{ color: typographyColor }}>
              {item.make}
            </Typography>
            <Typography noWrap variant="s2" sx={{ color: typographyColor }}>
              {item.model}
            </Typography>
            <Typography component="p" variant="t12m" sx={{ color: typographyColor }}>
              {item.year}
            </Typography>
          </Box>

          {item.current.confirm_status !== StatusTransport.pending && (
            <Box sx={{ flexShrink: 0, position: 'relative' }}>
              <GarageCreateActionMenu
                sx={{ minHeight: '36px ' }}
                isMobileVariant={false}
                anchorOriginHorizontal="right"
                anchorOriginVertical="bottom"
                transformOriginHorizontal="right"
                transformOriginVertical="top"
                childrenComponent={
                  <GarageActionMenu isHavePhoto={item.cover_photo !== null}>
                    <ActionMenuIcon />
                  </GarageActionMenu>
                }
                header={null}
                isMobile={false}
                menuList={garageActionMenu}
              />
              {item.current.position !== null && !isHaveFilters && (
                <GarageDnDGrab isHover={isShowDndIcon} {...listeners} {...attributes}>
                  <DragIndicatorIcon width="16px" height="16px" sx={{ cursor: 'grab' }} />
                </GarageDnDGrab>
              )}
            </Box>
          )}
        </Box>

        {!item.cover_photo ? (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              right: '50%',
              transform: 'translate(50%, -50%)',
            }}
          >
            {renderEmptyIcon(item.transport_type as TransportTypeEnum)}
          </Box>
        ) : (
          <></>
        )}

        {!item.is_public && (
          <Box display="flex" justifyContent="space-between">
            <Typography sx={{ color: theme.palette.case.neutral.n800, alignSelf: 'flex-end' }} variant="s2">
              (draft)
            </Typography>
            <Box width="128px">
              <ProgressBarWithLabel hintText={t('general.completeRate')} value={15} />
            </Box>
          </Box>
        )}

        {!!item.users.length && item.is_public && (
          <GarageShareUsersContainer>
            <MuiAvatarGroup
              size="extraSmall"
              maxItemView={3}
              onClickShare={handleOpenShareModal({
                owner: item.owner,
                users: item.users,
                transportID: item.id,
              })}
              isShowAddUserBtn={item.current.role === AssignPeoplePermissionsEnum.creator}
              owner={item.owner}
              users={item.users}
            />
          </GarageShareUsersContainer>
        )}
      </GarageItemImageContainer>
      <GarageDocumentsContainer isHavePhoto={!item.insurances.length}>
        <SwiperContainer>
          <Swiper
            lazy
            ref={swiperRef}
            slidesPerView="auto"
            loop={false}
            spaceBetween={8}
            navigation={{
              nextEl: '.custom-next-button',
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <SliderViewDocument
                imageText={!!item.insurances.length ? 'Insurance Card' : 'Add Insurance'}
                document={item.insurances[0]?.insurance_card_front}
              />
            </SwiperSlide>

            <SwiperSlide>
              <SliderViewDocument
                imageText={!!item.licenses.length ? 'License plate' : 'Add License plate'}
                document={item.licenses[0]?.documents}
              />
            </SwiperSlide>
            <SwiperSlide>
              <SliderViewDocument
                imageText={!!item.stickers.length ? 'LP Registration' : 'Add LP Registration'}
                document={item.stickers[0]?.documents}
              />
            </SwiperSlide>

            <CustomNextButton
              isHavePhoto={
                !!item.insurances.length || !!item.licenses[0]?.documents || !!item.stickers[0]?.documents
              }
              className="custom-next-button"
            >
              <ArrowRightIcon />
            </CustomNextButton>
          </Swiper>
        </SwiperContainer>
      </GarageDocumentsContainer>
      <Box
        sx={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '2px' }}
        onClick={() => redirectToViewCardInformation(item.id)}
      >
        <ViewVehicleTypeWithCopyClipboard
          isShowClipboard={!!item.license_plate}
          copyContent={item.license_plate}
          mainContent={{ type: 'License Plate', value: item.license_plate }}
        />
        <ViewVehicleTypeWithCopyClipboard
          isShowClipboard={!!item.vin}
          copyContent={item.vin}
          mainContent={{ type: 'VIN Number', value: item.vin }}
        />
        <ViewVehicleTypeWithCopyClipboard mainContent={{ type: 'Mileage', value: item.vin }} />
        <ViewVehicleTypeWithCopyClipboard mainContent={{ type: 'Fuel Type', value: item.fuel_type }} />
        <ViewVehicleTypeWithCopyClipboard mainContent={{ type: 'Engine Type', value: item.engine_type }} />
        <ViewVehicleTypeWithCopyClipboard
          mainContent={{
            type: item.transport_type === TransportTypeEnum.car ? 'Trim' : 'Drivetrain',
            value: item.transport_type === TransportTypeEnum.car ? item.trim : item.drivetrain,
          }}
        />
        <ViewVehicleTypeWithCopyClipboard mainContent={{ type: 'Transmission', value: item.transmission }} />
      </Box>

      {item.current.confirm_status === StatusTransport.pending && (
        <Box sx={{ position: 'absolute', bottom: '0', width: '100%' }}>
          <CardBottomButtons handleDecline={() => {}} handleAccept={() => {}} />
        </Box>
      )}
    </GarageItemContainer>
  ) : (
    <GarageItemContainerForDnd
      ref={setNodeRef}
      style={style}
      onMouseLeave={doNotShowDndIcon}
      onMouseEnter={showDndIcon}
    />
  );
};
export default memo(GarageCardItem);
