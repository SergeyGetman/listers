import { styled, Box } from '@mui/material';

export const PlanItemCardContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isCurrent', 'cardHeight'].includes(prop),
})<{
  isCurrent: boolean;
  cardHeight: string;
}>(({ isCurrent, cardHeight, theme }) => ({
  width: '240px',
  height: cardHeight,
  position: 'relative',
  boxShadow: theme.palette.case.shadow.huge,
  borderRadius: '8px',
  paddingTop: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',

  pointerEvents: isCurrent ? 'none' : 'initial',

  '&:hover': {
    background: theme.palette.case.neutral.n700,

    '.sub-title': {
      color: theme.palette.case.neutral.n600,
    },
    '.white-color, .white-color-btn': {
      color: theme.palette.case.contrast.white,
    },

    '.white-color-text': {
      color: theme.palette.case.contrast.white,
    },

    '.button': {
      background: theme.palette.case.neutral.n600,
    },
  },

  background: isCurrent ? theme.palette.case.neutral.n800 : theme.palette.case.contrast.white,

  '.sub-title': {
    color: isCurrent ? theme.palette.case.neutral.n500 : theme.palette.case.neutral.n600,
  },
  '.white-color': {
    color: isCurrent ? theme.palette.case.contrast.white : 'initial',
  },

  '.white-color-btn': {
    color: isCurrent ? theme.palette.case.contrast.white : theme.palette.case.neutral.n700,
  },

  '.white-color-text': {
    color: isCurrent ? theme.palette.case.contrast.white : 'theme.palette.case.neutral.n700',
  },

  '.green-color': {
    color: theme.palette.case.primary.p600,
  },

  '.button': {
    background: isCurrent ? theme.palette.case.neutral.n700 : theme.palette.case.neutral.n100,
  },
}));

export const PlanItemCardContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '8px',
}));

export const PlanItemCardButton = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  height: '48px',
  position: 'absolute',
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: '0px 0px 8px 8px',
}));

export const PlanItemCrownIconContainer = styled(Box)(() => ({
  paddingTop: '12px',
  width: '36px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  svg: { width: '100%' },
}));
