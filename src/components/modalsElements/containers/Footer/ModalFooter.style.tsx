import { Box, styled } from '@mui/material';

type ModalFooterContainerProps = {
  footerPosition: 'initial' | 'absolute' | 'fixed' | 'sticky';
  isBottomRounded?: boolean;
  isBoxShadow: boolean;
  isShowBackGround: boolean;
  isBorderTop: boolean;
};

export const ModalFooterContainer = styled(Box, {
  shouldForwardProp: (prop: string) =>
    !['isBottomRounded', 'footerPosition', 'isBoxShadow', 'isShowBackGround', 'isBorderTop'].includes(prop),
})<ModalFooterContainerProps>(
  ({ theme, footerPosition, isBottomRounded, isBorderTop, isShowBackGround }) => ({
    flexGrow: 0,
    position: footerPosition,
    borderRadius: isBottomRounded ? '0 0 5px  5px' : '',
    bottom: 0,
    left: 0,
    height: '64px',
    zIndex: 10,
    backgroundColor: isShowBackGround ? theme.palette.case.contrast.white : 'transparent',
    borderTop: isBorderTop ? `1px solid ${theme.palette.case.neutral.n100}` : 'none',
    // boxShadow: isBoxShadow ? theme.palette.case.shadow.small : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  }),
);

export const FooterSecurityContainer = styled(Box)(({ theme }) => ({
  minWidth: '10px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));
