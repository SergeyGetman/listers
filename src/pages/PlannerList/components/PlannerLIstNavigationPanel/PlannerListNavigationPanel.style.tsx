import { Box, styled } from '@mui/material';

export const PlannerLIstNavigationPanelContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isData'].includes(prop),
})<{ isData: boolean }>(({ isData }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  marginBottom: isData ? '30px' : 0,
  paddingLeft: '5px',
}));
