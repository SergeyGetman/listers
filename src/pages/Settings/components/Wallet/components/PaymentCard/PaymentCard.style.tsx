import { Box, styled } from '@mui/material';

type PaymentCardContainerProps = {
  isClickable?: boolean;
};

export const PaymentCardContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isClickable'].includes(prop),
})<PaymentCardContainerProps>(({ theme, isClickable }) => ({
  width: '384px',
  padding: '16px 10px',
  background: theme.palette.case.contrast.white,
  boxShadow: theme.palette.case.shadow.small,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  borderRadius: '10px',
  cursor: isClickable ? 'pointer' : 'default',
  [theme.breakpoints.down('sm')]: {
    width: '350px',
  },

  '@media (max-width: 380px)': {
    width: '340px',
  },
}));

export const PaymentCardData = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '16px',
  marginBottom: '20px',
}));

export const PaymentCardVariants = styled(Box)(({ theme }) => ({
  img: {
    height: '20px',
    width: '344px',
    [theme.breakpoints.down('sm')]: {
      height: '18px',
      width: '335px',
    },
  },
}));
