import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import GarageOpenItemLicencePlateSticker from './GarageOpenItemLicencePlateSticker';
import GarageOpenItemVehicleSticker from './GarageOpenItemVehicleSticker';
import GarageOpenItemSharing from './GarageOpenItemSharing';
import GarageOpenItemGeneralInformation from './GarageOpenItemGeneralInformation';
import GarageOpenItemInsurance from './GarageOpenItemInsurance';
import { ActionMenuListModel } from '../../../../shared/models/actionMenuList.model';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import {
  deleteInsurance,
  deleteTransportLicense,
  deleteTransportSticker,
  getTransportItem,
  unshareTransport,
} from '../../../../store/garage/garageThunk';
import { AddBottomButtonContainer } from '../../../../shared/styles/AddBottomButtonContainer';
import PlusActionMenu from '../../../../components/actionMenus/PlusActionMenu';
import Gallery from '../../../../components/media/Gallery';
import { addTransportPhoto, clearTransportState } from '../../../../store/garage/garageSlice';
import router from '../../../../shared/services/router';
import MuiBaseMobileAccordion from '../../../../components/accordions/MuiBaseMobileAccordion';
import { setBreadcrumbs } from '../../../../store/Common/commonThunk';
import MuiBaseAccordion from '../../../../components/accordions/MuiBaseAccordion';
import { PhotoEntityTypeEnum } from '../../../../shared/enums/photoEntityType.enum';
import { MediaType } from '../../../../shared/models/media.model';
import GarageOpenItemPayments from './GarageOpenItemPayments';
import { getConnections } from '../../../../store/Profile/profile.actions';
import { PackageEnum } from '../../../../shared/enums/package.enum';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

