import React, { FC, useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DowngradeContentContainer from '../../DowngradeContentContainer';
import { ReactComponent as HubmeekOffer } from '../../../../../../../../assets/Images/hubbmeek/Hubmeek-offer.svg';
import { DiscountBlock, DiscountContainer, TextContainer } from './PriceToMuch.style';
import { useAppDispatch, useAppSelector } from '../../../../../../../../shared/hooks/redux';
import {
  getCurrentSubscriptionSelector,
  isLoadingSelector,
} from '../../../DowngradeContainer/selector/selectors';
import { DiscountLabel } from './DiscountLabel/DiscountLabel';
import {
  applyDiscount,
  getDowngradeSubscription,
} from '../../../../../../../../store/settings/settingsThunk';
import { STEP_CASE } from '../../../DowngradeContainer/enum/stepCaseEnum';
import { setLoading } from '../../../../../../../../store/Common/commonSlice';
import { NotificationService } from '../../../../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { PlanPeriodEnum } from '../../../../../../../../shared/enums/planPeriodEnum';

type PropsType = {
  canselSubscription: () => void;
  setNewStep: (newStep: STEP_CASE, newHeader: string, step: number, stepIndicator?: boolean) => void;
};

const PriceToMuch: FC<PropsType> = ({ canselSubscription, setNewStep }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLoading = useAppSelector(isLoadingSelector);
  const currentSubscription = useAppSelector(getCurrentSubscriptionSelector);
  const { t } = useTranslation();
  const [disabledAccept, setDisabledAccept] = useState(false);

  const acceptDiscount = async () => {
    dispatch(setLoading(true));
    await dispatch(getDowngradeSubscription())
      .unwrap()
      .then(async (res) => {
        if (!!res.length) {
          const discountID = String(res[0].id);
          await dispatch(applyDiscount(discountID));
          setNewStep(STEP_CASE.DISCOUNT_OFFER, t('plans.downgrade.header.discountOffer'), 3, false);
        } else {
          setDisabledAccept(true);
          NotificationService.error('you have already used a discount coupon before');
        }
      })
      .finally(() => dispatch(setLoading(false)));
  };

  useEffect(() => {
    if (currentSubscription.period === PlanPeriodEnum.year) {
      setDisabledAccept(true);
    }
  }, [currentSubscription.period]);

  return (
    <DowngradeContentContainer
      title=""
      isShowTitle={false}
      rightBtnProps={{
        isShow: true,
        label: t('plans.button.accept'),
        onClick: acceptDiscount,
        variant: 'contained',
        fullWidth: isMobile,
        type: 'button',
        isDisabled: !!isLoading || disabledAccept,
      }}
      leftBtnProps={{
        isShow: true,
        label: t('plans.button.downgrade'),
        variant: 'outlined',
        onClick: canselSubscription,
        type: 'button',
        fullWidth: isMobile,
        isDisabled: !!isLoading,
      }}
    >
      <Box width="100%" px="24px">
        <DiscountBlock>
          <DiscountContainer isMobile={isMobile}>
            <TextContainer isMobile={isMobile}>
              <Typography
                sx={{
                  color: theme.palette.case.neutral.n900,
                  fontSize: !isMobile ? '56px' : '40px',
                  lineHeight: '42px',
                }}
                variant="h1"
              >
                {t('plans.downgrade.priceToMuch.content.get50')}
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.case.neutral.n800,
                }}
                mt={isMobile ? '12px' : '16px'}
                variant={isMobile ? 's1' : 'h3'}
              >
                {t('plans.downgrade.priceToMuch.content.somethingSpecial')}
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.case.neutral.n700,
                }}
                mt={isMobile ? '6px' : '10px'}
                variant="t14r"
              >
                {t('plans.downgrade.priceToMuch.content.off50')}
              </Typography>
            </TextContainer>
            <Box display="flex" alignItems="center" justifyContent="center" mt={isMobile ? '32px' : '0'}>
              <HubmeekOffer
                style={{
                  width: isMobile ? '132px' : '164px',
                  height: isMobile ? '225px' : '279px',
                }}
              />
            </Box>
          </DiscountContainer>
          <DiscountLabel />
        </DiscountBlock>
      </Box>
    </DowngradeContentContainer>
  );
};

export default PriceToMuch;
