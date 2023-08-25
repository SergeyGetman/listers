import React, { FC, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Typography, useTheme, Zoom } from '@mui/material';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { StubLine } from '../Stub/Stub.style';
import { ViewContainersEnum } from '../../../shared/enums/viewContainers.enum';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { setViewDataItem } from '../../../store/Profile/profile.actions';
import NavigationButton from '../../buttons/NavigationButton';
import MuiLinkTextButton from '../../buttons/MuiLinkTextButton';
import router from '../../../shared/services/router';
import { getSupportThread } from '../../../store/chat/chatThunk';
import { setLoading } from '../../../store/Common/commonSlice';
import MuiButton from '../../buttons/MuiButton';

import { ReactComponent as Hubmeek } from '../../../assets/Images/hubbmeek/hubmeek-like.svg';
// TODO storybook

import {
  WelcomeStubButtonSkip,
  WelcomeStubContainer,
  WelcomeStubContainerSlide,
  WelcomeStubLastSlide,
  WelcomeStubSlideImg,
} from './WelcomeStub.style';

type WelcomeStubProps = {
  sliderOptions: {
    id: ViewContainersEnum;
    slides: {
      title: string;
      description?: string;
      imgDesktop?: string;
      imgMobile?: string;
    }[];
  };
};

const SlideNextButton = () => {
  const swiper = useSwiper();
  return <NavigationButton type="next" size="large" onClick={() => swiper.slideNext()} />;
};

const SlidePrevButton = () => {
  const swiper = useSwiper();
  return <NavigationButton type="back" size="large" onClick={() => swiper.slidePrev()} />;
};

const WelcomeStub: FC<WelcomeStubProps> = ({ sliderOptions }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('sm')}`);
  const isTabbletDisplay = useMediaQuery(`${theme.breakpoints.down('md')}`);
  const navigate = useNavigate();
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSkipWelcomeStub = () => {
    dispatch(setViewDataItem({ entity: sliderOptions.id }));
  };

  const openSupportChat = () => {
    dispatch(setLoading(true));
    dispatch(getSupportThread())
      .then((result) => {
        if (getSupportThread.fulfilled.match(result)) {
          navigate(`/chat/personal/${result.payload.id}`);
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <WelcomeStubContainer>
      <WelcomeStubContainerSlide>
        <Swiper
          // @ts-ignore

          spaceBetween={60}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          pagination={{
            clickable: true,
          }}
          onActiveIndexChange={(swiperCore) => {
            if (swiperCore.isEnd) {
              setIsEnd(true);
            } else {
              setIsEnd(false);
            }
            if (swiperCore.isBeginning) {
              setIsStart(true);
            } else {
              setIsStart(false);
            }
          }}
          grabCursor
        >
          {sliderOptions.slides.map((item, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  display: 'flex',
                  maxWidth: '718px',
                  alignItem: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant={isSmallDisplay ? 'h3' : 'h2'}>{item.title}</Typography>
                <Typography
                  sx={{ margin: '16px 0 16px 0', minHeight: { sm: '60px', xs: '100px' } }}
                  variant={isSmallDisplay ? 'small' : 'large'}
                >
                  {item.description}
                </Typography>
                <StubLine />

                <WelcomeStubSlideImg>
                  <img
                    src={isSmallDisplay ? item.imgMobile : item.imgDesktop}
                    alt="Welcome"
                    className="profile-bg-stub"
                  />
                </WelcomeStubSlideImg>
              </Box>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <Box
              sx={{
                display: 'flex',
                maxWidth: '768px',
                alignItem: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography variant={isSmallDisplay ? 'h3' : 'h2'}>
                {t('stubs.welcomePage.feedbackScreen.title')}
              </Typography>
              <Typography
                sx={{
                  margin: '16px 0 16px 0',
                  minHeight: { sm: '60px', xs: '100px' },
                }}
                variant={isSmallDisplay ? 'small' : 'large'}
              >
                {t('stubs.welcomePage.feedbackScreen.description.partFirst')}{' '}
                <MuiLinkTextButton
                  sx={{
                    fontSize: isSmallDisplay
                      ? theme.typography.small.fontSize
                      : theme.typography.large.fontSize,
                  }}
                  onClick={() => navigate(router.feedback.path)}
                  label={t('stubs.welcomePage.feedbackScreen.description.feedback')}
                />{' '}
                {t('stubs.welcomePage.feedbackScreen.description.partSecond')}{' '}
                <MuiLinkTextButton
                  sx={{
                    fontSize: isSmallDisplay
                      ? theme.typography.small.fontSize
                      : theme.typography.large.fontSize,
                  }}
                  onClick={() => openSupportChat()}
                  label={t('stubs.welcomePage.feedbackScreen.description.hubmeeSupport')}
                />{' '}
                {t('stubs.welcomePage.feedbackScreen.description.partThird')}
              </Typography>

              <StubLine />

              <WelcomeStubLastSlide>
                <Hubmeek />
                <MuiButton
                  onClick={() => handleSkipWelcomeStub()}
                  label={t('stubs.welcomePage.feedbackScreen.button')}
                  size="small"
                />
              </WelcomeStubLastSlide>
            </Box>
          </SwiperSlide>
          {!isTabbletDisplay && (
            <Box sx={{ position: 'absolute', top: '50%', left: 0, zIndex: 10 }}>
              <Zoom in={!isStart}>
                <Box>
                  <SlidePrevButton />
                </Box>
              </Zoom>
            </Box>
          )}

          {!isTabbletDisplay && (
            <Box sx={{ position: 'absolute', top: '50%', right: 0, zIndex: 10 }}>
              <Zoom in={!isEnd}>
                <Box>
                  <SlideNextButton />
                </Box>
              </Zoom>
            </Box>
          )}
        </Swiper>
      </WelcomeStubContainerSlide>
      <Zoom in={!isEnd}>
        <WelcomeStubButtonSkip onClick={() => handleSkipWelcomeStub()} size="small" variant="text">
          {t('general.buttons.skip')}
        </WelcomeStubButtonSkip>
      </Zoom>
    </WelcomeStubContainer>
  );
};

export default WelcomeStub;
