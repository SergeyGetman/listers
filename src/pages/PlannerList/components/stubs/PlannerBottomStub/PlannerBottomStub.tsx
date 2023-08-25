import React, { memo } from 'react';
import {
  PlannerBottomStubBox,
  PlannerBottomStubContainer,
  PlannerBottomStubDescription,
} from './PlannerBottomStubBox.style';
import PlannerStub from '../../../../../assets/Images/stub/plannerStub.svg';
import { plannerBottomStubConfig } from '../../../../../shared/configs/stub.config';

const PlannerBottomStub = () => {
  const motivationQuotes = plannerBottomStubConfig;
  const randomText = () => {
    return motivationQuotes[Math.floor(Math.random() * 16)];
  };

  return (
    <PlannerBottomStubContainer>
      <PlannerBottomStubBox>
        <PlannerBottomStubDescription>{randomText()}</PlannerBottomStubDescription>
        <img src={PlannerStub} alt="Main stub" />
      </PlannerBottomStubBox>
    </PlannerBottomStubContainer>
  );
};

export default memo(PlannerBottomStub);
