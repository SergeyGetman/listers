import { Drawer, styled } from '@mui/material';

type RightSidebarDrawerProps = {
  open: boolean;
};

export const RightSidebarDrawer = styled(Drawer)<RightSidebarDrawerProps>(({ theme, open }) => ({
  '& .MuiModal-root': {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: open ? '0.5s' : '0.5s',
    }),
  },

  '& .MuiDrawer-paper': {
    border: 'none',
    overflow: 'hidden',
    maxWidth: open ? '374px' : 0,
    width: '100%',
    height: '100%',
    borderRadius: '0px',
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0px 4px 8px rgba(38, 44, 74, 0.16)',
    backgroundColor: theme.palette.case.background,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: open ? '0.5s' : '0.5s',
    }),
  },
}));
