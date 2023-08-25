import { Box, styled } from '@mui/material';

type ModalContainerProps = {
  modalMaxWith: 'sm' | 'md' | 'lg' | 'xl';
  modalMinWith?: string;
  customMaxWith?: string;
  isFullWidth: boolean;
  isFullHeight: boolean;
};

export const ModalContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'modalMaxWith' &&
    prop !== 'modalMinWith' &&
    prop !== 'customMaxWith' &&
    prop !== 'isFullWidth' &&
    prop !== 'isFullHeight',
})<ModalContainerProps>(
  ({ theme, modalMaxWith, modalMinWith, customMaxWith, isFullWidth, isFullHeight }) => ({
    position: 'absolute' as 'absolute',
    outline: 'none',
    top: '50%',
    left: '50%',
    height: isFullHeight ? '100%' : 'initial',
    transform: 'translate(-50%, -50%)',
    maxWidth: isFullWidth ? '100%' : customMaxWith ? customMaxWith : theme.breakpoints.values[modalMaxWith],
    minWidth: modalMinWith ? modalMinWith : 'initial',
    width: isFullWidth ? '100%' : '86%',
    backgroundColor: theme.palette.case.background,
    borderRadius: '8px',
    msOverflowStyle: 'none',
    '& ::-webkit-scrollbar': {
      width: '0px !important',
    },
  }),
);

export const ModalCloseButtonContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '-45px',
  top: '-45px',
  transition: `all 0.2s ${theme.transitions.easing.easeInOut}`,
  [theme.breakpoints.down('sm')]: {
    right: '0px',
  },
}));
