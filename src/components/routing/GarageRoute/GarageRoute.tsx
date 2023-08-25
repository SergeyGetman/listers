import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { CreateGarageItemModalContextProvider } from '../../modals/garage/CreateGarageItemModal/context/CreateGarageItemModalContext';

const GarageRoute = () => {
  return (
    <Suspense fallback={null}>
      <CreateGarageItemModalContextProvider>
        <Outlet />
      </CreateGarageItemModalContextProvider>
    </Suspense>
  );
};

export default GarageRoute;
