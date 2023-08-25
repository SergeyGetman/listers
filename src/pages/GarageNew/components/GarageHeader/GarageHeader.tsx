import React, { FC, ReactNode } from 'react';

export interface IGarageHeader {
  title: string;
  children?: ReactNode;
}

const GarageHeader: FC<IGarageHeader> = ({ title, children }) => {
  return (
    <>
      <div>{title}</div>
      <div>{children}</div>
    </>
  );
};

export default GarageHeader;
