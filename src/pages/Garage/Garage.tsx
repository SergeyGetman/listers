import React, { useCallback, useEffect, useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Grid, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { setBreadcrumbs } from '../../store/Common/commonThunk';
import GarageItemCard from '../../components/itemCards/GarageItemCard/GarageItemCard';
import { GarageContainer } from './Garage.style';
import {
  deleteTransport,
  getTransports,
  handleSortTransportsData,
  unshareTransport,
} from '../../store/garage/garageThunk';
import CircularButton from '../../components/buttons/CilrcularButton';
import { AddBottomButtonContainer } from '../../shared/styles/AddBottomButtonContainer';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import { clearTransportsState, removeTransport, setTransportsData } from '../../store/garage/garageSlice';
import { GarageItemModel, GarageItemSharedUserModel } from '../../shared/models/garage.model';
import router from '../../shared/services/router';
import { PageStubContainer } from '../../shared/styles/StubContainer';
import WelcomeStub from '../../components/stubs/WelcomeStub';
import { garageWelcomePageStubConfig } from '../../shared/configs/welcomePageStubs/garageWelcomePageStub.config';
import Stub from '../../components/stubs/Stub';
import { garageNoItemsStubConfig } from '../../shared/configs/stub.config';
import modalObserver from '../../shared/utils/observers/modalObserver';

const Garage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.garage.transports.data);
  const isStopPagination = useAppSelector((state) => state.garage.transports.isStopPagination);
  const [preload, setPreload] = useState(false);
  const profileData = useAppSelector(({ profile }) => profile.data);
  const isOpenRightSidebar = useAppSelector(({ rightSidebar }) => rightSidebar.isOpenRightSidebar);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = data.findIndex(({ id }) => id === active.id);
      const newIndex = data.findIndex(({ id }) => id === over.id);

      const canceledSort = data;

      dispatch(setTransportsData(arrayMove(data, oldIndex, newIndex)));
      dispatch(handleSortTransportsData({ id: active.id, index: newIndex, canceledSort }));
    }
  };

  const handleCreateTransport = () => {
    modalObserver.addModal(ModalNamesEnum.garageGeneralInfo, { props: {} });
  };

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.garage') }]));
  }, [dispatch, t]);

  useEffect(() => {
    dispatch(getTransports()).finally(() => setPreload(true));
    return () => {
      dispatch(clearTransportsState());
    };
  }, [dispatch]);

  const handleOpenTransportItem = useCallback(
    (transportItem: GarageItemModel) => {
      navigate(`${router.garage.path}/${transportItem.id}`);
    },
    [navigate],
  );

  const handleDeleteTransport = useCallback(
    (id: number) => {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.deleteTransport.title'),
          text: t('general.modals.deleteTransport.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            dispatch(deleteTransport(id));
          },
        },
      });
    },
    [dispatch, t],
  );

  const handleSharedWith = useCallback(
    (id: number, users: GarageItemSharedUserModel[]) => {
      navigate(`${router.garage.path}/${id}`);
      modalObserver.addModal(ModalNamesEnum.transportSharing, {
        props: { data: users, transportId: id },
      });
    },
    [navigate],
  );

  const handleUnShare = useCallback(
    (id: number) => {
      if (id) {
        modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
          props: {
            title: t('general.modals.confirmCancelSharing.title'),
            text: t('general.modals.confirmCancelSharing.text'),
            cancelBtnText: t('general.buttons.cancel'),
            confirmBtnText: t('general.buttons.confirm'),
            handleConfirm: () =>
              dispatch(unshareTransport(id)).then((result) => {
                if (unshareTransport.fulfilled.match(result)) {
                  dispatch(removeTransport(id));
                }
              }),
          },
        });
      }
    },
    [dispatch, t],
  );

  const transportMenu = useCallback(
    (transportItem: GarageItemModel) => {
      let menu = [
        {
          callback: () => handleOpenTransportItem(transportItem),
          isDisabled: false,
          label: t('general.actionMenus.viewDetails'),
        },
      ];
      if (transportItem.is_personal) {
        menu = [
          ...menu,
          {
            label: t('general.actionMenus.shareWith'),
            isDisabled: false,
            callback: () => handleSharedWith(transportItem.id, transportItem.shared_users),
          },
          {
            callback: () => handleDeleteTransport(transportItem.id),
            isDisabled: false,
            label: t('general.actionMenus.deleteItem'),
          },
        ];
      } else {
        menu = [
          ...menu,
          {
            callback: () => handleUnShare(transportItem.id),
            isDisabled: false,
            label: t('general.actionMenus.cancelSharing'),
          },
        ];
      }
      return menu;
    },
    [handleDeleteTransport, handleOpenTransportItem, handleSharedWith, handleUnShare, t],
  );

  const handleScroll = (e: any) => {
    if (isStopPagination) return;

    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom) {
      dispatch(getTransports());
    }
  };

  if (profileData?.view_data.is_view_garage === false) {
    return (
      <PageStubContainer isWelcomeSlider>
        <WelcomeStub sliderOptions={garageWelcomePageStubConfig} />
      </PageStubContainer>
    );
  }
  if (preload && data.length === 0) {
    return (
      <GarageContainer>
        <AddBottomButtonContainer isOpenRightSidebar={isOpenRightSidebar}>
          <CircularButton size="large" onClick={() => handleCreateTransport()} />
        </AddBottomButtonContainer>
        <PageStubContainer>
          <Stub value={garageNoItemsStubConfig} />
        </PageStubContainer>
      </GarageContainer>
    );
  }

  return (
    <GarageContainer>
      <AddBottomButtonContainer isOpenRightSidebar={isOpenRightSidebar}>
        <CircularButton size="large" onClick={() => handleCreateTransport()} />
      </AddBottomButtonContainer>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext items={data} strategy={rectSortingStrategy}>
          <Grid
            container
            rowSpacing="35px"
            onScroll={handleScroll}
            columnSpacing="20px"
            sx={(theme) => ({
              overflow: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '& ::-webkit-scrollbar': {
                width: '0px !important',
              },
              [theme.breakpoints.down('sm')]: {
                justifyContent: 'center',
              },
            })}
          >
            {preload && data ? (
              <>
                {data.map((item, index) => (
                  <Grid item key={index}>
                    <GarageItemCard
                      item={item}
                      onViewFile={() => {}}
                      onClickCard={() => navigate(`${router.garage.path}/${item.id}`)}
                      menuListItems={transportMenu(item)}
                    />
                  </Grid>
                ))}
                {/* {isStopPagination === false && */}
                {/*  Array(4) */}
                {/*    .fill('') */}
                {/*    .map((_, index) => ( */}
                {/*      <Grid item key={index}> */}
                {/*        <Skeleton height="495px" width="380px" variant="rectangular" /> */}
                {/*      </Grid> */}
                {/*    ))} */}
              </>
            ) : (
              Array(8)
                .fill('')
                .map((_, index) => (
                  <Grid item key={index}>
                    <Skeleton
                      sx={{ borderRadius: '5px' }}
                      height="495px"
                      width="380px"
                      variant="rectangular"
                    />
                  </Grid>
                ))
            )}
          </Grid>

          <DragOverlay>
            {activeId ? (
              <GarageItemCard
                item={data.find((item) => item.id === activeId) as GarageItemModel}
                onViewFile={() => {}}
                onClickCard={() => {}}
                menuListItems={[]}
              />
            ) : null}
          </DragOverlay>
        </SortableContext>
      </DndContext>
    </GarageContainer>
  );
};

export default Garage;
