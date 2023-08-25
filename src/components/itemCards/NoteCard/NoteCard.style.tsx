import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  width: '381px',
  height: '312px',
  background: theme.palette.case.neutral.n0,
  border: `1px solid ${theme.palette.case.neutral.n300}`,
  borderRadius: '8px',
  margin: '0 24px 24px 0',
}));

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '48px',
  padding: '0 12px',
  borderRadius: '5px 5px 0px 0px',
  borderBottom: `1px solid ${theme.palette.case.neutral.n300}`,
}));

export const ContentContainer = styled(Box)(() => ({
  width: '100%',
  height: 'calc(100% - 48px)',
  padding: '0 12px',
}));

export const ContentHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '36px',
  padding: '8px 0',
}));

export const Content = styled(Box)(() => ({
  width: '100%',
  height: 'calc(100% - 36px)',
}));

export const ChecklistItemWrap = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  margin: '8px 0',
  maxHeight: '156px',
  overflowY: 'auto',
}));
