import React from 'react';
import { Outlet } from 'react-router-dom';

import { SettingsContainer } from './Settings.style';

const Settings = () => {
  return (
    <SettingsContainer>
      <Outlet />
    </SettingsContainer>
  );
};

export default Settings;
