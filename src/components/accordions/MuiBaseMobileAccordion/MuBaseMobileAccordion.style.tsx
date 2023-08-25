import { Accordion, AccordionSummary, AccordionDetails, Box, styled } from '@mui/material';

type BaseMobileAccordionSummaryProps = {
  isExpanded?: boolean;
  isDefaultHeaderPadding: boolean;
};
type BaseMobileAccordionProps = {
  isBlurred?: boolean;
};

export const BaseMobileAccordion = styled(Accordion, {
  shouldForwardProp: (prop) => prop !== 'isBlurred',
})<BaseMobileAccordionProps>(({ theme, isBlurred }) => ({
  backgroundColor: 'transparent',
  transition: 'all, 0.2s',
  opacity: isBlurred ? '0.7' : '',
  '&:hover': {
    boxShadow: theme.palette.case.shadow.big,
  },
  '& .MuiAccordionSummary-root': {
    cursor: 'default',
    minHeight: '70px  ',
    height: 'auto',
  },
}));

export const BaseMobileAccordionSummary = styled(AccordionSummary, {
  shouldForwardProp: (prop) => prop !== 'isExpanded' && prop !== 'isDefaultHeaderPadding',
})<BaseMobileAccordionSummaryProps>(({ theme, isExpanded, isDefaultHeaderPadding }) => ({
  backgroundColor: `${theme.palette.case.background} !important`,
  borderRadius: isExpanded ? '5px 5px 0px 0px' : '5px',
  padding: isDefaultHeaderPadding ? '0 16px' : '0',

  height: '70px',
  '& .MuiAccordionSummary-content': {
    margin: 0,
    width: '100%',
  },
}));

export const BaseMobileAccordionSummaryContainer = styled(Box)(() => ({
  width: '93%',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export const BaseMobileAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.case.neutral.n50,

  borderRadius: '0 0 5px 5px',
  padding: '16px 0 0 0',
}));

export const BaseMobileAccordionDetailsBackground = styled(Box)(() => ({
  width: '100%',
  height: '8px',
  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.12) 100%)',
  transform: 'rotate(-180deg)',
  position: 'absolute',
  top: 0,
  left: 0,
}));
