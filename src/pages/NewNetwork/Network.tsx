import React from 'react';
import { Outlet } from 'react-router-dom';
import NetworkNavigationPanel from './components/NetworkNavigationPanel';
import { NetworkPageContainer } from './Network.style';

const Network = () => {
  return (
    <NetworkPageContainer>
      <NetworkNavigationPanel />
      <Outlet />
    </NetworkPageContainer>
  );
};

export default Network;
