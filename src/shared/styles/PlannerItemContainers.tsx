import { Box, styled } from '@mui/material';

export const PlannerItemContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isBlur', 'isUnread', 'isPending'].includes(prop),
})<{ isBlur: boolean; isUnread: boolean; isPending?: any }>(({ theme, isBlur, isUnread, isPending }) => ({
  width: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '60px',
  marginBottom: '16px',
  padding: '10px 0',
  borderRadius: '5px',
  background: !!isPending
    ? `repeating-linear-gradient(-45deg, ${theme.palette.case.contrast.white}, ${theme.palette.case.contrast.white}  16px,  ${theme.palette.case.neutral.n75} 16px, ${theme.palette.case.neutral.n75} 32px )`
    : 'initial',
  cursor: 'pointer',
  filter: isBlur ? 'grayscale(1)' : 'none',
  opacity: isBlur ? 0.6 : 'none',
  '&::before': {
    display: isUnread ? 'block' : 'none',
    position: 'absolute',
    content: '""',
    width: '6px',
    top: '45%',
    borderRadius: '50%',
    left: '3px',
    height: '6px',
    backgroundColor: theme.palette.case.warning.high,
  },
  [theme.breakpoints.up('md')]: {
    '&:hover': {
      backgroundColor: theme.palette.case.background,
      boxShadow: theme.palette.case.shadow.big,
      '& .planner-item-recurring-icon': {
        backgroundColor: theme.palette.case.background,
      },
    },
  },
}));

export const PlannerItemTimeContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-end',
  alignContent: 'center',
  paddingLeft: '10px',
  flexShrink: 0,
  paddingRight: '10px',
  width: '78px',

  [theme.breakpoints.down('sm')]: {
    paddingRight: '7px',
    width: '75px',
  },
}));

export const PlannerItemMainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  paddingLeft: '10px',
  justifyContent: 'flex-start',
  alignContent: 'center',
  borderLeft: `1px dashed ${theme.palette.case.neutral.n400}`,
  flexGrow: 1,
  width: '100%',
  minWidth: '30%',
  maxWidth: '50%',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    paddingLeft: '7px',
  },
}));

export const PlannerItemAdditionalInfoContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  alignContent: 'center',
  height: '100%',

  flexGrow: 3,
  justifyContent: 'center',
  borderLeft: `1px dashed ${theme.palette.case.neutral.n400}`,
  display: 'flex',
  width: '200px',
  minWidth: '140px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const PlannerItemUsersContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  alignContent: 'center',
  height: '100%',
  flexGrow: 3,
  justifyContent: 'center',
  borderLeft: `1px dashed ${theme.palette.case.neutral.n400}`,
  display: 'flex',
  width: '200px',
  minWidth: '140px',
  '@media (max-width:900px)': {
    display: 'none',
  },
}));

export const PlannerStatusContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  alignContent: 'center',
  height: '100%',
  flexGrow: 3,
  justifyContent: 'center',
  borderLeft: `1px dashed ${theme.palette.case.neutral.n400}`,
  display: 'flex',
  width: '200px',
  minWidth: '150px',
  paddingRight: '10px',
  [theme.breakpoints.down('md')]: {
    width: '80px',
    minWidth: '80px',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
    paddingRight: '0',
  },
}));

export const PlannerStatusContentBlock = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '10px',
}));
