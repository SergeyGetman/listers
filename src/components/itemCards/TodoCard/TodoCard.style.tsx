import { Accordion, AccordionDetails, AccordionSummary, Box, styled } from '@mui/material';

export const TodoCardAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: '5px !important',
  marginRight: '16px',
  width: '100%',
  transition: 'all, 0.2s',
  '&:hover': {
    boxShadow: theme.palette.case.shadow.big,
  },
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-root': {
    cursor: 'default',
    minHeight: '45px',
    height: 'auto',
  },
}));

export const TodoCardAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.case.neutral.n50,
  padding: '5px 0 0px 0',
  borderRadius: ' 0 0 5px 5px !important',
}));

export const TodoCardAccordionSummary = styled(AccordionSummary, {
  shouldForwardProp: (prop) => prop !== 'isExpanded' && prop !== 'itemBorderColor',
})<{ isExpanded?: boolean; itemBorderColor: string | null }>(({ theme, isExpanded, itemBorderColor }) => ({
  backgroundColor: `${theme.palette.case.background} !important`,
  borderRadius: isExpanded ? '5px 5px 0px 0px' : '5px',
  border: `1px solid ${itemBorderColor ? itemBorderColor : theme.palette.case.neutral.n100}`,
  padding: '10px 12px 10px 16px',
  height: '45px',
  '& .MuiAccordionSummary-content': {
    margin: 0,
    width: '100%',
  },
}));

export const TodoCardAccordionDetailsBackground = styled(Box)(() => ({
  width: '100%',
  height: '8px',
  background: '  linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.12) 100%)',
  transform: 'rotate(-180deg)',
  position: 'absolute',
  top: 0,
  left: 0,
}));

export const TodoCardCounterBlock = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'itemBorderColor',
})<{ itemBorderColor?: string | null }>(({ theme, itemBorderColor }) => ({
  lineHeight: '11px',
  padding: '2px 4px',
  color: itemBorderColor || '',
  backgroundColor: itemBorderColor ? `${itemBorderColor}4D` : theme.palette.case.neutral.n100,
  borderRadius: '16px',
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
}));
