import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js/pure';
import { Elements } from '@stripe/react-stripe-js';
import { PlansPricingItemEnum } from '../../../shared/enums/plansPricingItem.enum';
import OnboardingLayout from '../components/OnboardingLayout';
import PaymentStep from '../components/packageSteps/PaymentStep';
import PackageStep from '../components/packageSteps/PackageStep';
import PromocodeStep from '../components/packageSteps/PromocodeStep';
import TrialStep from '../components/packageSteps/TrialStep';
import { useAppSelector } from '../../../shared/hooks/redux';
import { PlanPeriodEnum } from '../../../shared/enums/planPeriodEnum';
import { ReactComponent as QuotesIcon } from '../../../assets/Images/onboarding/quotesIcon.svg';

enum PackageStepsEnum {
  Plans = 'plans',
  Promocode = 'promocode',
  Trial = 'trial',
  Payment = 'payment',
}

type StateType = {
  currentStep: PackageStepsEnum;
  selectedPlan: PlansPricingItemEnum;
  period: PlanPeriodEnum;
  isTrial: boolean;
  isPromocode: boolean;
  isAlreadyClickSilver?: boolean;
  isSilverUpgrade?: boolean;
};

const PackageFlow = ({
  recommendedPlan,
  handleBack,
  handleConfirmOnboarding,
}: {
  recommendedPlan: PlansPricingItemEnum;
  handleBack: () => void;
  handleConfirmOnboarding: () => void;
}) => {
  const [state, setState] = useState<StateType>({
    currentStep: PackageStepsEnum.Plans,
    period: PlanPeriodEnum.month,
    selectedPlan: recommendedPlan,
    isTrial: false,
    isPromocode: false,
    isAlreadyClickSilver: false,
    isSilverUpgrade: false,
  });
  const [, setSearchParams] = useSearchParams();

  const selectedPlan = useAppSelector((rootState) =>
    rootState.settings.plans.data?.find((el) => el.tag === state.selectedPlan),
  );

  const { t } = useTranslation();

  const handlePlanSelect = (plan: PlansPricingItemEnum) => {
    setState((prevState) => ({
      ...prevState,
      selectedPlan: plan,
      isPromocode: false,
      isTrial: false,
    }));
  };

  const handlePeriodChange = (period: PlanPeriodEnum) => {
    setState((prevState) => ({
      ...prevState,
      period,
      isPromocode: false,
      isTrial: false,
      isAlreadyClickSilver: false,
      isSilverUpgrade: false,
    }));
  };

  const handleStepSelect = (step: PackageStepsEnum) => {
    setState((prevState) => ({
      ...prevState,
      currentStep: step,
    }));
  };

  const plansTitle = useMemo(() => {
    if (!recommendedPlan) {
      return '';
    }

    return (
      {
        [PlansPricingItemEnum.starter]: t('onboarding.plansStep.silver'),
        [PlansPricingItemEnum.basic]: t('onboarding.plansStep.gold'),
        [PlansPricingItemEnum.premium]: t('onboarding.plansStep.platinum'),
      }[recommendedPlan] ?? ''
    );
  }, [t, recommendedPlan]);

  const handlePlanNextBtnClick = () => {
    if (state.period === PlanPeriodEnum.month) {
      if (
        recommendedPlan === PlansPricingItemEnum.premium &&
        selectedPlan?.tag === PlansPricingItemEnum.starter &&
        !state.isAlreadyClickSilver
      ) {
        handlePlanSelect(PlansPricingItemEnum.premium);
        setState((prevState) => ({
          ...prevState,
          isPromocode: true,
          isAlreadyClickSilver: true,
          isSilverUpgrade: true,
          currentStep: PackageStepsEnum.Promocode,
        }));
        return;
      }

      if (
        recommendedPlan === PlansPricingItemEnum.basic &&
        selectedPlan?.tag === PlansPricingItemEnum.starter &&
        !state.isAlreadyClickSilver
      ) {
        handlePlanSelect(PlansPricingItemEnum.basic);
        setState((prevState) => ({
          ...prevState,
          isPromocode: true,
          isAlreadyClickSilver: true,
          isSilverUpgrade: true,
          currentStep: PackageStepsEnum.Promocode,
        }));
        return;
      }

      setState((prevState) => ({
        ...prevState,
        isPromocode: selectedPlan?.tag === PlansPricingItemEnum.starter,
        currentStep: PackageStepsEnum.Payment,
      }));
    } else {
      if (
        recommendedPlan === PlansPricingItemEnum.premium &&
        selectedPlan?.tag === PlansPricingItemEnum.starter &&
        !state.isAlreadyClickSilver
      ) {
        handlePlanSelect(PlansPricingItemEnum.premium);
        setState((prevState) => ({
          ...prevState,
          isPromocode: true,
          isTrial: true,
          isAlreadyClickSilver: true,
          currentStep: PackageStepsEnum.Trial,
        }));
        return;
      }
      if (
        recommendedPlan === PlansPricingItemEnum.basic &&
        selectedPlan?.tag === PlansPricingItemEnum.starter &&
        !state.isAlreadyClickSilver
      ) {
        handlePlanSelect(PlansPricingItemEnum.basic);
        setState((prevState) => ({
          ...prevState,
          isPromocode: true,
          isAlreadyClickSilver: true,
          isTrial: true,
          currentStep: PackageStepsEnum.Trial,
        }));
        return;
      }
      setState((prevState) => ({
        ...prevState,
        currentStep: PackageStepsEnum.Payment,
      }));
    }
  };

  const handlePaymentBackBtnClick = () => {
    if ((state.isPromocode || state.period === PlanPeriodEnum.year) && state.isTrial) {
      setState((prevState) => ({
        ...prevState,
        isTrial: false,
        isPromocode: false,
        isSilverUpgrade: false,
        currentStep: PackageStepsEnum.Plans,
      }));
      return;
    }
    if (state.selectedPlan === PlansPricingItemEnum.starter && state.isTrial) {
      setState((prevState) => ({
        ...prevState,
        isTrial: false,
        isPromocode: false,
        isSilverUpgrade: false,
        currentStep: PackageStepsEnum.Plans,
      }));
      return;
    }
    if (state.selectedPlan === PlansPricingItemEnum.starter) {
      setState((prevState) => ({
        ...prevState,
        isPromocode: true,
        currentStep: PackageStepsEnum.Trial,
      }));
      return;
    }

    if (state.isPromocode || state.period === PlanPeriodEnum.year) {
      setState((prevState) => ({
        ...prevState,
        isTrial: true,
        isPromocode: true,
        currentStep: PackageStepsEnum.Trial,
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      isPromocode: true,
      currentStep: PackageStepsEnum.Promocode,
    }));
  };

  const handlePromoCodeBackBtnClick = () => {
    if (state.isSilverUpgrade) {
      setState((prevState) => ({
        ...prevState,
        isTrial: false,
        isPromocode: false,
        isSilverUpgrade: false,
        currentStep: PackageStepsEnum.Plans,
      }));
      return;
    }

    handleStepSelect(PackageStepsEnum.Trial);
  };

  switch (state.currentStep) {
    case PackageStepsEnum.Plans:
      return (
        <OnboardingLayout
          title={plansTitle}
          subtitle={t('onboarding.plansStep.subtitle')}
          quoteText={t('onboarding.plansStep.quoteText')}
          quoteAuthor={t('onboarding.plansStep.quoteAuthor')}
          quoteIcon={<QuotesIcon />}
          leftBtnProps={{
            isShow: true,
            label: t('general.buttons.back'),
            variant: 'outlined',
            onClick: handleBack,
          }}
          rightBtnProps={{
            isShow: true,
            label: t('general.buttons.continue'),
            variant: 'contained',
            isDisabled: !state.selectedPlan,
            onClick: () => handlePlanNextBtnClick(),
          }}
          minHeight={518}
        >
          <PackageStep
            selectedPlan={state.selectedPlan}
            setSelectedPlan={handlePlanSelect}
            period={state.period}
            setPeriod={handlePeriodChange}
            recommendedPlan={recommendedPlan}
          />
        </OnboardingLayout>
      );

    case PackageStepsEnum.Payment:
      if (!selectedPlan) {
        return null;
      }
      return (
        <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_KEY as string, { locale: 'en' })}>
          <PaymentStep
            isTrial={state.isTrial}
            isPromocode={state.isPromocode}
            plan={selectedPlan}
            period={state.period}
            handleConfirm={() => handleConfirmOnboarding()}
            handleBack={() => handlePaymentBackBtnClick()}
          />
        </Elements>
      );

    case PackageStepsEnum.Promocode:
      if (!selectedPlan) {
        return null;
      }

      return (
        <OnboardingLayout
          title={t('onboarding.trialStep.specialOffer')}
          leftBtnProps={{
            isShow: true,
            label: t('general.buttons.back'),
            variant: 'outlined',
            onClick: () => handlePromoCodeBackBtnClick(),
          }}
          rightBtnProps={{
            isShow: true,
            label: t('general.buttons.usePromoCode'),
            variant: 'contained',
            isDisabled: !selectedPlan,
            onClick: () => {
              setSearchParams({ promo: 'newmee' });
              setState((prevState) => ({
                ...prevState,
                currentStep: PackageStepsEnum.Payment,
                isPromocode: true,
              }));
            },
          }}
          minHeight={518}
          maxWidth={745}
          logoPosition="outside"
        >
          <PromocodeStep selectedPlan={selectedPlan} period={state.period} />
        </OnboardingLayout>
      );

    case PackageStepsEnum.Trial:
      if (!selectedPlan) {
        return null;
      }

      return (
        <OnboardingLayout
          title={t('onboarding.trialStep.specialOffer')}
          rightBtnProps={{
            isShow: true,
            label: t('general.buttons.useMyTrial'),
            variant: 'contained',
            isDisabled: !state.selectedPlan,
            onClick: () => {
              setState((prevState) => ({
                ...prevState,
                currentStep: PackageStepsEnum.Payment,
                isTrial: true,
              }));
            },
          }}
          minHeight={518}
          maxWidth={745}
          logoPosition="outside"
        >
          <TrialStep selectedPlan={selectedPlan} />
        </OnboardingLayout>
      );

    default:
      return null;
  }
};

export default PackageFlow;
