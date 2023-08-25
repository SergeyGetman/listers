import { Box, styled } from '@mui/material';

type PlannerItemModalHeaderContainerType = {
  isEditMode?: boolean;
};

export const PlannerItemModalHeaderContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['background', 'isEditMode'].includes(prop),
})<PlannerItemModalHeaderContainerType>(({ isEditMode, theme }) => ({
  display: 'flex',
  flexGrow: 0,
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: isEditMode ? '10px 0 10px 10px' : '16px 24px',
  height: '60px',
  position: 'sticky',
  zIndex: 30,
  backgroundColor: theme.palette.case.neutral.n0,
  top: 0,
  left: 0,
  borderBottom: `1px solid ${theme.palette.case.neutral.n100}`,

  [theme.breakpoints.down('sm')]: {
    height: '50px',
    boxShadow: '0px 2px 8px 0px rgba(38, 44, 74, 0.08)',
    border: 'none',
    padding: '12px 16px',
  },
}));
