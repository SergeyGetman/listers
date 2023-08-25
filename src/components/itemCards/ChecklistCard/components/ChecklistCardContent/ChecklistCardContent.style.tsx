import { Box, styled } from '@mui/material';

export const ContentContainer = styled(Box)(() => ({
  width: '100%',
  height: 'calc(100% - 48px)',
}));

export const ContentHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '4px 12px',
}));

export const ContentTopContainer = styled(Box)<{ isNotAcceptedItem: boolean }>(({ isNotAcceptedItem }) => ({
  opacity: isNotAcceptedItem ? 0.7 : 1,
  pointerEvents: isNotAcceptedItem ? 'none' : 'auto',
  minHeight: '237px',
  height: isNotAcceptedItem ? 'calc(100% - 60px)' : '100%',
}));

export const Content = styled(Box)(() => ({
  width: '100%',
  height: 'calc(100% - 48px)',
  overflow: 'hidden',
}));

export const ChecklistItemWrap = styled(Box)<{ isNotAcceptedItem: boolean; isEditor: boolean }>(
  ({ isNotAcceptedItem, isEditor, theme }) => ({
    '&::-webkit-scrollbar': {
      width: '4px !important',
      borderRadius: '8px',
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
    overflowX: 'hidden',
    maxHeight: isNotAcceptedItem ? '145px' : !isEditor ? '194px' : '201px',
    margin: '8px 0',
    overflowY: 'auto',
    minHeight: '112px',
    pointerEvents: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '450px',
    },
  }),
);
