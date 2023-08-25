import { Menu, MenuItem, styled } from '@mui/material';

export const SidebarActionMenuContainer = styled(Menu)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },

  '& .MuiMenu-paper': {
    boxShadow: '0px 4px 16px rgba(38, 44, 74, 0.16)',
    padding: '4px',
    width: '200px',
    backgroundColor: theme.palette.case.background,
    '& .MuiList-root': {
      padding: 0,
    },
  },
}));

export const SidebarActionMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop: string) => !['isHideIcon'].includes(prop),
})<{ isHideIcon?: boolean }>(({ theme }) => ({
  boxShadow: 'none',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '5px',
  height: '32px',
  mt: '10px',
  mb: '1px',
  width: '100%',
  fontSize: theme.typography.default.fontSize,
  lineHeight: theme.typography.default.lineHeight,
  fontWeight: theme.typography.default.fontWeight,
  padding: '5px',
  color: theme.palette.case.neutral.n700,
  backgroundColor: theme.palette.case.background,
  [theme.breakpoints.down('sm')]: {
    minHeight: '29px',
  },
  '&:last-of-type': {
    marginBottom: 0,
  },
  svg: {
    marginRight: '6px',
    width: '20px',
    height: '20px',
  },

  '&:hover': {
    backgroundColor: theme.palette.case.neutral.n100,
  },

  '&.Mui-selected': {
    backgroundColor: theme.palette.case.neutral.n100,
    color: theme.palette.case.neutral.n900,
    svg: {
      path: {
        fill: theme.palette.case.neutral.n900,
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.case.neutral.n100,
    },
  },
}));
