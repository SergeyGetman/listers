import React, { FC, useMemo } from 'react';
import { Box } from '@mui/material';
import FirstSubStep from './components/FirstSubStep';
import SecondSubStep from './components/SecondSubStep';
import ThirdSubStep from './components/ThirdSubStep';
import FourthSubStep from './components/FourthSubStep';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../../../shared/enums/formSteps.enum';
import { TransportTypeEnum } from '../../../../../../../shared/enums/garage.enums';

type GeneralInfoStepProps = {
  handleSelectStep: (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => void;
  transportType: TransportTypeEnum;
  currentSubStep: FormSubStepsEnum;
};
const GeneralInfoStep: FC<GeneralInfoStepProps> = ({ handleSelectStep, transportType, currentSubStep }) => {
  const content = useMemo(() => {
    switch (currentSubStep) {
      case FormSubStepsEnum.sub_step_first:
        return <FirstSubStep transportType={transportType} handleSelectStep={handleSelectStep} />;
      case FormSubStepsEnum.sub_step_second:
        return <SecondSubStep handleSelectStep={handleSelectStep} />;
      case FormSubStepsEnum.sub_step_third:
        return <ThirdSubStep handleSelectStep={handleSelectStep} />;
      case FormSubStepsEnum.sub_step_fourth:
        return <FourthSubStep handleSelectStep={handleSelectStep} />;
      default:
        return <></>;
    }
  }, [currentSubStep, handleSelectStep, transportType]);

  return <Box>{content}</Box>;
};

export default GeneralInfoStep;
