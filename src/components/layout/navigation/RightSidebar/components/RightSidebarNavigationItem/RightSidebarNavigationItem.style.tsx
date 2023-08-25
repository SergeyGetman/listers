import { Box, styled } from '@mui/material';

type RightSidebarNavigationItemBodyProps = {
  isActive: boolean;
};

export const RightSidebarNavigationItemBody = styled(Box, {
  shouldForwardProp: (prop: string) => !['isActive'].includes(prop),
})<RightSidebarNavigationItemBodyProps>(({ theme, isActive }) => ({
  height: '43px',
  width: '43px',
  backgroundColor: isActive ? theme.palette.primary.main : theme.palette.case.neutral.n50,
  cursor: 'pointer',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  svg: {
    path: {
      fill: isActive ? theme.palette.case.contrast.white : theme.palette.case.neutral.n700,
    },
  },
  '&:hover': {
    transition: '0.3s',
    backgroundColor: theme.palette.primary.main,
    svg: {
      path: {
        fill: theme.palette.case.contrast.white,
      },
    },
  },
}));

export const RightSidebarNavigationItemContainer = styled(Box)(({ theme }) => ({
  height: 65,
  width: '56px',
  borderBottom: `1px solid ${theme.palette.case.neutral.n100}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
