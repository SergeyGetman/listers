import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js/pure';
import { Elements } from '@stripe/react-stripe-js';
import { PlanModel } from '../../../../../shared/models/plans.model';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { PlansPricingItemEnum } from '../../../../../shared/enums/plansPricingItem.enum';
import { PlanPeriodEnum } from '../../../../../shared/enums/planPeriodEnum';
import { ReactComponent as CrownSilverIcon } from '../../../../../assets/Images/сrown-silver-package.svg';
import { ReactComponent as CrownPlatinumIcon } from '../../../../../assets/Images/crown-platinum-package.svg';
import { ReactComponent as CrownGoldIcon } from '../../../../../assets/Images/сrown-gold-package.svg';
import { ReactComponent as CloseIcon } from '../../../../../assets/Images/modalNavigation/close.svg';
import PlanCard from '../PlanCard';
import { getPlans } from '../../../../../store/settings/settingsThunk';
import PaymentStep from '../../../../../pages/Onboarding/components/packageSteps/PaymentStep';
import OnboardingLayout from '../../../../../pages/Onboarding/components/OnboardingLayout';
import PromocodeStep from '../../../../../pages/Onboarding/components/packageSteps/PromocodeStep';
import TrialStep from '../../../../../pages/Onboarding/components/packageSteps/TrialStep';

enum StepsEnum {
  Plans,
  Purchase,
  PromoCode,
  Trial,
}

type PurchaseModalContainerProps = {
  onClose: () => void;
  isPremium?: boolean;
};

const plansConfig = {
  [PlansPricingItemEnum.starter]: {
    label: '',
    features: [],
    icon: CrownSilverIcon,
  },
  [PlansPricingItemEnum.basic]: {
    label: 'plans.plansModal.gold',
    features: [
      'plans.features.autoReminders',
      'plans.features.tasksAndEvents',
      'plans.features.prioritizing',
      'plans.features.dueDates',
      'plans.features.progressTracking',
    ],
    icon: CrownGoldIcon,
  },
  [PlansPricingItemEnum.premium]: {
    label: 'plans.plansModal.platinum',
    features: [
      'plans.features.autoScheduledPayments',
      'plans.features.hubsFullAccess',
      'plans.features.autoReminders',
      'plans.features.tasksAndEvents',
      'plans.features.prioritizing',
      'plans.features.dueDates',
      'plans.features.progressTracking',
    ],
    icon: CrownPlatinumIcon,
  },
};

