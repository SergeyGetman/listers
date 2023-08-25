import { Drawer, styled } from '@mui/material';

type RightSidebarDrawerProps = {
  open: boolean;
  isSmallDisplay?: boolean;
};

export const SidebarDrawer = styled(Drawer, {
  shouldForwardProp: (prop: string) => !['isSmallDisplay'].includes(prop),
})<RightSidebarDrawerProps>(({ theme, open, isSmallDisplay }) => ({
  overflow: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
  '& .MuiDrawer-paper': {
    border: 'none',
    overflowX: 'hidden',

    width: isSmallDisplay ? (open ? '300px' : '0') : open ? '200px' : '0',
    height: '100%',

    borderRadius: '0px',
    boxShadow: '0px 4px 8px rgba(38, 44, 74, 0.16)',
    backgroundColor: theme.palette.case.contrast.white,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: '0.4s',
    }),
  },
}));
