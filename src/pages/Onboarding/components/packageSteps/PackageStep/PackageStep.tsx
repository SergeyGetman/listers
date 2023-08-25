import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useTranslation } from 'react-i18next';
import OnboardingPlanItem from '../../OnboardingPlanItem';
import { PlansPricingItemEnum } from '../../../../../shared/enums/plansPricingItem.enum';
import { PackageSwiperContainer } from './PackageStep.styled';
import MuiTabs from '../../../../../components/Tabs';
import { PlanPeriodEnum } from '../../../../../shared/enums/planPeriodEnum';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { getPlans } from '../../../../../store/settings/settingsThunk';
import { setLoading } from '../../../../../store/Common/commonSlice';

const PlansStep = ({ selectedPlan, setSelectedPlan, period, setPeriod, recommendedPlan }: any) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [swiperRef, setSwiperRef] = useState<SwiperCore | null>(null);
  const dispatch = useAppDispatch();
  const plans = useAppSelector((state) => state.settings.plans.data);

  const handleSelectPlan = (packageName: PlansPricingItemEnum) => {
    setSelectedPlan(packageName);
  };

  const handleChangePeriod = (value: PlanPeriodEnum) => {
    setPeriod(value);
  };

  const sortedPlans = useMemo(() => {
    if (!!plans.length) {
      if (recommendedPlan === PlansPricingItemEnum.premium) {
        return [plans[0], plans[2], plans[1]];
      }
      return plans;
    }
    return [];
  }, [plans, recommendedPlan]);

  const slideTo = useCallback(
    (index: number) => {
      if (swiperRef) {
        swiperRef.slideTo(index, 300);
      }
    },
    [swiperRef],
  );

  const handleClickPlan = (tag: PlansPricingItemEnum, index: number) => {
    slideTo(index);
    handleSelectPlan(tag);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getPlans(period)).finally(() => dispatch(setLoading(false)));
  }, [dispatch, period]);

  useEffect(() => {
    if (isMobile && swiperRef) {
      if (recommendedPlan === PlansPricingItemEnum.starter) {
        slideTo(sortedPlans.findIndex((el) => el.tag === PlansPricingItemEnum.basic));
        return;
      }
      slideTo(sortedPlans.findIndex((el) => el.tag === selectedPlan));
    }
  }, [swiperRef, isMobile, selectedPlan, recommendedPlan, slideTo, sortedPlans]);

  if (!sortedPlans.length) {
    return null;
  }

  return (
    <Box>
      <Box
        sx={{
          mt: '10px',
          [theme.breakpoints.down('md')]: {
            mt: '0px',
          },
        }}
        display="flex"
        justifyContent="center"
      >
        <MuiTabs
          options={[
            { name: t('plans.pricing.switch.monthly'), key: PlanPeriodEnum.month },
            { name: t('plans.pricing.switch.annually'), key: PlanPeriodEnum.year },
          ]}
          value={period}
          handleChanged={(newPeriod) => handleChangePeriod(newPeriod as PlanPeriodEnum)}
        />
      </Box>
      <Box m="8px 0 29px" display="flex" justifyContent="center">
        <Typography
          sx={{
            color: theme.palette.case.neutral.n600,
          }}
          variant="default"
        >
          {t('plans.pricing.discount')}
        </Typography>
      </Box>

      {isMobile ? (
        <PackageSwiperContainer>
          <Swiper
            onSwiper={(swiper) => setSwiperRef(swiper)}
            slidesPerView="auto"
            centeredSlides
            spaceBetween={20}
          >
            {sortedPlans.map((item, index) => (
              <SwiperSlide key={index}>
                <OnboardingPlanItem
                  isMiddle={index === 1}
                  period={period}
                  recommended={item?.tag === selectedPlan}
                  planItem={item}
                  isShowUserChouse={!(sortedPlans[1].tag === PlansPricingItemEnum.premium)}
                  onClick={() => handleClickPlan(item.tag, index)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </PackageSwiperContainer>
      ) : (
        <Grid width="100%" container rowSpacing="16px" columnSpacing="16px" alignItems="center">
          {sortedPlans.map((item, index) => (
            <Grid key={index} xs={12} sm={4} item>
              <OnboardingPlanItem
                isMiddle={index === 1}
                period={period}
                recommended={item?.tag === selectedPlan}
                isShowUserChouse={!(sortedPlans[1].tag === PlansPricingItemEnum.premium)}
                planItem={item}
                onClick={() => handleClickPlan(item.tag, index)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PlansStep;
