import React, { ReactNode } from 'react';
import { TransportTypeEnum } from '../../../shared/enums/garage.enums';
import { ReactComponent as CarIcon } from '../../../assets/Images/newGarage/garage-main-item/Car.svg';
import { ReactComponent as MotoIcon } from '../../../assets/Images/newGarage/garage-main-item/Bike.svg';
import { ReactComponent as BoatIcon } from '../../../assets/Images/newGarage/garage-main-item/Boat.svg';

export const EmptyTransportTypeIcon: { [Key in TransportTypeEnum]: ReactNode } = {
  car: <CarIcon />,
  motorcycle: <MotoIcon />,
  custom: <BoatIcon />,
};
