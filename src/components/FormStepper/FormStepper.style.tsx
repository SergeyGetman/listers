import { Box, styled } from '@mui/material';

type FormStepperStepType = {
  isSelected?: boolean;
  isDisabled?: boolean;
};
type FormStepperStepBlockType = {
  isSelected?: boolean;
  isFilled?: boolean;
  isDisabled?: boolean;
};

export const FormStepperContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isSelected', 'isDisabled'].includes(prop),
})<FormStepperStepType>(({ theme, isSelected, isDisabled }) => ({
  display: 'flex',
  cursor: isDisabled ? 'default' : 'pointer',
  width: '164px',
  flexDirection: 'column',
  transition: 'all 0.3s',

  '& .form-stepper-step-name': {
    color: isSelected ? theme.palette.case.primary.p600 : theme.palette.case.neutral.n500,
    transition: 'all 0.3s',
  },
  '& .form-stepper-label': {
    color: isSelected ? theme.palette.case.neutral.n900 : theme.palette.case.neutral.n500,
    transition: 'all 0.3s',
  },
}));

export const FormStepperStepBlock = styled(Box, {
  shouldForwardProp: (prop: string) => !['isSelected', 'isFilled', 'isDisabled'].includes(prop),
})<FormStepperStepBlockType>(({ theme, isSelected, isFilled, isDisabled }) => ({
  maxHeight: isSelected ? '12px' : '8px',
  height: '12px',
  cursor: isDisabled ? 'default' : 'pointer',
  marginTop: isSelected ? '8px' : '12px',
  backgroundColor: isDisabled
    ? theme.palette.case.neutral.n700
    : isSelected
    ? theme.palette.case.primary.p600
    : isFilled
    ? theme.palette.case.neutral.n500
    : theme.palette.case.neutral.n300,
  width: '100%',
  transition: 'all 0.3s',
  marginRight: '4px',
  '&:hover': {
    backgroundColor: isDisabled ? theme.palette.case.neutral.n700 : theme.palette.case.primary.p600,
    transition: 'all 0.3s',
  },
}));

export const FormStepperStepNameDot = styled(Box)(({ theme }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: theme.palette.case.primary.p600,
  marginRight: '8px',
}));
