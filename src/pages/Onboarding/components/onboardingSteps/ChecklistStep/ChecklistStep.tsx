import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import OnboardingSelect from '../../../../../components/OnboardingSelect';
import {
  getCheckListLeftConfig,
  getCheckListRightConfig,
} from '../../../../../shared/configs/onboarding/checklist.config';
import { OnboardingModel } from '../../../../../shared/models/onboarding.model';
import { ChecklistsEnum } from '../../../../../shared/enums/onboarding/checklists.enum';

type Props = {
  handleSetStore: (value: ChecklistsEnum[]) => void;
  initData: OnboardingModel['checklist'];
};

const ChecklistStep: FC<Props> = ({ handleSetStore, initData }) => {
  const { t } = useTranslation();

  const handleSelect = (item: ChecklistsEnum) => {
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
            {getCheckListLeftConfig(t).map((item, index) => (
              <Grid key={index} xs={12} item>
                <OnboardingSelect
                  onClick={() => handleSelect(item.key)}
                  text={item.label}
                  icon={item.icon}
                  isCustomizeIcon
                  selected={initData.includes(item.key)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container rowSpacing="16px">
            {getCheckListRightConfig(t).map((item, index) => (
              <Grid key={index} xs={12} item>
                <OnboardingSelect
                  onClick={() => handleSelect(item.key)}
                  text={item.label}
                  icon={item.icon}
                  isCustomizeIcon
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

export default ChecklistStep;
