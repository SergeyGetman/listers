import React, { FC, useMemo } from 'react';
import { Box } from '@mui/material';
import FirstSubStep from './components/FirstSubStep';
import SecondSubStep from './components/SecondSubStep';
import ThirdSubStep from './components/ThirdSubStep';
import FourthSubStep from './components/FourthSubStep';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../../../shared/enums/formSteps.enum';
type LPRegistrationStepProps = {
  handleSelectStep: (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => void;
  currentSubStep: FormSubStepsEnum;
};
const LPRegistrationStep: FC<LPRegistrationStepProps> = ({ handleSelectStep, currentSubStep }) => {
  const content = useMemo(() => {
    switch (currentSubStep) {
      case FormSubStepsEnum.sub_step_first:
        return <FirstSubStep handleSelectStep={handleSelectStep} />;
      case FormSubStepsEnum.sub_step_second:
        return <SecondSubStep handleSelectStep={handleSelectStep} />;
      case FormSubStepsEnum.sub_step_third:
        return <ThirdSubStep handleSelectStep={handleSelectStep} />;
      case FormSubStepsEnum.sub_step_fourth:
        return <FourthSubStep handleSelectStep={handleSelectStep} />;
      default:
        return <></>;
    }
  }, [currentSubStep, handleSelectStep]);

  return <Box>{content}</Box>;
};

export default LPRegistrationStep;
