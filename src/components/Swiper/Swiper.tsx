import React, { FC, useCallback, useEffect, useState } from 'react';
import SwiperCore, { Virtual, Navigation, Pagination } from 'swiper';
import { Swiper } from 'swiper/react';

import { SwiperContainer, SwiperNextBtn, SwiperPrevBtn } from './Swiper.style';
import NavigationButton from '../buttons/NavigationButton';

type SliderProps = {
  selectedIndex?: number;
  onChangeActiveIndex: (index: number) => void;
  allowTouchMove?: boolean;
  children: React.ReactNode;
};

SwiperCore.use([Virtual, Navigation, Pagination]);

const Slider: FC<SliderProps> = ({
  selectedIndex = 0,
  onChangeActiveIndex,
  allowTouchMove = true,
  children,
}) => {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
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
    <SwiperContainer>
      <Swiper
        onSwiper={(swiper) => setSwiperRef(swiper)}
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        virtual
        allowTouchMove={allowTouchMove}
        centeredSlides
        navigation={{ prevEl, nextEl }}
        onSlideChange={(swiper) => onChangeActiveIndex(swiper.activeIndex)}
      >
        {children}
        <SwiperNextBtn
          isFirstImage={selectedIndex === 0}
          ref={(node: React.SetStateAction<HTMLElement | null>) => setPrevEl(node)}
        >
          <NavigationButton size="large" type="back" />
        </SwiperNextBtn>
        <SwiperPrevBtn
          isLastImage={false}
          ref={(node: React.SetStateAction<HTMLElement | null>) => setNextEl(node)}
        >
          <NavigationButton size="large" type="next" />
        </SwiperPrevBtn>
      </Swiper>
    </SwiperContainer>
  );
};

export default Slider;
