import { Box, styled } from '@mui/material';
type AddBottomButtonContainerProps = {
  isOpenRightSidebar?: boolean;
};
export const AddBottomButtonContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isOpenRightSidebar'].includes(prop),
})<AddBottomButtonContainerProps>(({ theme, isOpenRightSidebar }) => ({
  position: 'fixed',
  right: isOpenRightSidebar ? '500px' : '120px',
  transition: isOpenRightSidebar ? 'all 0.5s' : 'all 1s',
  bottom: 50,
  zIndex: 100,
  [theme.breakpoints.down('md')]: {
    right: 30,
    bottom: 20,
    zIndex: 100,
  },
}));
