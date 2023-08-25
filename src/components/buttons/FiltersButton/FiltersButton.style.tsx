import { styled } from '@mui/material';
import MuiButton from '../MuiButton';

type FiltersButtonProps = {
  isHideTextOnMobile: boolean;
};

export const FiltersButtonItem = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'isHideTextOnMobile',
})<FiltersButtonProps>(({ theme, isHideTextOnMobile }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: isHideTextOnMobile ? '0px' : '13px',
    '& .MuiButton-startIcon': {
      margin: isHideTextOnMobile ? '0px' : '',
    },
    minWidth: isHideTextOnMobile ? '20px' : '',
  },
}));
