import { Box, Menu, MenuItem, styled } from '@mui/material';

export const ActionMenuMobileFromPlus = styled(Menu, {
  shouldForwardProp: (prop: string) => !['isMobile', 'isMobileVariant'].includes(prop),
})<{ isMobile: boolean; isMobileVariant?: boolean }>(({ theme, isMobile, isMobileVariant }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: isMobile ? theme.palette.case.neutral.n800 : 'transparent',
    opacity: '0.6000000238418579 !important',
  },
  '& .MuiMenu-paper': {
    boxShadow: 'none',
    borderRadius: isMobile ? '8px 8px 0 0 ' : '8px',
    backgroundColor: theme.palette.case.background,
    width: '200px',

    [theme.breakpoints.down('sm')]: isMobileVariant
      ? {
          width: '100%',
          maxWidth: '100%',
          top: 'auto !important',
          bottom: '0',
          left: '0px !important',
          right: '0px !important',
        }
      : {},
  },
  '& .MuiMenu-list': {
    padding: '0',
  },
}));

export const ActionMenuMobileHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '16px',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.case.neutral.n200}`,
}));

export const ActionMenuMobileFromPlusItem = styled(MenuItem, {
  shouldForwardProp: (prop: string) => !['isMobile', 'isMobileVariant'].includes(prop),
})<{ isMobile: boolean; isMobileVariant?: boolean }>(({ theme, isMobile, isMobileVariant }) => ({
  boxShadow: 'none',
  borderRadius: isMobile ? '8px' : '4px',
  border: isMobile ? `1px solid ${theme.palette.case.neutral.n200}` : 'none',
  height: '36px',
  padding: isMobile ? '12px' : '8px',
  backgroundColor: isMobile ? theme.palette.case.background : 'transparent ',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '100%',
    minHeight: isMobileVariant ? '48px' : ' 36px',
  },
  '&:hover': {
    backgroundColor: theme.palette.case.neutral.n100,
    color: theme.palette.case.contrast.black,
  },
  '&.Mui-disabled': {
    opacity: 1,
    backgroundColor: theme.palette.case.background,
    color: theme.palette.case.neutral.n400,
    cursor: 'not-allowed !important',
  },
}));
