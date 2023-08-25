import { Box, Typography, styled } from '@mui/material';

type MuiDefaultDrawerHeaderContainerType = {
  isEditMode?: boolean;
};

export const MuiDefaultDrawerHeaderContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['background', 'isEditMode'].includes(prop),
})<MuiDefaultDrawerHeaderContainerType>(({ isEditMode, theme }) => ({
  display: 'flex',
  flexGrow: 0,
  alignItems: 'center',
  width: '100%',
  padding: isEditMode ? '10px 0 10px 10px' : '10px',
  height: '65px',
  position: 'sticky',
  zIndex: 30,
  backgroundColor: theme.palette.case.contrast.white,
  top: 0,
  left: 0,
  boxShadow: theme.palette.case.shadow.small,
}));

export const MuiDefaultDrawerHeaderEditModeContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.case.warning.light,
  borderRadius: '40px 0 0 40px',
  width: '96px',
  height: '39px',
  display: 'flex',
  alignItems: 'center',
  padding: ' 0 4px 0 21px ',
}));

export const MuiDefaultDrawerHeaderEditModeMobileContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.case.warning.light,
  textAlign: 'center',
  padding: '7px 0',
}));

export const MuiDefaultDrawerHeaderTitleContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isShowCloseBtn'].includes(prop),
})<{ isShowCloseBtn: boolean }>(({ isShowCloseBtn }) => ({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'space-between',
  width: isShowCloseBtn === false ? '100%' : '94%',
}));

export const MuiDefaultDrawerHeaderTitle = styled(Box, {
  shouldForwardProp: (prop: string) => !['isShowCloseBtn'].includes(prop),
})<{ isShowCloseBtn: boolean }>(({ isShowCloseBtn }) => ({
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  marginLeft: !isShowCloseBtn ? 0 : '15px',
  width: '80%',
}));

export const MuiDefaultDrawerHeaderTitleText = styled(Typography)(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export const MuiDefaultDrawerHeaderSubtitleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.case.neutral.n500,
  position: 'absolute',
  bottom: '2px',
  left: '65px',
}));

export const MuiDefaultDrawerHeaderAfterTitleIconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  svg: { color: theme.palette.case.neutral.n400 },
}));
