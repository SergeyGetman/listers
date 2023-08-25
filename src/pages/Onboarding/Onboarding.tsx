import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router';
import { MoodEnum } from '../../shared/enums/onboarding/mood.enum';
import OnboardingLayout from './components/OnboardingLayout';
import { ReactComponent as ChatQuoteIcon } from '../../assets/Images/onboarding/chatQuoteIcon.svg';
import { ReactComponent as HeartQuoteIcon } from '../../assets/Images/onboarding/heartQuoteIcon.svg';
import { ReactComponent as QuotesIcon } from '../../assets/Images/onboarding/quotesIcon.svg';
import { ReactComponent as ChartQuoteIcon } from '../../assets/Images/onboarding/chartQuoteIcon.svg';
import { ReactComponent as EmojiQuoteIcon } from '../../assets/Images/onboarding/emojiQouteIcon.svg';
import { useAppSelector, useAppDispatch } from '../../shared/hooks/redux';
import { getOnboardingInfo, setOnboardingInfo } from '../../store/auth/authThunk';
import { getProfileInfo, setViewDataItem } from '../../store/Profile/profile.actions';
import FeelStep from './components/onboardingSteps/FeelStep';
import GenderStep from './components/onboardingSteps/GenderStep';
import BirthdayStep from './components/onboardingSteps/BirthdayStep';
import RelationshipStep from './components/onboardingSteps/RelationshipStep';
import ChecklistStep from './components/onboardingSteps/ChecklistStep';
import ToolsStep from './components/onboardingSteps/ToolsStep';
import SummarizingStep from './components/onboardingSteps/SummarizingStep';
import { PlanPeriodEnum } from '../../shared/enums/planPeriodEnum';
import { getPlans } from '../../store/settings/settingsThunk';
import { ToolsEnum } from '../../shared/enums/onboarding/tools.enum';
import { PlansPricingItemEnum } from '../../shared/enums/plansPricingItem.enum';
import router from '../../shared/services/router';
import PackageFlow from './PackageFlow';
import { ProfileViewDataEnum } from '../../shared/enums/profileViewData.enum';
import WelcomeToHubmeeStep from './components/onboardingSteps/WelcomeToHubmeeStep';

enum OnboardingStepsEnum {
  Feel = 'feel',
  Gender = 'gender',
  Birthday = 'birthday',
  Relationship = 'relationship',
  Checklist = 'checklist',
  Tools = 'tools',
  Summarizing = 'summarizing',
  Package = 'package',
  WelcomeToHubmee = 'welcome_to_hubmee',
}

const initialState: Record<OnboardingStepsEnum, any[]> = {
  [OnboardingStepsEnum.Feel]: [],
  [OnboardingStepsEnum.Gender]: [],
  [OnboardingStepsEnum.Birthday]: [],
  [OnboardingStepsEnum.Relationship]: [],
  [OnboardingStepsEnum.Checklist]: [],
  [OnboardingStepsEnum.Tools]: [],
  [OnboardingStepsEnum.Summarizing]: [],
  [OnboardingStepsEnum.Package]: [],
  [OnboardingStepsEnum.WelcomeToHubmee]: [],
};

