import React, { FC, useCallback, useEffect, useState } from 'react';
import SwiperCore, { Virtual, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import NavigationButton from '../../../buttons/NavigationButton';
import { GallerySwiperContainer, GallerySwiperNextBtn, GallerySwiperPrevBtn } from './GallerySwiper.style';
import 'swiper/css/lazy';

import GalleryImage from './GalleryImage';

import { MediaType } from '../../../../shared/models/media.model';

type GallerySwiperProps = {
  images: MediaType[];
  selectedIndex?: number;
  onChangeActiveIndex: (index: number) => void;
  handleOpenViewModal: (isSmallGallery?: boolean) => void;
};

SwiperCore.use([Virtual, Navigation, Pagination]);

const GallerySwiper: FC<GallerySwiperProps> = ({
  images,
  selectedIndex = 1,
  onChangeActiveIndex,

  handleOpenViewModal,
}) => {
  const [prevEl, setPrevEl] = useState<any | null>(null);
  const [nextEl, setNextEl] = useState<any | null>(null);
  const [swiperRef, setSwiperRef] = useState<SwiperCore | null>(null);

  const slideTo = useCallback(
    (index: number) => {
      if (swiperRef) {
        swiperRef.slideTo(index, 300);
      }
    },
    [swiperRef],
  );

  useEffect(() => {
    slideTo(selectedIndex);
  }, [selectedIndex, slideTo]);

  return (
    <GallerySwiperContainer>
      <Swiper
        onSwiper={(swiper) => setSwiperRef(swiper)}
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        virtual
        centeredSlides
        navigation={{ prevEl, nextEl }}
        onSlideChange={(swiper) => onChangeActiveIndex(swiper.activeIndex)}
      >
        {images.map((image) => (
          <SwiperSlide
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            key={image.id}
            onClick={() => handleOpenViewModal(false)}
          >
            <GalleryImage image={image} />
          </SwiperSlide>
        ))}

        <GallerySwiperNextBtn isFirstImage={selectedIndex === 0} ref={(node) => setPrevEl(node)}>
          <NavigationButton size="large" type="back" />
        </GallerySwiperNextBtn>
        <GallerySwiperPrevBtn
          isLastImage={selectedIndex === images.length - 1}
          ref={(node) => setNextEl(node)}
        >
          <NavigationButton size="large" type="next" />
        </GallerySwiperPrevBtn>
      </Swiper>
    </GallerySwiperContainer>
  );
};

export default GallerySwiper;
