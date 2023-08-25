import { styled } from '@mui/material/styles';
import { Badge, Box } from '@mui/material';

export const OnlineAvatarBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== 'size',
})<{ size: string }>(({ theme, size }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.primary.main,
    width: size === 'extraSmall' ? '4px' : '8px',
    height: size === 'extraSmall' ? '4px' : '8px',
    border: '1px solid #ffffff',
    borderRadius: '50%',
    minWidth: '4px',
    color: theme.palette.primary.main,
  },
}));

export const HubsAvatarBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== 'size',
})<{ size: string }>(({ size }) => ({
  '& .MuiBadge-badge': {
    width: size === 'extraSmall' ? '4px' : '20px',
    height: size === 'extraSmall' ? '4px' : '20px',
    backgroundColor: 'initial',
    border: 'initial',
    display: 'block',
    right: '38%',
  },
}));

export const AddIconContainer = styled(Box)(({ theme }) => ({
  maxHeight: '32px',
  position: 'absolute',
  bottom: 0,
  background: theme.palette.case.neutral.n900,
  opacity: '0.64',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
