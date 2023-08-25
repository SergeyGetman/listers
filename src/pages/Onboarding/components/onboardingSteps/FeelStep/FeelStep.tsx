import { FC } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import OnboardingSelect from '../../../../../components/OnboardingSelect';
import { getMoodConfig } from '../../../../../shared/configs/onboarding/mood.config';
import { OnboardingModel } from '../../../../../shared/models/onboarding.model';
import { MoodEnum } from '../../../../../shared/enums/onboarding/mood.enum';

type Props = {
  handleSetStore: (value: MoodEnum[]) => void;
  initData: OnboardingModel['feel'];
};

const FeelStep: FC<Props> = ({ initData: [feelData], handleSetStore }) => {
  const { t } = useTranslation();

  return (
    <Grid container rowSpacing="16px" columnSpacing="24px">
      {getMoodConfig(t).map((item, index) => (
        <Grid key={index} xs={12} sm={6} item>
          <OnboardingSelect
            onClick={() => handleSetStore([item.key])}
            text={item.label}
            icon={item.icon}
            selected={feelData === item.key}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default FeelStep;
