import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import { getCurrentTransport } from '../store/garageThunkV2';
import { setBreadcrumbs } from '../../../store/Common/commonThunk';
import { getCurrentTransportSelector, getIsLoadingGarageSelector } from '../store/garage-selectors';
import { setLoadingGarage } from '../store/garageSliceV2';

import NavigationTabs from '../../../components/NavigationTabs/NavigationTabs';
import NavigationPanel from './NavigationPanel/NavigationPanel';
import { Skeleton } from '../components/Skeleton/Skeleton';

import router from '../../../shared/services/router';
import { getCurrentTab } from './utils/getCurrentTab';
import { getGarageTabs } from './utils/getGarageTabs';
import { cardInformationIndexTabs } from '../const/card-information-index-tabs';

const GarageCardInformation = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentTabName = getCurrentTab(location.pathname);

  const isLoadingGarage = useAppSelector(getIsLoadingGarageSelector);
  const transport = useAppSelector(getCurrentTransportSelector);

  const [tabsIndex, setTabsIndex] = useState(
    cardInformationIndexTabs[currentTabName || cardInformationIndexTabs['general-information']],
  );

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue !== tabsIndex) {
      switch (newValue) {
        case cardInformationIndexTabs['general-information']: {
          setTabsIndex(cardInformationIndexTabs['general-information']);
          navigate(router.garageNew.children.garageCardInformation.generalInfo.path);
          break;
        }
        case cardInformationIndexTabs.insurance: {
          setTabsIndex(cardInformationIndexTabs.insurance);
          navigate(router.garageNew.children.garageCardInformation.insurance.path);
          break;
        }
        case cardInformationIndexTabs.gallery: {
          setTabsIndex(cardInformationIndexTabs.gallery);
          navigate(router.garageNew.children.garageCardInformation.gallery.path);
          break;
        }
        case cardInformationIndexTabs.share: {
          setTabsIndex(cardInformationIndexTabs.share);
          navigate(router.garageNew.children.garageCardInformation.share.path);
          break;
        }

        default: {
          navigate(router.garageNew.children.garageCardInformation.generalInfo.path);
          setTabsIndex(cardInformationIndexTabs['general-information']);
          break;
        }
      }
    }
  };

  useEffect(() => {
    if (!transport.make && !transport.model) return;
    dispatch(
      setBreadcrumbs([
        {
          title: t('general.breadcrumbs.garage'),
          href: router.garageNew.path,
        },
        {
          title: `${transport.make}`,
        },
      ]),
    );
  }, [t, dispatch, transport.make, transport.model]);

  useEffect(() => {
    if (id) {
      dispatch(getCurrentTransport(+id))
        .unwrap()
        .then(() => {
          dispatch(setLoadingGarage({ isLoading: true }));
        });
    }
  }, [id, dispatch]);

  return (
    <Box>
      {isLoadingGarage ? <NavigationPanel transport={transport} /> : <Skeleton height="70px" />}

      <Box mt="16px">
        {isLoadingGarage ? (
          <NavigationTabs
            minWidthTabs="40px"
            value={tabsIndex}
            handleChange={handleChangeTab}
            tabs={getGarageTabs(isMobile)}
          />
        ) : (
          <Skeleton height="40px" />
        )}
      </Box>

      <Outlet />
    </Box>
  );
};

export default GarageCardInformation;