const OnboardingContainer = () => {
  const [step, setStep] = useState<OnboardingStepsEnum>(OnboardingStepsEnum.Feel);
  const [onboardingState, setOnboardingState] = useState(initialState);
  const { t } = useTranslation();
  const userName = useAppSelector((state) => state.profile.data?.first_name);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const genderQuoteText = useMemo(() => {
    const [feelState] = onboardingState.feel;
    switch (feelState) {
      case MoodEnum.happy:
      case MoodEnum.excited:
        return t('onboarding.secondStep.quoteText.first');
      case MoodEnum.tired:
      case MoodEnum.lazy:
        return t('onboarding.secondStep.quoteText.second');
      default:
        return t('onboarding.secondStep.quoteText.default');
    }
  }, [onboardingState.feel, t]);

  const recommendedPlan = useMemo(() => {
    if (!!onboardingState.tools.length) {
      if (
        onboardingState.tools.includes(ToolsEnum.reminders) ||
        onboardingState.tools.includes(ToolsEnum.payments) ||
        onboardingState.tools.includes(ToolsEnum.meetings) ||
        onboardingState.tools.includes(ToolsEnum.appointment)
      ) {
        return PlansPricingItemEnum.premium;
      }
      if (
        onboardingState.tools.includes(ToolsEnum.events) ||
        onboardingState.tools.includes(ToolsEnum.tasks) ||
        onboardingState.tools.includes(ToolsEnum.deadlines)
      ) {
        return PlansPricingItemEnum.basic;
      }
    }

    return PlansPricingItemEnum.starter;
  }, [onboardingState.tools]);

  const handleSetStore = (key: OnboardingStepsEnum) => (value: string[]) => {
    setOnboardingState((state) => ({ ...state, [key]: value }));
  };

  const handleNext = (currentKey: OnboardingStepsEnum, nextKey: OnboardingStepsEnum) => () => {
    setStep(nextKey);
    if (currentKey !== OnboardingStepsEnum.Summarizing) {
      dispatch(
        setOnboardingInfo({
          key: currentKey,
          answers: onboardingState[currentKey].map((el) => ({ text: el })),
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(getOnboardingInfo()).then((res) => {
      if (getOnboardingInfo.fulfilled.match(res)) {
        setOnboardingState(res.payload);
        const initialStep = Object.values(OnboardingStepsEnum).find(
          (key) => res.payload[key as OnboardingStepsEnum]?.length === 0,
        );
        if (initialStep) {
          setStep(initialStep);
        } else if (!!res.payload[OnboardingStepsEnum.Summarizing]?.length) {
          setStep(OnboardingStepsEnum.Package);
        }
      }
    });
    dispatch(getProfileInfo()).then((res) => {
      if (getProfileInfo.fulfilled.match(res)) {
        if (res?.payload?.view_data?.is_view_onboarding === true) {
          navigate(router.todo.path);
        }
      }
    });

    dispatch(getPlans(PlanPeriodEnum.month));
  }, [dispatch, navigate]);

  const handleConfirmOnboarding = useCallback(async () => {
    await dispatch(setViewDataItem({ entity: ProfileViewDataEnum.is_view_onboarding }));
    setStep(OnboardingStepsEnum.WelcomeToHubmee);
  }, [dispatch]);

  switch (step) {
    case OnboardingStepsEnum.Feel:
      return (
        <OnboardingLayout
          step={1}
          totalSteps={7}
          title={t('onboarding.fistStep.title')}
          subtitle={t('onboarding.fistStep.subtitle', {
            userName,
          })}
          quoteText={t('onboarding.fistStep.quoteText')}
          quoteIcon={<ChatQuoteIcon />}
          rightBtnProps={{
            isShow: true,
            label: t('general.buttons.continue'),
            variant: 'contained',
            onClick: handleNext(OnboardingStepsEnum.Feel, OnboardingStepsEnum.Gender),
            isDisabled: !onboardingState[OnboardingStepsEnum.Feel].length,
          }}
        >
          <FeelStep
            handleSetStore={handleSetStore(OnboardingStepsEnum.Feel)}
            initData={onboardingState.feel}
          />
        </OnboardingLayout>
      );
    case OnboardingStepsEnum.Gender:
      return (
        <OnboardingLayout
          step={2}
          totalSteps={7}
          title={t('onboarding.secondStep.title')}
          subtitle={t('onboarding.secondStep.subtitle')}
          quoteText={genderQuoteText}
          quoteIcon={<HeartQuoteIcon />}
          leftBtnProps={{
            isShow: true,
            label: t('general.buttons.back'),
            variant: 'outlined',
            onClick: () => {
              setStep(OnboardingStepsEnum.Feel);
            },
          }}
          rightBtnProps={{
            isShow: true,
            label: t('general.buttons.continue'),
            variant: 'contained',
            onClick: handleNext(OnboardingStepsEnum.Gender, OnboardingStepsEnum.Birthday),
            isDisabled: !onboardingState[OnboardingStepsEnum.Gender].length,
          }}
        >
          <GenderStep
            handleSetStore={handleSetStore(OnboardingStepsEnum.Gender)}
            initData={onboardingState.gender}
          />
        </OnboardingLayout>
      );
    case OnboardingStepsEnum.Birthday:
      return (
        <OnboardingLayout
          step={3}
          totalSteps={7}
          title={t('onboarding.thirdStep.title')}
          subtitle={t('onboarding.thirdStep.subtitle')}
          quoteText={t('onboarding.thirdStep.quoteText')}
          quoteAuthor={t('onboarding.thirdStep.quoteAuthor')}
          quoteIcon={<QuotesIcon />}
          leftBtnProps={{
            isShow: true,
            label: t('general.buttons.back'),
            variant: 'outlined',
            onClick: () => {
              setStep(OnboardingStepsEnum.Gender);
            },
          }}
          rightBtnProps={{
            isShow: true,
            label: t('general.buttons.continue'),
            variant: 'contained',
            onClick: handleNext(OnboardingStepsEnum.Birthday, OnboardingStepsEnum.Relationship),
            isDisabled: !onboardingState[OnboardingStepsEnum.Birthday].length,
          }}
        >
          <BirthdayStep
            handleSetStore={handleSetStore(OnboardingStepsEnum.Birthday)}
            initData={onboardingState.birthday}
          />
        </OnboardingLayout>
      );
    case OnboardingStepsEnum.Relationship:
      return (
        <OnboardingLayout
          step={4}
          totalSteps={7}
          title={t('onboarding.fourthSlide.title')}
          subtitle={`${userName},`}
          quoteText={t('onboarding.fourthSlide.quoteText')}
          quoteIcon={<QuotesIcon />}
          quoteAuthor={t('onboarding.fourthSlide.quoteAuthor')}
          leftBtnProps={{
            isShow: true,
            label: t('general.buttons.back'),
            variant: 'outlined',
            onClick: () => {
              setStep(OnboardingStepsEnum.Birthday);
            },
          }}
          rightBtnProps={{
            isShow: true,
            label: t('general.buttons.continue'),
            variant: 'contained',
            onClick: handleNext(OnboardingStepsEnum.Relationship, OnboardingStepsEnum.Checklist),
            isDisabled: !onboardingState[OnboardingStepsEnum.Relationship].length,
          }}
        >
          <RelationshipStep
            handleSetStore={handleSetStore(OnboardingStepsEnum.Relationship)}
            initData={onboardingState.relationship}
          />
        </OnboardingLayout>
      );
    case OnboardingStepsEnum.Checklist:
      return (
        <OnboardingLayout
          step={5}
          totalSteps={7}
          title={t('onboarding.fifthSlide.title')}
          quoteText={t('onboarding.fifthSlide.quoteText')}
          quoteIcon={<ChartQuoteIcon />}
          subtitle={t('onboarding.fifthSlide.subtitle')}
          leftBtnProps={{
            isShow: true,
            label: t('general.buttons.back'),
            variant: 'outlined',
            onClick: () => {
              setStep(OnboardingStepsEnum.Relationship);
            },
          }}
          rightBtnProps={{
            isShow: true,
            label: t('general.buttons.continue'),
            variant: 'contained',
            onClick: handleNext(OnboardingStepsEnum.Checklist, OnboardingStepsEnum.Tools),
            isDisabled: !onboardingState[OnboardingStepsEnum.Checklist].length,
          }}
        >
          <ChecklistStep
            handleSetStore={handleSetStore(OnboardingStepsEnum.Checklist)}
            initData={onboardingState.checklist}
          />
        </OnboardingLayout>
      );
    case OnboardingStepsEnum.Tools:
      return (
        <OnboardingLayout
          step={6}
          totalSteps={7}
          title={t('onboarding.sixthSlide.title')}
          subtitle={t('onboarding.sixthSlide.subtitle')}
          quoteText={t('onboarding.sixthSlide.quoteText')}
          quoteIcon={<EmojiQuoteIcon />}
          leftBtnProps={{
            isShow: true,
            label: t('general.buttons.back'),
            variant: 'outlined',
            onClick: () => {
              setStep(OnboardingStepsEnum.Checklist);
            },
          }}
          rightBtnProps={{
            isShow: true,
            label: t('general.buttons.continue'),
            variant: 'contained',
            onClick: handleNext(OnboardingStepsEnum.Tools, OnboardingStepsEnum.Summarizing),
            isDisabled: !onboardingState[OnboardingStepsEnum.Tools].length,
          }}
        >
          <ToolsStep
            handleSetStore={handleSetStore(OnboardingStepsEnum.Tools)}
            initData={onboardingState.tools}
          />
        </OnboardingLayout>
      );
    case OnboardingStepsEnum.Summarizing:
      return (
        <OnboardingLayout
          step={7}
          totalSteps={7}
          title={t('onboarding.seventhStep.title')}
          quoteText={t('onboarding.seventhStep.title', { name: userName })}
          quoteIcon={<HeartQuoteIcon />}
          leftBtnProps={{
            isShow: true,
            label: t('general.buttons.back'),
            variant: 'outlined',
            onClick: () => {
              setStep(OnboardingStepsEnum.Tools);
            },
          }}
          rightBtnProps={{
            isShow: true,
            label: t('general.buttons.goodJobHubmee'),
            variant: 'contained',
            onClick: handleNext(OnboardingStepsEnum.Summarizing, OnboardingStepsEnum.Package),
          }}
        >
          <SummarizingStep data={onboardingState} />
        </OnboardingLayout>
      );
    case OnboardingStepsEnum.Package:
      return (
        <PackageFlow
          handleConfirmOnboarding={handleConfirmOnboarding}
          handleBack={() => setStep(OnboardingStepsEnum.Summarizing)}
          recommendedPlan={recommendedPlan}
        />
      );
    case OnboardingStepsEnum.WelcomeToHubmee:
      return <WelcomeToHubmeeStep userName={userName} />;
    default:
      return null;
  }
};

const Onboarding = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
    }}
  >
    <OnboardingContainer />
  </Box>
);

export default Onboarding;
