import { styled, Tab, Tabs, Box, Typography } from '@mui/material';

export const ColumnTitleItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '44px',
  marginBottom: '16px',
  borderBottom: `1px solid ${theme.palette.case.neutral.n300}`,
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'flex-start',
  },
}));

export const ColumnTitleItemIconContainer = styled(Box)(() => ({
  marginRight: '16px',
  svg: {
    width: '20px',
  },
}));

export const ColumnListItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
  svg: {
    marginRight: '8px',
    width: '16px',
    height: '16px',
    path: {
      fill: theme.palette.case.neutral.n600,
    },
  },
}));

export const ComingSoonItemBlock = styled(Box)(({ theme }) => ({
  height: '32px',
  width: '100%',
  background: theme.palette.case.neutral.n200,
}));

export const ComingSoonItemContentBlock = styled(Box)(({ theme }) => ({
  border: `1px dashed ${theme.palette.case.neutral.n400}`,
  height: '48px',
  paddingLeft: '17px',
  display: 'flex',
  alignItems: 'center',
}));

export const ComingSoonItemContentIconBlock = styled(Box)(({ theme }) => ({
  marginRight: '8px',
  svg: {
    path: {
      fill: theme.palette.case.neutral.n500,
    },
  },
}));

export const ComingSoonItemText = styled(Typography)(({ theme }) => ({
  color: theme.palette.case.neutral.n700,
}));

export const TabsConteiner = styled(Tabs)(({ theme }) => ({
  '& .tabs-selected': {
    borderBottom: 'none',
    boxShadow: '0 4px 0 -2px white',
    color: theme.palette.case.neutral.n900,
    fontWeight: '700',
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
}));

export const TabContent = styled(Tab, {
  shouldForwardProp: (prop: string) => !['isDisabled'].includes(prop),
})<{ isDisabled: boolean }>(({ isDisabled, theme }) => ({
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '22px',
  textTransform: 'capitalize',
  color: isDisabled ? theme.palette.case.neutral.n500 : theme.palette.case.neutral.n700,

  '&.Mui-selected': {
    background: theme.palette.case.neutral.n0,
    fontWeight: '700',
    color: theme.palette.case.neutral.n900,
    border: 'none !important',
    boxShadow: ' 0px 2px 4px rgba(38, 44, 74, 0.16)',
  },
  borderRadius: '4px',

  [theme.breakpoints.down('sm')]: {
    padding: '0 16px',
    background: theme.palette.case.neutral.n100,
  },
}));
