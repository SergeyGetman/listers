import React, { useCallback, useEffect, useState } from 'react';
import { Box, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { setBreadcrumbs } from '../../../../store/Common/commonThunk';
import {
  PlansComingSoonHubsContainer,
  PlansPricingCardContainer,
  PlansPricingCardsContainer,
  PlansPricingContainer,
  PlansSwiperContainer,
} from './Plans.style';
import { getPlans } from '../../../../store/settings/settingsThunk';
import { resetPlansState } from '../../../../store/settings/settingsSlice';
import { PlanPeriodEnum } from '../../../../shared/enums/planPeriodEnum';
import { PlanModel } from '../../../../shared/models/plans.model';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import 'swiper/css';
import 'swiper/css/pagination';
import MuiTabs from '../../../../components/Tabs';
import { planDescriptionConfig, planListConfig } from './config';
import PlanItemCard from './components/PlanItemCard';
import modalObserver from '../../../../shared/utils/observers/modalObserver';
import { PlansPricingItemEnum } from '../../../../shared/enums/plansPricingItem.enum';
import ComingSoonHubs from './components/ComingSoon';

const Plans = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile.data);
  const { data } = useAppSelector((state) => state.settings.plans);
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('lg'));
  const matchSmallDisplay = useMediaQuery('(max-width:815px)');
  // TODO revert when Vasiliy deploy fix
  const [period, setPeriod] = useState(PlanPeriodEnum.month);
  const [swiperRef, setSwiperRef] = useState<SwiperCore | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedIndex, setSelectedIndex] = useState(1);

  // TODO add enum plans key

  const getPlanButtonLabel = useCallback(
    (planId: number) => {
      if (profile?.next_subscription?.package_id === planId) {
        return t('plans.button.from', {
          date: moment(profile?.subscription?.real_package_end).format('MM.DD.YYYY'),
        });
      }
      if (profile?.subscription?.package_canceled !== null && profile?.subscription.package_id === planId) {
        return t('plans.button.till', {
          date: moment(profile?.subscription?.real_package_end).format('MM.DD.YYYY'),
        });
      }
      if (profile?.subscription.package_id === planId) {
        return t('plans.button.current');
      }

      return t('plans.button.choose');
    },
    [profile, t],
  );

  useEffect(() => {
    if (swiperRef) {
      swiperRef.slideTo(1, 300);
    }
  }, [swiperRef]);

  const handleChangePeriod = (value: PlanPeriodEnum) => {
    dispatch(getPlans(value)).then((result) => {
      if (getPlans.fulfilled.match(result)) {
        setPeriod(value);
      }
    });
  };

  useEffect(() => {
    if (profile?.subscription?.period) {
      setPeriod(profile?.subscription?.period);
    }
  }, [profile]);

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.settings.plans') }]));
    setPeriod(profile?.subscription?.period || PlanPeriodEnum.month);
    dispatch(getPlans(profile?.subscription?.period || PlanPeriodEnum.month));

    return () => {
      dispatch(resetPlansState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, profile.subscription?.period]);

  const handleChangePlan = useCallback(
    (item: PlanModel) => {
      if (profile) {
        if (!profile?.card_data && item.tag !== PlansPricingItemEnum.starter) {
          modalObserver.addModal(ModalNamesEnum.addPlanCard, {
            props: {
              plan: item,
            },
          });
          return;
        }
        if (item.priority < profile.subscription.priority) {
          if (item?.name !== profile.subscription?.name) {
            modalObserver.addModal(ModalNamesEnum.downgradePlanNew, {
              props: {
                downgradePlan: item,
              },
            });
          }
        } else {
          modalObserver.addModal(ModalNamesEnum.upgradePlan, {
            props: {
              plan: item,
            },
          });
        }
      }
    },
    [profile],
  );

  // TODO any
  const planItemRender = useCallback(
    (item: any) => {
      return (
        <PlansPricingCardContainer key={item.id} matchSmallDisplay={matchSmallDisplay} match={match}>
          <PlanItemCard
            isFree={item.amount === 0}
            title={item.name}
            firstPrice={
              item.amount !== 0
                ? {
                    price: `$${item.amount / 100}`,
                    period: `/${item.period}`,
                  }
                : undefined
            }
            month_amount={item.month_amount}
            amount={item.amount}
            cardHeight={item.tag === 'starter' || item.tag === 'premium' ? '335px' : '350px'}
            buttonLabel={getPlanButtonLabel(item.id)}
            period={item.period}
            description={planDescriptionConfig[item.tag]?.description}
            CrownIcon={planDescriptionConfig[item.tag]?.icon}
            list={planListConfig[item.tag]}
            isCurrent={profile?.subscription.package_id === item.id}
            onClick={() => handleChangePlan(item)}
          />
        </PlansPricingCardContainer>
      );
    },
    [matchSmallDisplay, match, handleChangePlan, getPlanButtonLabel, profile?.subscription.package_id],
  );

  return (
    <PlansPricingContainer>
      <Box
        sx={{
          [theme.breakpoints.down('md')]: {
            mt: '18px',
          },
        }}
        display="flex"
        justifyContent="center"
      >
        <MuiTabs
          options={[
            {
              name: t('plans.pricing.switch.monthly'),
              key: PlanPeriodEnum.month,
              isDisabled: profile?.subscription?.period === PlanPeriodEnum.year,
              isShowTooltip: profile?.subscription?.period === PlanPeriodEnum.year,
              tooltipText: t('general.tooltips.monthlyPlanDisabled'),
            },
            { name: t('plans.pricing.switch.annually'), key: PlanPeriodEnum.year },
          ]}
          value={period}
          handleChanged={(newPeriod) => handleChangePeriod(newPeriod as PlanPeriodEnum)}
        />
      </Box>
      <Box m="8px 0 48px" display="flex" justifyContent="center">
        <Typography
          sx={{
            color: theme.palette.case.neutral.n600,
          }}
          variant="large"
        >
          {t('plans.pricing.discount')}
        </Typography>
      </Box>
      <PlansPricingCardsContainer matchSmallDisplay={matchSmallDisplay}>
        {!matchSmallDisplay ? (
          !!data.length ? (
            data.map(planItemRender)
          ) : (
            Array(3)
              .fill('')
              .map((item, i) => (
                <PlansPricingCardContainer key={i} matchSmallDisplay={matchSmallDisplay} match={match}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      minWidth: 240,
                      height: item.tag === 'starter' || item.tag === 'premium' ? '335px' : '350px',
                      borderRadius: '20px',
                    }}
                  />
                </PlansPricingCardContainer>
              ))
          )
        ) : !!data.length ? (
          <PlansSwiperContainer>
            <Swiper
              onSwiper={(swiper) => setSwiperRef(swiper)}
              slidesPerView="auto"
              centeredSlides
              spaceBetween={8}
              onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
              className="mySwiper"
            >
              {data.map((item, index) => (
                <SwiperSlide key={index}>{planItemRender(item)}</SwiperSlide>
              ))}
            </Swiper>
          </PlansSwiperContainer>
        ) : (
          <PlansSwiperContainer>
            <Swiper
              onSwiper={(swiper) => setSwiperRef(swiper)}
              slidesPerView="auto"
              centeredSlides
              spaceBetween={8}
              onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
              className="mySwiper"
            >
              {Array(3)
                .fill('')
                .map((item, index) => (
                  <SwiperSlide key={index}>
                    <PlansPricingCardContainer matchSmallDisplay={matchSmallDisplay} match={match}>
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          minWidth: 240,
                          height: item.tag === 'starter' || item.tag === 'premium' ? '334px' : '350px',
                          borderRadius: '20px',
                        }}
                      />
                    </PlansPricingCardContainer>
                  </SwiperSlide>
                ))}
            </Swiper>
          </PlansSwiperContainer>
        )}
      </PlansPricingCardsContainer>

      <Box m="48px 0 24px 0" sx={{ textAlign: 'center' }}>
        <Typography variant="h3">{t('plans.pricing.description')}</Typography>
      </Box>
      <PlansComingSoonHubsContainer>
        <ComingSoonHubs />
      </PlansComingSoonHubsContainer>
    </PlansPricingContainer>
  );
};

export default Plans;
