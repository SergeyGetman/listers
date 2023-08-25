import { Accordion, AccordionSummary, styled } from '@mui/material';

export const DotAccordion = styled(Accordion)(() => ({
  backgroundColor: 'transparent',
  '&::before': {
    backgroundColor: 'transparent !important',
  },
  '& .MuiAccordionSummary-root': {
    cursor: 'default',
    minHeight: '15px !important',
  },
}));
type DotAccordionSummaryProps = {
  isDisabledExpand?: boolean;
};
export const DotAccordionSummary = styled(AccordionSummary, {
  shouldForwardProp: (prop) => prop !== 'isDisabledExpand',
})<DotAccordionSummaryProps>(({ theme, isDisabledExpand }) => ({
  padding: 0,
  '& .MuiAccordionSummary-content': {
    margin: '0px',
    cursor: isDisabledExpand ? 'default' : 'pointer',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: '8px',
    borderBottom: `1px dashed ${theme.palette.case.neutral.n400}`,
  },
}));
