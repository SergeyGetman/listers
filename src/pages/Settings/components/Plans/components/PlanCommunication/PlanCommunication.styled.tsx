import { styled, Box } from '@mui/material';

export const CommunicationCardContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.case.neutral.n0,
  padding: '16px',
  boxShadow: ' 0px 4px 8px rgba(38, 44, 74, 0.08)',
  borderRadius: '8px',
}));

export const CommunicationCardHeaderContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
}));
export const CommunicationCardHeaderIcon = styled(Box)(({ theme }) => ({
  marginRight: '15px',
  svg: {
    width: '24px',
    path: {
      fill: theme.palette.case.neutral.n500,
    },
  },
}));
