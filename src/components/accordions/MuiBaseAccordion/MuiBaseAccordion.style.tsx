import { Accordion, AccordionSummary, AccordionDetails, styled } from '@mui/material';

type BaseAccordionProps = {
  withHover?: boolean;
};

type BaseAccordionSummaryProps = {
  isDisabledExpand?: boolean;
  isBoxShadow?: boolean;
};

type BaseAccordionDetailsProps = {
  withHover?: boolean;
};

export const BaseAccordion = styled(Accordion, {
  shouldForwardProp: (prop) => prop !== 'withHover',
})<BaseAccordionProps>(({ theme, withHover }) => ({
  backgroundColor: 'transparent',

  '&:hover': {
    backgroundColor: withHover ? theme.palette.case.background : 'transparent',
    borderRadius: withHover ? '5px' : 0,
    boxShadow: withHover ? theme.palette.case.shadow.big : 'none',
    transition: 'all, 0.2s linear',
    '& .MuiAccordionSummary-content': {
      borderRadius: withHover ? '5px 5px 0 0' : '5px',
    },
  },

  '& .MuiAccordionSummary-root': {
    cursor: 'default',
    minHeight: '15px !important',
  },
}));

export const BaseAccordionSummary = styled(AccordionSummary, {
  shouldForwardProp: (prop) => prop !== 'isDisabledExpand' && prop !== 'isBoxShadow',
})<BaseAccordionSummaryProps>(({ theme, isDisabledExpand, isBoxShadow }) => ({
  padding: 0,

  '& .MuiAccordionSummary-content': {
    margin: '0px',
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    cursor: isDisabledExpand ? 'default' : 'pointer',
    height: '35px',
    padding: '0 10px',
    borderRadius: '5px',
    backgroundColor: theme.palette.case.background,
    boxShadow: isBoxShadow ? theme.palette.case.shadow.extraSmall : 'initial',
  },
}));

export const BaseAccordionDetails = styled(AccordionDetails, {
  shouldForwardProp: (prop) => prop !== 'withHover',
})<BaseAccordionDetailsProps>(({ withHover }) => ({
  padding: withHover ? '16px 10px 10px 10px' : '16px 0px 0px 0px',
}));
