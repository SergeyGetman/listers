import { styled, Box } from '@mui/material';

export const OnboardingLayoutContainer = styled('div')<{
  maxWidth: number;
  minHeight: number;
  isFullWidth?: boolean;
}>`
  max-width: ${({ maxWidth, isFullWidth }) => (isFullWidth ? '' : `${maxWidth}px`)};
  min-height: ${({ minHeight }) => `${minHeight}px`};
  width: 100%;
  background: ${({ theme }) => theme.palette.case.neutral.n0};
  box-shadow: 0px 4px 16px rgba(38, 44, 74, 0.16);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  & ::-webkit-scrollbar {
    width: 0px !important;
  }

  ${({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      minHeight: 'auto',
      borderRadius: 0,
      boxShadow: 'none',
      height: '100%',
    },
  })}
`;

export const QuoteContainer = styled(Box)`
  width: 100%;
  padding: 16px 26px;
  border-radius: 16px;
  background: ${({ theme }) => theme.palette.case.neutral.n75};
  display: flex;
  flex-direction: column;
`;

export const CloseBtnContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-40px',
  right: '-40px',
  [theme.breakpoints.down('sm')]: {
    top: '25px',
    right: '15px',
  },
}));
