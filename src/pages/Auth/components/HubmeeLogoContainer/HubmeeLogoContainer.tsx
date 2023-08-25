import React from 'react';
import { ReactComponent as HumbmeeLogo } from '../../../../assets/Images/hubmee-logo.svg';

const HubmeeLogoContainer = () => {
  return (
    <a href={process.env.REACT_APP_PROMO_HOST}>
      <HumbmeeLogo />
    </a>
  );
};

export default HubmeeLogoContainer;
