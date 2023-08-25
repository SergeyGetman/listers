import { Box, styled } from '@mui/material';

export const BacklogItemContainer = styled(Box)(({ theme }) => ({
  width: '345px',
  padding: '10px 20px 10px 5px ',
  height: '215px',
  '&:last-of-type': {
    marginBottom: '100px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '10px 0',
    height: '156px',
  },
}));

export const BacklogContainer = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  msOverflowStyle: 'none',
  '& ::-webkit-scrollbar': {
    width: '0px !important',
  },
  '& .backlog-list': {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '@media (max-width: 700px)': {
      justifyContent: 'center',
    },
  },
}));

export const BacklogBottomGradientContainer = styled(Box)(() => ({
  position: 'fixed',
  width: '100%',
  height: '127px',
  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 68.22%)',
  bottom: 0,
  zIndex: 10,
  left: 0,
}));
