import { Box, Popover, styled } from '@mui/material';

export const SelectRoleContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isOpened', 'isError', 'isHasValue'].includes(prop),
})<{
  isOpened: boolean;
  isError?: boolean;
  isHasValue?: boolean;
}>(({ theme, isOpened, isError, isHasValue }) => {
  let backgroundColor = theme.palette.case.neutral.n50;
  let borderColor = theme.palette.case.neutral.n300;
  const color = theme.palette.case.neutral.n700;
  if (isError) {
    borderColor = theme.palette.case.red.r300;
    backgroundColor = isOpened ? theme.palette.case.neutral.n0 : theme.palette.case.neutral.n50;
  } else if (isHasValue) {
    backgroundColor = theme.palette.case.neutral.n0;
  } else if (isOpened) {
    backgroundColor = theme.palette.case.neutral.n0;
    borderColor = theme.palette.case.primary.p400;
  }
  return {
    width: '100%',
    height: '38px',
    border: `1px solid`,
    fontSize: 14,
    lineHeight: '20px',
    color: color,
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
    position: 'relative',
  };
});

export const SelectRolePopoverContainer = styled(Popover)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiPaper-root': {
    padding: '10px',
    minWidth: '250px',
    boxSizing: 'border-box',
    boxShadow: theme.palette.case.shadow.big,
    display: 'flex',
    alignItems: 'center',
  },
}));

type SelectRolePopoverContentItemType = {
  isActive?: boolean;
};

export const SelectRolePopoverContentItem = styled(Box, {
  shouldForwardProp: (prop: string) => !['isActive'].includes(prop),
})<SelectRolePopoverContentItemType>(({ isActive, theme }) => ({
  borderRadius: '5px',
  minHeight: '29px',
  minWidth: '65px',
  marginBottom: '5px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: isActive ? theme.palette.case.neutral.n100 : 'initial',
  '&:hover': {
    backgroundColor: theme.palette.case.neutral.n100,
  },
}));

export const SelectRolePopoverSkeletonContainer = styled(Box)(() => ({
  marginBottom: '5px',
  height: '29px',
  width: '100%',
  minWidth: '65px',
}));

export const SelectRolePopoverContentContainer = styled(Box)(() => ({
  display: 'flex',
  overflow: 'hidden',
}));

export const SelectRolePopoverLeftColumnContainer = styled(Box)(({ theme }) => ({
  width: '90px',
  borderRight: `1px solid ${theme.palette.case.neutral.n100}`,
  paddingRight: '10px',
}));

export const SelectRolePopoverRightColumnContainer = styled(Box)(() => ({
  height: '227px',
  overflow: 'auto',
  width: '100%',
  marginLeft: '10px',
}));
