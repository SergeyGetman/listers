import { Grid } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import OnboardingSelect from '../../../../../components/OnboardingSelect';
import { ReactComponent as RadioIcon } from '../../../../../assets/Images/onboarding/onbordingRadio.svg';
import { ReactComponent as RadioSelectedIcon } from '../../../../../assets/Images/onboarding/onbordingSelectedRadio.svg';
import { OnboardingModel } from '../../../../../shared/models/onboarding.model';
import { getRelationShipConfig } from '../../../../../shared/configs/onboarding/relationShip.config';
import { RelationShipEnum } from '../../../../../shared/enums/onboarding/relationShip.enum';

type Props = {
  handleSetStore: (value: RelationShipEnum[]) => void;
  initData: OnboardingModel['relationship'];
};

const RelationshipStep: FC<Props> = ({ handleSetStore, initData: [relationshipData] }) => {
  const { t } = useTranslation();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Grid rowSpacing="8px" container>
          {getRelationShipConfig(t).map((item, index) => (
            <Grid key={index} item xs={12}>
              <OnboardingSelect
                onClick={() => handleSetStore([item.key])}
                text={item.label}
                icon={<RadioIcon />}
                isCustomizeIcon={false}
                selectedIcon={<RadioSelectedIcon />}
                selected={relationshipData === item.key}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RelationshipStep;
