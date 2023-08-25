import { Box, styled } from '@mui/material';

export const TaskItemCardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '320px',
  padding: '10px',
  margin: '10px 20px 10px 5px',
  boxSizing: 'border-box',
  backgroundColor: theme.palette.case.contrast.white,
  boxShadow: `0px 0px 3px ${theme.palette.case.neutral.n200}`,
  borderRadius: '5px',
  cursor: 'pointer',

  '&:hover': { boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.04)' },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: '2px 2px 20px ',
  },
}));

export const TaskItemCardContainerTitleBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const TaskItemCardContainerTitle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  width: 'calc(100% - 40px)',
}));

export const TaskItemCardContainerTitleIcon = styled(Box)(() => ({
  marginLeft: '4px',
  svg: {
    width: '15px',
  },
}));

export const TaskItemCardContainerInputs = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '16px',
}));
