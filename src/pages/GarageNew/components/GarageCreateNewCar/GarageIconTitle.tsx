import React from 'react';
import { StepIconProps } from '@mui/material/StepIcon';
import { ColorlibStepIconRoot } from './GarageCreateNewCar.style';
import { ReactComponent as Journal } from '../../../../assets/Images/newGarage/headerImageTooltip/Journal.svg';
import { ReactComponent as Inshurance } from '../../../../assets/Images/newGarage/headerImageTooltip/Insurance.svg';
import { ReactComponent as Galery } from '../../../../assets/Images/newGarage/headerImageTooltip/Image.svg';

export const ColorlibStepIcon = ({ active, completed, className, icon }: StepIconProps) => {
  const icons: { [index: string]: React.ReactElement } = {
    1: <Journal />,
    2: <Inshurance />,
    3: <Galery />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
};