const GarageOpenItem = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const { data } = useAppSelector((state) => state.garage.transport);
  const profile = useAppSelector((state) => state.profile.data);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const isOpenRightSidebar = useAppSelector(({ rightSidebar }) => rightSidebar.isOpenRightSidebar);

  const isPackageRight = useMemo(() => {
    return profile?.subscription?.package === PackageEnum.premium;
  }, [profile?.subscription?.package]);
  const isEdit = useMemo(() => {
    if (data && profile.id) {
      // TODO fix backend permission
      const findUser = data.shared_users.find((item) => item.id === profile.id);
      if (findUser) {
        return findUser.permission === 'edit' || findUser.permission === 'owner';
      }
      return false;
    }
    return false;
  }, [data, profile]);

  const transportOwner = useMemo(
    () => data?.shared_users.find((item) => item.permission === 'owner'),
    [data?.shared_users],
  );

  const handleUnShare = useCallback(() => {
    if (id) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.confirmCancelSharing.title'),
          text: t('general.modals.confirmCancelSharing.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            dispatch(unshareTransport(+id)).then((result) => {
              if (unshareTransport.fulfilled.match(result)) {
                navigate(router.garage.path);
              }
            }),
        },
      });
    }
  }, [dispatch, id, navigate, t]);

  const openGeneralInformation = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.garageGeneralInfo, {
      props: { data },
    });
  }, [data]);

  const openLicense = useCallback(
    (index: number) => {
      modalObserver.addModal(ModalNamesEnum.garageLicense, {
        props: { data: data?.license_list[index], transportId: id },
      });
    },
    [data?.license_list, id],
  );

  const openInsurance = useCallback(
    (insurance_id: number) => {
      if (!data) return;
      const item = data.insurance_list.find((el) => el.id === insurance_id);

      if (item) {
        modalObserver.addModal(ModalNamesEnum.insuranceModal, {
          props: { data: item, transportId: id },
        });
      }
    },
    [data, id],
  );

  const handleDeleteInsurance = useCallback(
    (insurance_id: number) => {
      if (!data) return;
      const item = data.insurance_list.find((el) => el.id === insurance_id);
      if (item) {
        modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
          props: {
            title: t('general.modals.deleteInsurance.title'),
            text: t('general.modals.deleteInsurance.text'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: () => {
              dispatch(deleteInsurance(item.id as number));
            },
          },
        });
      }
    },
    [data, dispatch, t],
  );

  const handleDeleteLicense = useCallback(
    (index: number) => {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.deleteInfoBox.title'),
          text: t('general.modals.deleteInfoBox.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            dispatch(deleteTransportLicense(data?.license_list[index].id as number));
          },
        },
      });
    },
    [data?.license_list, dispatch, t],
  );

  const handleOpenSharingModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.transportSharing, {
      props: { data: data?.shared_users, isEdit, transportId: id },
    });
  }, [data?.shared_users, isEdit, id]);

  const handleDeleteSticker = useCallback(
    (index: number) => {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.deleteInfoBox.title'),
          text: t('general.modals.deleteInfoBox.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            dispatch(deleteTransportSticker(data?.stickers[index].id as number));
          },
        },
      });
    },
    [data?.stickers, dispatch, t],
  );

  const menu = useCallback((): ActionMenuListModel => {
    return [
      {
        label: 'Insurance',
        isDisabled: data?.insurance_list && data.insurance_list.length >= 10,
        tooltipTitle: data?.insurance_list && data.insurance_list.length >= 10 ? 'Max 10 Insurances' : '',
        callback: () => modalObserver.addModal(ModalNamesEnum.insuranceModal, { props: { transportId: id } }),
      },
      {
        label: t('general.containers.lPRegistration'),
        isDisabled: data?.license_list.length !== 0,
        tooltipTitle:
          data?.license_list.length !== 0 ? `Max 1 ${t('general.containers.lPRegistration')}` : '',
        callback: () => modalObserver.addModal(ModalNamesEnum.garageLicense, { props: { transportId: id } }),
      },
      {
        label: 'Vehicle registration',
        callback: () =>
          modalObserver.addModal(ModalNamesEnum.vehicleStickerModal, { props: { transportId: id } }),
      },
    ];
  }, [data, t, id]);

  const handleOpenUpgradePackageModal = () => {
    modalObserver.addModal(ModalNamesEnum.purchaseModal, {
      props: { isPlatinum: true },
    });
  };

  const generalInformationMenu: ActionMenuListModel = useMemo(() => {
    return [
      {
        label: 'Edit',
        callback: () => openGeneralInformation(),
      },
    ];
  }, [openGeneralInformation]);

  const sharingMenu: ActionMenuListModel = useMemo(() => {
    let newMenu = [
      {
        label: isEdit ? 'Edit' : 'View',
        callback: () => handleOpenSharingModal(),
      },
    ];
    if (transportOwner && profile && transportOwner.id !== profile.id) {
      newMenu = [
        ...newMenu,
        {
          label: 'Cancel sharing',
          callback: () => handleUnShare(),
        },
      ];
    }

    return newMenu;
  }, [handleOpenSharingModal, handleUnShare, isEdit, profile, transportOwner]);

  const licenseMenu = useCallback(
    (index: number) => {
      if (!isPackageRight) {
        return [
          {
            label: 'Edit',
            tooltipTitle: 'Upgrade',
            callback: () => true,
            disableCallback: handleOpenUpgradePackageModal,
            isDisabled: true,
          },
          {
            label: 'Delete',
            callback: () => handleDeleteLicense(index),
          },
        ];
      }
      return [
        {
          label: 'Edit',
          callback: () => openLicense(index),
        },
        {
          label: 'Delete',
          callback: () => handleDeleteLicense(index),
        },
      ];
    },
    [isPackageRight, handleDeleteLicense, openLicense],
  );

  const addTransportGallery = useCallback(
    (files: MediaType[]) => {
      dispatch(addTransportPhoto(files));
    },
    [dispatch],
  );

  const stickerMenu = useCallback(
    (index: number) => {
      if (!isPackageRight) {
        return [
          {
            label: 'Edit',
            tooltipTitle: 'Upgrade',
            callback: () => true,
            disableCallback: handleOpenUpgradePackageModal,
            isDisabled: true,
          },
          {
            label: 'Delete',
            callback: () => handleDeleteSticker(index),
          },
        ];
      }
      return [
        {
          label: 'Edit',
          callback: () =>
            modalObserver.addModal(ModalNamesEnum.vehicleStickerModal, {
              props: { data: data?.stickers[index], transportId: id },
            }),
        },
        {
          label: 'Delete',
          callback: () => handleDeleteSticker(index),
        },
      ];
    },
    [isPackageRight, handleDeleteSticker, data?.stickers, id],
  );

  const insuranceMenu = useCallback(
    (itemId: number) => {
      if (!isPackageRight) {
        return [
          {
            label: 'Edit',
            tooltipTitle: 'Upgrade',
            callback: () => true,
            disableCallback: handleOpenUpgradePackageModal,
            isDisabled: true,
          },
          {
            label: 'Delete',
            callback: () => handleDeleteInsurance(itemId),
          },
        ];
      }
      return [
        {
          label: 'Edit',
          callback: () => openInsurance(itemId),
        },
        {
          label: 'Delete',
          callback: () => handleDeleteInsurance(itemId),
        },
      ];
    },
    [isPackageRight, handleDeleteInsurance, openInsurance],
  );

  useEffect(() => {
    if (id) {
      dispatch(getTransportItem(+id));
      // TODO call it in App.tsx
      dispatch(getConnections());
    }
    return () => {
      dispatch(clearTransportState());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!data) return;
    if (isMobileDisplay) {
      dispatch(setBreadcrumbs([{ title: data.make }]));
    } else {
      dispatch(setBreadcrumbs([{ title: 'Garage', href: router.garage.path }, { title: data.make }]));
    }
  }, [data, dispatch, isMobileDisplay]);

  return data ? (
    <Box sx={{ marginBottom: '20px' }}>
      {isMobileDisplay ? (
        <Grid container rowSpacing="16px">
          <Grid xs={12} item>
            <MuiBaseMobileAccordion isDefaultExpand={false} title={t('general.containers.gallery')}>
              <Box sx={{ padding: '0 10px 16px 10px' }}>
                <Gallery
                  isCanAddMediaFromClipboard={false}
                  media={data?.photos || []}
                  placeholder={t('general.placeholders.add_garage_photos')}
                  entityType={PhotoEntityTypeEnum.transport_photo}
                  onAddMedia={addTransportGallery}
                  entity_id={+id}
                />
              </Box>
            </MuiBaseMobileAccordion>
          </Grid>
          {data && (
            <Grid item xs={12}>
              <GarageOpenItemGeneralInformation
                isShowMenu={isEdit}
                menu={generalInformationMenu}
                data={data}
              />
            </Grid>
          )}

          {data &&
            data?.insurance_list.map((item, index) => (
              <Grid item xs={12} key={index}>
                <GarageOpenItemInsurance
                  isShowMenu={isEdit}
                  data={item}
                  menu={insuranceMenu(item.id as number)}
                />
              </Grid>
            ))}
          {data &&
            data?.license_list.map((item, index) => (
              <Grid xs={12} item key={index}>
                <GarageOpenItemLicencePlateSticker
                  isShowMenu={isEdit}
                  menu={licenseMenu(index)}
                  data={item}
                />
              </Grid>
            ))}

          {data &&
            data.stickers.map((item, index) => (
              <Grid xs={12} item key={index}>
                <GarageOpenItemVehicleSticker isShowMenu={isEdit} menu={stickerMenu(index)} data={item} />
              </Grid>
            ))}
          <Grid xs={12} item>
            <GarageOpenItemSharing data={data.shared_users} menu={sharingMenu} />
          </Grid>
          {!!data.payments.length ? (
            <Grid xs={12} item>
              <GarageOpenItemPayments payments={data.payments} />
            </Grid>
          ) : null}
        </Grid>
      ) : (
        <Grid container columnSpacing="20px">
          <Grid sm={6} item>
            <Grid container rowSpacing="30px">
              <Grid xs={12} item>
                {data ? (
                  <MuiBaseAccordion
                    withHover
                    isShowInfoDialog={false}
                    isDisabledExpand={false}
                    label={t('general.containers.gallery')}
                  >
                    <Gallery
                      isCanAddMediaFromClipboard={false}
                      media={data?.photos || []}
                      isShowSwiper
                      title={t('general.placeholders.add_garage_photos')}
                      onAddMedia={addTransportGallery}
                      entityType={PhotoEntityTypeEnum.transport_photo}
                      entity_id={+id}
                    />
                  </MuiBaseAccordion>
                ) : (
                  <Skeleton height={590} variant="rectangular" />
                )}
              </Grid>

              <Grid xs={12} item>
                <GarageOpenItemSharing data={data.shared_users} menu={sharingMenu} />
              </Grid>

              {!!data.payments.length ? (
                <Grid xs={12} item>
                  <GarageOpenItemPayments payments={data.payments} />
                </Grid>
              ) : null}

              {data &&
                data?.license_list.map((item, index) => (
                  <Grid xs={12} item key={index}>
                    <GarageOpenItemLicencePlateSticker
                      isShowMenu={isEdit}
                      menu={licenseMenu(index)}
                      data={item}
                    />
                  </Grid>
                ))}

              {data &&
                data.stickers.map((item, index) => (
                  <Grid xs={12} item key={index}>
                    <GarageOpenItemVehicleSticker isShowMenu={isEdit} menu={stickerMenu(index)} data={item} />
                  </Grid>
                ))}
            </Grid>

            {/* {data ? ( */}
            {/*  isMobileDisplay ? ( */}
            {/*    <MuiBaseMobileAccordion title={t('general.containers.generalInformation')}> */}
            {/*      <Box sx={{ padding: '0 10px 16px 10px' }}> */}
            {/*        */}
            {/*      </Box> */}
            {/*    </MuiBaseMobileAccordion> */}
            {/*  ) : ( */}
            {/*    <Gallery isCanAddMediaFromClipboard={false} media={[]} isShowSwiper onAddMedia={() => true} /> */}
            {/*  ) */}
            {/* ) : ( */}
            {/*  <Skeleton height={438} variant="rectangular" /> */}
            {/* )} */}
          </Grid>

          <Grid sm={6} item>
            <Grid container rowSpacing="30px">
              {data && (
                <Grid item xs={12}>
                  <GarageOpenItemGeneralInformation
                    isShowMenu={isEdit}
                    menu={generalInformationMenu}
                    data={data}
                  />
                </Grid>
              )}

              {data.insurance_list.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <GarageOpenItemInsurance
                    isShowMenu={isEdit}
                    key={index}
                    data={item}
                    menu={insuranceMenu(item.id as number)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}

      {isEdit && (
        <AddBottomButtonContainer isOpenRightSidebar={isOpenRightSidebar}>
          <PlusActionMenu menuList={menu()} />
        </AddBottomButtonContainer>
      )}
    </Box>
  ) : (
    <>
      {isMobileDisplay ? (
        <Grid container rowSpacing="16px">
          <Grid item xs={12}>
            <Skeleton height="200px" variant="rectangular" />
          </Grid>
          <Grid item xs={12}>
            <Skeleton height="70px" variant="rectangular" />
          </Grid>
          <Grid item xs={12}>
            <Skeleton height="70px" variant="rectangular" />
          </Grid>
          <Grid item xs={12}>
            <Skeleton height="70px" variant="rectangular" />
          </Grid>
          <Grid item xs={12}>
            <Skeleton height="70px" variant="rectangular" />
          </Grid>
          <Grid item xs={12}>
            <Skeleton height="70px" variant="rectangular" />
          </Grid>
          <Grid item xs={12}>
            <Skeleton height="70px" variant="rectangular" />
          </Grid>
        </Grid>
      ) : (
        <Grid container columnSpacing="20px">
          <Grid sm={6} item>
            <Grid container rowSpacing="30px">
              <Grid item xs={12}>
                <Skeleton height="290px" variant="rectangular" />
              </Grid>
              <Grid item xs={12}>
                <Skeleton height="200px" variant="rectangular" />
              </Grid>
              <Grid item xs={12}>
                <Skeleton height="500px" variant="rectangular" />
              </Grid>
              <Grid item xs={12}>
                <Skeleton height="500px" variant="rectangular" />
              </Grid>
            </Grid>
          </Grid>
          <Grid sm={6} item>
            <Grid container rowSpacing="30px">
              <Grid item xs={12}>
                <Skeleton height="500px" variant="rectangular" />
              </Grid>
              <Grid item xs={12}>
                <Skeleton height="500px" variant="rectangular" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default GarageOpenItem;
