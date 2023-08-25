import { Box, styled, Typography } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

export const MainContainer = styled(Box)(() => ({
  width: '100%',
  height: '100vh',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
}));

export const CreateNewCarModalHeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: '16px 0',
  [theme.breakpoints.down('sm')]: {
    height: '5px',
    margin: '2px 2px 20px ',
    width: '100%',
  },
}));

// TODO refactor margin -250px

export const IconBlock = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  backgroundRepeat: 'no-repeat',

  [theme.breakpoints.down('sm')]: {
    padding: '16px',
    width: '100%',
    position: 'absolute',
    marginTop: '5rem',
  },
}));

export const TypographyWithBreakpoints = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontFamily: 'Archivo',
  fontWeight: '500',
  lineHeight: '36px',
  padding: '16px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    whiteSpace: 'nowrap',
    fontFamily: 'Archivo',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '36px',
    position: 'relative',
  },
}));

export const RangeIndicator = styled(Box)(({ theme }) => ({
  width: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
    position: 'absolute',
    width: '100%',
    marginTop: '0.3rem',
    display: 'initial',
    padding: '15px',
  },
}));

export const RangeIndicatorLine = styled(Box)(({ theme }) => ({
  maxWidth: '200px',
  width: '100%',
  marginRight: '40px',
  [theme.breakpoints.down('sm')]: {
    display: 'initial',
  },
}));

export const TextStyle = styled(Typography)(({ theme }) => ({
  fontSize: '10px',
  fontFamily: 'Archivo',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '36px',
  color: theme.palette.case.neutral.n500,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.case.neutral.n200,
  zIndex: 1,
  color: theme.palette.primary.light,
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: theme.palette.case.primary.p100,
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.case.primary.p600,
    stroke: theme.palette.case.primary.p100,
  }),
}));

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 12,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.case.primary.p600,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.case.primary.p600,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.case.neutral.n200,
    borderRadius: 1,
  },
}));
