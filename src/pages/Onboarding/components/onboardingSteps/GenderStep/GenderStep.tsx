import { Grid } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import OnboardingSelect from '../../../../../components/OnboardingSelect';
import { getGenderConfig } from '../../../../../shared/configs/onboarding/gender.config';
import { ReactComponent as RadioIcon } from '../../../../../assets/Images/onboarding/onbordingRadio.svg';
import { ReactComponent as RadioSelectedIcon } from '../../../../../assets/Images/onboarding/onbordingSelectedRadio.svg';
import { OnboardingModel } from '../../../../../shared/models/onboarding.model';
import { GenderEnum } from '../../../../../shared/enums/onboarding/gender.enum';

type Props = {
  handleSetStore: (value: GenderEnum[]) => void;
  initData: OnboardingModel['gender'];
};
const GenderStep: FC<Props> = ({ initData: [genderData], handleSetStore }) => {
  const { t } = useTranslation();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Grid container rowSpacing="16px">
          {getGenderConfig(t).map((item, index) => (
            <Grid key={index} item xs={12}>
              <OnboardingSelect
                onClick={() => handleSetStore([item.key])}
                text={item.label}
                isCustomizeIcon={false}
                icon={<RadioIcon />}
                selectedIcon={<RadioSelectedIcon />}
                selected={genderData === item.key}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GenderStep;
