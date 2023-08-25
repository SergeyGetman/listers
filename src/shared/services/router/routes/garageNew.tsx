import { lazy, memo } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { componentLoader } from '../../../utils/componentLoader';

const Garage = memo(lazy(() => componentLoader(() => import('../../../../pages/GarageNew'))));
// const GarageOpenItem = memo(
//   lazy(() => componentLoader(() => import('../../../../pages/Garage/components/GarageOpenItem'))),
// );

const PreStepBestWayAdd = memo(
  lazy(() => componentLoader(() => import('../../../../pages/GarageNew/GaragePreSteps/PreStepBestWayAdd'))),
);
const PreStepHubmeeAI = memo(
  lazy(() => componentLoader(() => import('../../../../pages/GarageNew/GaragePreSteps/PreStepHubmeeAI'))),
);

const PreStepCustom = memo(
  lazy(() => componentLoader(() => import('../../../../pages/GarageNew/GaragePreSteps/PreStepCustom'))),
);

const GarageCardInformation = memo(
  lazy(() => componentLoader(() => import('../../../../pages/GarageNew/GarageCardInformation'))),
);

const GarageViewGeneralInfo = memo(
  lazy(() =>
    componentLoader(() => import('../../../../pages/GarageNew/GarageCardInformation/GarageViewGeneralInfo')),
  ),
);

const garageNewRoute = {
  path: '/garageNew',
  component: <Outlet />,

  index: true,
  children: {
    garageMain: {
      path: ``,
      component: <Garage />,
    },
    garageCardInformation: {
      path: 'card-information',
      component: <GarageCardInformation />,
      generalInfo: {
        path: 'general-information',
        component: <GarageViewGeneralInfo />,
      },
      insurance: {
        path: 'insurance',
        component: (
          <Box sx={{ width: '100% ', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            insurance
          </Box>
        ),
      },
      gallery: {
        path: 'gallery',
        component: (
          <Box sx={{ width: '100% ', display: 'flex', alignItems: 'center', marginTop: '20px' }}>gallery</Box>
        ),
      },
      share: {
        path: 'share',
        component: (
          <Box sx={{ width: '100% ', display: 'flex', alignItems: 'center', marginTop: '20px' }}>share</Box>
        ),
      },
    },

    preStep: {
      path: `best-way`,
      component: <Outlet />,

      index: true,
      children: {
        bestWay: {
          path: ``,
          component: <PreStepBestWayAdd />,
        },
        HubmeeAI: {
          path: `Hubmee-AI`,
          component: <PreStepHubmeeAI />,
        },
        manual: {
          path: `manual`,
          component: <PreStepCustom />,
        },
      },
    },
  },
};
export default garageNewRoute;
