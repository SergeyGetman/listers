import React, { FC, useMemo } from 'react';
import { Box } from '@mui/material';
import FirstSubStep from './components/FirstSubStep';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../../../shared/enums/formSteps.enum';
type GalleryStepProps = {
  handleSelectStep: (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => void;
  currentSubStep: FormSubStepsEnum;
};
const GalleryStep: FC<GalleryStepProps> = ({ handleSelectStep, currentSubStep }) => {
  const content = useMemo(() => {
    switch (currentSubStep) {
      case FormSubStepsEnum.sub_step_first:
        return <FirstSubStep handleSelectStep={handleSelectStep} />;
      default:
        return <></>;
    }
  }, [currentSubStep, handleSelectStep]);

  return <Box>{content}</Box>;
};

export default GalleryStep;
