import { Accordion, AccordionSummary, styled } from '@mui/material';

export const AccordionCustom = styled(Accordion, {
  shouldForwardProp: (prop) => prop !== 'isNotAcceptedItem',
})<{ isNotAcceptedItem: boolean }>(({ theme, isNotAcceptedItem }) => ({
  width: '100%',
  borderRadius: '5px 5px 0px 0px',
  marginTop: '0 !important',
  boxShadow: 'none',
  '& .Mui-expanded': {
    minHeight: '48px !important',
  },
  '&:before': {
    display: 'none',
  },
  '& .Mui-focusVisible': {
    backgroundColor: 'transparent !important',
  },
  '& .MuiCollapse-hidden': {
    display: 'none',
  },
  // TODO add new color
  border: `1px solid ${isNotAcceptedItem ? '#2F861D' : theme.palette.case.neutral.n300}`,
}));

export const AccordionSummaryCustom = styled(AccordionSummary, {
  shouldForwardProp: (prop) => prop !== 'isNotAcceptedItem' && prop !== 'isOpen',
})<{ isNotAcceptedItem: boolean; isOpen?: boolean }>(({ theme, isNotAcceptedItem, isOpen }) => ({
  opacity: isNotAcceptedItem ? 0.7 : 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '48px',

  padding: '0 12px',
  borderRadius: '5px 5px 0px 0px',
  borderBottom: isOpen ? `1px solid ${theme.palette.case.neutral.n300}` : 'none !important',
  '& .Mui-expanded': {
    maxHeight: '48px !important',
    minHeight: '48px !important',
  },

  '& .MuiAccordionSummary-content': {
    minWidth: '0 !important',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    display: 'flex',
    alignItems: 'center',
  },
}));
