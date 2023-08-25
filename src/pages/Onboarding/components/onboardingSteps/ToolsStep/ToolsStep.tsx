import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import OnboardingSelect from '../../../../../components/OnboardingSelect';
import {
  getToolsLeftConfig,
  getToolsRightConfig,
} from '../../../../../shared/configs/onboarding/tools.config';
import { ReactComponent as RadioIcon } from '../../../../../assets/Images/onboarding/onbordingRadio.svg';
import { ReactComponent as RadioSelectedIcon } from '../../../../../assets/Images/onboarding/onbordingSelectedRadio.svg';
import { OnboardingModel } from '../../../../../shared/models/onboarding.model';
import { ToolsEnum } from '../../../../../shared/enums/onboarding/tools.enum';

type Props = {
  handleSetStore: (value: ToolsEnum[]) => void;
  initData: OnboardingModel['tools'];
};
const ToolsStep: FC<Props> = ({ handleSetStore, initData }) => {
  const { t } = useTranslation();

  const handleSelect = (item: ToolsEnum) => {
    if (initData.includes(item)) {
      handleSetStore(initData.filter((el) => el !== item));
      return;
    }

    handleSetStore([...initData, item]);
  };

  return (
    <Box>
      <Grid container columnSpacing="24px" rowSpacing="16px">
        <Grid item xs={12} sm={6}>
          <Grid container rowSpacing="16px">
            {getToolsLeftConfig(t).map((item, index) => (
              <Grid key={index} xs={12} item>
                <OnboardingSelect
                  onClick={() => handleSelect(item.key)}
                  text={item.label}
                  icon={<RadioIcon />}
                  isCustomizeIcon={false}
                  selectedIcon={<RadioSelectedIcon />}
                  selected={initData.includes(item.key)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container rowSpacing="16px">
            {getToolsRightConfig(t).map((item, index) => (
              <Grid key={index} xs={12} item>
                <OnboardingSelect
                  onClick={() => handleSelect(item.key)}
                  text={item.label}
                  icon={<RadioIcon />}
                  isCustomizeIcon={false}
                  selectedIcon={<RadioSelectedIcon />}
                  selected={initData.includes(item.key)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ToolsStep;
