import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { setAuth } from './store/Common/commonSlice';
import MuiPreloader from './components/MuiPreloader';
import { useAppDispatch, useAppSelector } from './shared/hooks/redux';
import RoutesContainer from './components/routing/RoutesContainer';
import RootModal from './components/modals/RootModal';
import './shared/locales/i18n';

const App = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { loaders } = useAppSelector(({ common }) => common);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setAuth(true));
    }
  }, [dispatch]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.case.neutral.n75,
      }}
    >
      <RoutesContainer />
      <RootModal />
      <MuiPreloader isShow={!!loaders.length} />
    </Box>
  );
};

export default App;
