import React, { FC, useMemo } from 'react';
import WrapperCreateCarGarage from '../WrapperCreateCarGarage';

export interface IFirstStepIntoInshurance {
  step?: number;
}

const FirstStepIntoInsurance: FC<IFirstStepIntoInshurance> = ({ step }) => {
  const content = useMemo(() => {
    switch (step) {
      case 1:
        return <WrapperCreateCarGarage />;
      default:
        return null;
    }
  }, [step]);

  return <>{content}</>;
};

export default FirstStepIntoInsurance;
