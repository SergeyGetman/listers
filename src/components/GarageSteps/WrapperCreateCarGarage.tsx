import React, { FC, ReactNode } from 'react';

interface IWrapperCreateCarGarage {
  children?: ReactNode;
}

const WrapperCreateCarGarage: FC<IWrapperCreateCarGarage> = () => {
  return <h1>Hello World</h1>;
};

export default WrapperCreateCarGarage;
