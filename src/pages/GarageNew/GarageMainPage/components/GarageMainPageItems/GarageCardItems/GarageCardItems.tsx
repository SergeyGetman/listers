import React, { UIEvent, useEffect, useMemo, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  GaragaPageContainer,
  GarageCardItemContainer,
  GarageSkeletonContainer,
} from '../../../GarageMainPage.style';
import { FilterPanel } from '../FilterPanel/FilterPanel';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/redux';
import GarageCardItem, { StatusTransport } from './GarageCardItem/GarageCardItem';
import 'swiper/css';
import 'swiper/css/pagination';
import { GarageContainer, GarageSwiperContainer } from './GarageCardItems.style';
import {
  getFilterParamsSelector,
  getGarageData,
  getGarageMetaSelector,
  getIsEmptyGarageDataWithFiltersSelector,
  getIsListOverSelector,
  getIsLoadingGarageSelector,
} from '../../../../store/garage-selectors';
import { setBreadcrumbs } from '../../../../../../store/Common/commonThunk';
import { getTransportsV2, setNewTransportPosition } from '../../../../store/garageThunkV2';
import { clearTransportsState, setTransportDataWithNewPosition } from '../../../../store/garageSliceV2';
import { renderSkeleton } from '../../../../utils/renderSkeleton';
import { GarageMainPageStub } from '../../GarageMainPageStub/GarageMainPageStub';
import { NoItemsGarage } from '../../../../components/NoItemsGarage/NoItemsGarage';

import { RootGarageItemsData } from '../../../../store/types';
import { TodoContainer } from '../../../../../TodoNew/components/Checklists/Checklists.style';

export const GarageCardItems = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isLoadingGarage = useAppSelector(getIsLoadingGarageSelector);
  const garageFilters = useAppSelector(getFilterParamsSelector);
  const isEmptyGarageDataWithFilters = useAppSelector(getIsEmptyGarageDataWithFiltersSelector);
  const garageItemsData = useAppSelector(getGarageData);
  const isListOver = useAppSelector(getIsListOverSelector);
  const garageMeta = useAppSelector(getGarageMetaSelector);

  const itemsForDnD = useMemo(() => {
    return garageItemsData.filter(
      (garage) =>
        garage.current.confirm_status !== StatusTransport.pending && garage.current.position !== null,
    );
  }, [garageItemsData]);

  const [transportActiveItem, setTransportActiveItem] = useState<RootGarageItemsData>();

  const fetchMoreData = () => {
    if (!isListOver) {
      dispatch(
        getTransportsV2({
          page: garageMeta.current_page + 1,
          shared_filters: garageFilters.shared_filters,
          query: !!garageFilters.query ? garageFilters.query : null,
        }),
      );
    }
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (bottom && isLoadingGarage) {
      fetchMoreData();
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 2,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setTransportActiveItem(garageItemsData.find((transport) => transport.id === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeItem = garageItemsData.find((transport) => transport.id === active.id);
    const overItem = garageItemsData.find((transport) => transport.id === over.id);

    if (overItem?.current.position === null) return;
    if (!activeItem || !overItem) return;

    const activeIndex = garageItemsData.findIndex((transport) => transport.id === active.id);
    const overIndex = garageItemsData.findIndex((transport) => transport.id === over.id);

    if (activeIndex !== overIndex) {
      const newPositionData = arrayMove(garageItemsData, activeIndex, overIndex);
      dispatch(setTransportDataWithNewPosition({ newPositionData }));
      dispatch(
        setNewTransportPosition({
          activeId: activeItem.id,
          indexTransport: overIndex,
          oldPositionData: garageItemsData,
        }),
      );
    }
    setTransportActiveItem(undefined);
  };

  const handleDragCancel = () => setTransportActiveItem(undefined);

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.garage') }]));

    dispatch(
      getTransportsV2({
        shared_filters: garageFilters.shared_filters,
        query: !!garageFilters.query ? garageFilters.query : null,
      }),
    );
    return () => {
      dispatch(clearTransportsState());
    };
  }, [dispatch, t, garageFilters]);

  if (isLoadingGarage && !garageItemsData.length && !isEmptyGarageDataWithFilters) {
    return <GarageMainPageStub />;
  }
  return (
    <GaragaPageContainer>
      <TodoContainer sx={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} onScroll={handleScroll}>
        <FilterPanel />
        <GarageContainer>
          {!isLoadingGarage && !garageItemsData.length && (
            <GarageSkeletonContainer>{renderSkeleton(isMobile ? 1 : 5)}</GarageSkeletonContainer>
          )}

          {isLoadingGarage && isEmptyGarageDataWithFilters && !garageItemsData.length && <NoItemsGarage />}

          {!isMobile ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              onDragCancel={handleDragCancel}
            >
              <SortableContext
                items={itemsForDnD}
                disabled={!!garageFilters.shared_filters.length || !!garageFilters.query}
                strategy={rectSortingStrategy}
              >
                {garageItemsData?.map((garage) => (
                  <GarageCardItemContainer key={garage.id}>
                    <GarageCardItem key={garage.id} item={garage} filters={garageFilters} />
                  </GarageCardItemContainer>
                ))}
                {!isLoadingGarage && !!garageItemsData.length && (
                  <GarageSkeletonContainer>{renderSkeleton(2)}</GarageSkeletonContainer>
                )}
                <DragOverlay>
                  {transportActiveItem ? (
                    <GarageCardItem isDnD item={transportActiveItem} filters={garageFilters} />
                  ) : null}
                </DragOverlay>
              </SortableContext>
            </DndContext>
          ) : (
            <GarageSwiperContainer>
              <Swiper
                slidesPerView={1.2}
                spaceBetween={16}
                centeredSlides
                initialSlide={0}
                allowTouchMove
                pagination={{
                  clickable: true,
                }}
                loop
                modules={[Pagination]}
                onSlideChange={(swiper) => {
                  if (!isLoadingGarage) return;

                  if (
                    swiper.realIndex > swiper.slides.length - 7 &&
                    garageItemsData.length < garageMeta.total
                  ) {
                    fetchMoreData();
                  }
                }}
                className="mySwiper"
              >
                {garageItemsData.map((garage) => (
                  <SwiperSlide key={garage.model}>
                    <GarageCardItem key={garage.id} item={garage} filters={garageFilters} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </GarageSwiperContainer>
          )}
        </GarageContainer>
      </TodoContainer>
    </GaragaPageContainer>
  );
};
