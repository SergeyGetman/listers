import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const MultipleRoute = () => {
  return (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  );
};

export default MultipleRoute;
