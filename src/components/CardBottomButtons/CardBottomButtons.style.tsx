import { Box, styled } from '@mui/material';

export const ContentContainer = styled(Box)<{ isNotAcceptedItem: boolean }>(({ isNotAcceptedItem }) => ({
  opacity: isNotAcceptedItem ? 0.7 : 1,
  pointerEvents: isNotAcceptedItem ? 'none' : 'auto',
}));

export const ContentHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 6px',
  height: '36px',
  width: '100%',
  margin: '8px 0',
}));

export const ContentTopContainer = styled(Box)<{ isNotAcceptedItem: boolean }>(
  ({ theme, isNotAcceptedItem }) => ({
    width: '100%',
    height: isNotAcceptedItem ? '135px' : '172px',
    pointerEvents: 'auto',
    padding: '0 12px',
    overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      height: isNotAcceptedItem ? '132px' : '120px',
    },
  }),
);

export const ContentBottomContainer = styled(Box)(() => ({
  display: 'flex',
  marginTop: '6px',
  width: '100%',
}));

export const ButtonWrap = styled(Box)(({ theme }) => ({
  width: '50%',
  borderRight: `1px solid ${theme.palette.case.neutral.n300}`,
}));

export const Content = styled(Box)(() => ({
  width: '100%',
  height: 'calc(100% - 36px)',
}));

export const ChecklistItemWrap = styled(Box)<{ isNotAcceptedItem: boolean; isEditor: boolean }>(
  ({ isNotAcceptedItem, isEditor }) => ({
    width: '100%',
    maxHeight: isNotAcceptedItem ? '119px' : !isEditor ? '194px' : '156px',
    margin: '8px 0',
    overflowY: 'scroll',
    minHeight: '112px',
    pointerEvents: 'auto',
  }),
);
