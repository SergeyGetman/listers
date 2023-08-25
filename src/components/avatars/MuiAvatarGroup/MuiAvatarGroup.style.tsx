import { styled, AvatarGroup, Box } from '@mui/material';
import { AvatarSizeEnum } from '../../../shared/enums/avatarSize.enum';

export const AvatarGroupContainer = styled(AvatarGroup, {
  shouldForwardProp: (prop) => prop !== 'size',
})<{
  size: 'extraSmall' | 'small' | 'medium';
}>(({ size, theme }) => ({
  cursor: 'pointer',
  '& .MuiAvatarGroup-avatar': {
    width: AvatarSizeEnum[size] || '30px',
    height: AvatarSizeEnum[size] || '30px',
    fontSize: theme.typography.t14m.fontSize,
    fontWeight: theme.typography.t14m.fontWeight,
    color: theme.palette.case.neutral.n800,
    backgroundColor: theme.palette.case.primary.p50,
    borderColor: theme.palette.case.primary.p100,
    marginLeft: '-7px',
  },
}));

export const ShareContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'size',
})<{
  size: 'extraSmall' | 'small' | 'medium';
}>(({ size, theme }) => ({
  cursor: 'pointer',
  width: `calc(${AvatarSizeEnum[size] + 2}px)`,
  height: `calc(${AvatarSizeEnum[size] + 2}px)`,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px dashed ${theme.palette.case.neutral.n500}`,
  marginLeft: '8px',
  '&:hover': {
    backgroundColor: theme.palette.case.neutral.n100,
  },
}));
