import { Box, styled } from '@mui/material';

export const ContentContainer = styled(Box)<{ isNotAcceptedItem: boolean }>(({ isNotAcceptedItem }) => ({
  opacity: isNotAcceptedItem ? 0.7 : 1,
  pointerEvents: isNotAcceptedItem ? 'none' : 'auto',
}));

export const ContentHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '4px 12px',
}));

export const ContentTopContainer = styled(Box)<{ isNotAcceptedItem: boolean }>(
  ({ theme, isNotAcceptedItem }) => ({
    '&::-webkit-scrollbar': {
      width: '4px !important',
      borderRadius: '8px',
      marginRight: '4px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#EFF1FB ',
      width: '4px !important',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#BFC4DA',
      width: '4px !important',
    },
    width: '100%',
    height: isNotAcceptedItem ? '147px' : '194px',
    pointerEvents: 'auto',
    padding: '0 12px',
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
      height: isNotAcceptedItem ? '147px' : '120px',
      marginBottom: isNotAcceptedItem ? 0 : '12px',
    },
  }),
);