const PurchaseModalContainer: FC<PurchaseModalContainerProps> = ({ onClose, isPremium }) => {
  const dispatch = useAppDispatch();
  const [selectedPlan, setSelectedPlan] = useState<PlansPricingItemEnum | string>(
    isPremium ? PlansPricingItemEnum.premium : PlansPricingItemEnum.starter,
  );
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentStep, setCurrentStep] = useState(isPremium ? StepsEnum.Purchase : StepsEnum.Plans);
  const [isTrial, setIsTrial] = useState(false);
  const [isPromocode, setIsPromocode] = useState(false);
  const plans = useAppSelector((state) =>
    state.settings.plans.data.filter((plan) => plan.tag !== PlansPricingItemEnum.starter),
  );
  const [, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const plansMemo = useMemo(
    () =>
      plans.map((plan) => ({
        title: plan.name,
        price: plan.amount / 100,
        tag: plan.tag,
        ...plansConfig[plan.tag],
      })),
    [plans],
  );

  const handleUseTrial = () => {
    setIsTrial(true);
    setCurrentStep(StepsEnum.Purchase);
  };

  const handleBackPromocode = () => {
    setCurrentStep(StepsEnum.Trial);
  };

  const handleCancelPayment = useCallback(() => {
    if (isTrial) {
      return;
    }
    if (isPromocode) {
      setCurrentStep(StepsEnum.Trial);
      return;
    }

    setCurrentStep(StepsEnum.PromoCode);
  }, [isPromocode, isTrial]);

  const handleUsePromocode = useCallback(() => {
    setSearchParams({ promo: 'newmee' });
    setIsPromocode(true);
    setCurrentStep(StepsEnum.Purchase);
  }, [setSearchParams]);

  useEffect(() => {
    dispatch(getPlans(PlanPeriodEnum.month));
  }, [dispatch]);

  switch (currentStep) {
    case StepsEnum.Plans:
      return (
        <Box
          sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '18px 24px',
              borderBottom: `1px solid ${theme.palette.case.neutral.n200}`,
            }}
          >
            <Typography sx={{ color: theme.palette.case.neutral.n900 }} variant="h2">
              {t('plans.plansModal.title')}
            </Typography>
            <Box onClick={onClose} sx={{ padding: '4px', cursor: 'pointer' }}>
              <CloseIcon />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              overflow: 'auto',
              maxWidth: '100%',
              flexGrow: '1',
            }}
          >
            {plansMemo.map((plan) => (
              <Box
                key={plan.title}
                sx={{
                  width: 260,
                  padding: '24px 0',
                  m: { xs: '0 16px 0 0px', md: '0 18px' },
                  ':last-child': {
                    marginRight: 0, // Видалити margin-right для останнього елемента
                  },
                  height: '100%',
                }}
              >
                <PlanCard
                  {...plan}
                  isActive={selectedPlan === plan.tag}
                  handleSubmit={() => {
                    setSelectedPlan(plan.tag);
                  }}
                />
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              borderTop: `1px solid ${theme.palette.case.neutral.n200}`,
              height: 75,
              display: 'flex',
              justifyContent: 'flex-end',
              p: matchSm ? '16px' : '16px 36px',
            }}
          >
            <Button
              fullWidth={matchSm}
              size="large"
              variant="outlined"
              onClick={onClose}
              sx={{ marginRight: '24px' }}
            >
              {t('general.buttons.cancel')}
            </Button>
            <Button
              fullWidth={matchSm}
              size="large"
              disabled={selectedPlan === PlansPricingItemEnum.starter}
              variant="contained"
              onClick={() => setCurrentStep(StepsEnum.Purchase)}
            >
              {t('general.buttons.select')}
            </Button>
          </Box>
        </Box>
      );

    case StepsEnum.Purchase:
      return (
        <>
          {plans.find((el) => el.tag === selectedPlan) ? (
            <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_KEY as string, { locale: 'en' })}>
              <PaymentStep
                isUpgradeModal
                handleTitleCloseBtn={() => onClose()}
                isShowTitleCloseBtn={isTrial}
                handleConfirm={() => onClose()}
                handleBack={() => handleCancelPayment()}
                plan={plans.find((el) => el?.tag === selectedPlan) as PlanModel}
                isTrial={isTrial}
                isPromocode={isPromocode}
                isHideBackBtn={isTrial}
                period={PlanPeriodEnum.month}
              />
            </Elements>
          ) : (
            <></>
          )}
        </>
      );
    case StepsEnum.PromoCode:
      return (
        <OnboardingLayout
          isHidePadding
          isShowLogo={false}
          title={t('onboarding.trialStep.specialOffer')}
          leftBtnProps={{
            isShow: true,
            label: t('general.buttons.cancel'),
            variant: 'outlined',
            onClick: () => handleBackPromocode(),
          }}
          rightBtnProps={{
            isShow: true,
            label: t('general.buttons.usePromoCode'),
            variant: 'contained',
            isDisabled: !selectedPlan,
            onClick: () => handleUsePromocode(),
          }}
          minHeight={518}
          maxWidth={800}
          logoPosition="outside"
        >
          <PromocodeStep
            selectedPlan={plans.find((el) => el.tag === selectedPlan) as PlanModel}
            period={PlanPeriodEnum.month}
          />
        </OnboardingLayout>
      );
    case StepsEnum.Trial:
      return (
        <OnboardingLayout
          isHidePadding
          handleTitleCloseBtn={() => onClose()}
          isShowTitleCloseBtn
          isShowLogo={false}
          title={t('onboarding.trialStep.specialOffer')}
          rightBtnProps={{
            isShow: true,
            label: t('general.buttons.useMyTrial'),
            variant: 'contained',
            isDisabled: false,
            onClick: () => handleUseTrial(),
          }}
          leftBtnProps={{
            isShow: true,
            label: t('general.buttons.cancel'),
            variant: 'outlined',
            onClick: () => onClose(),
          }}
          minHeight={518}
          maxWidth={800}
          logoPosition="outside"
        >
          <TrialStep selectedPlan={plans.find((el) => el.tag === selectedPlan) as PlanModel} />
        </OnboardingLayout>
      );
    default:
      return null;
  }
};

export default PurchaseModalContainer;
