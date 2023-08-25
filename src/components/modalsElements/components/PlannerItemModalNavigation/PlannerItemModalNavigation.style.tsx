import { Tab, styled } from '@mui/material';

export const PlannerItemModalNavigationTab = styled(Tab, {
  shouldForwardProp: (prop: string) => !['isUnread'].includes(prop),
})<{ isUnread?: boolean }>(({ theme, isUnread }) => ({
  padding: '0',
  overflow: 'visible !important',
  marginRight: '10%',
  position: 'relative',
  height: '26px',
  alignItems: 'flex-start',
  minWidth: '0',
  minHeight: '0',
  color: theme.palette.case.contrast.black,
  fontSize: theme.typography.default.fontSize,
  lineHeight: theme.typography.default.lineHeight,
  textTransform: 'capitalize',
  '&:hover': {
    opacity: '0.6',
  },

  '&::before': {
    display: isUnread ? 'block' : 'none',
    position: 'absolute',
    content: '""',
    width: '6px',
    top: '0',
    borderRadius: '50%',
    right: '-5px',
    height: '6px',
    backgroundColor: theme.palette.case.warning.high,
  },
  [theme.breakpoints.down('sm')]: {
    marginRight: '7%',
  },
}));
