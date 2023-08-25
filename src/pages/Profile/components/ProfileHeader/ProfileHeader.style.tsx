import { styled, Box } from '@mui/material';

type ProfileHeaderType = {
  isFriendProfile?: boolean;
};

export const ProfileHeaderContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['isFriendProfile'].includes(prop),
})<ProfileHeaderType>(({ theme, isFriendProfile }) => ({
  width: '100%',
  height: isFriendProfile ? '111px' : '200px',
  borderRadius: isFriendProfile ? 0 : '10px',
  marginBottom: isFriendProfile ? '16px' : '20px',
  position: 'relative',
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',

  marginTop: isFriendProfile ? '30px' : 0,

  '& .profile-bg-stub': {
    width: '100%',
    height: 'auto',
    maxHeight: '200px',
    objectFit: 'contain',
  },
  '& .profile-bg-img': {
    width: '100%',
    height: 'auto',
    maxHeight: isFriendProfile ? '111px' : '200px',
    objectFit: 'cover',
  },

  [theme.breakpoints.down('sm')]: {
    height: '120px',
    overflow: 'hidden',

    '& .profile-bg-stub': {
      maxHeight: '120px',
    },
  },
}));

export const ProfileHeaderAvatar = styled(Box, {
  shouldForwardProp: (prop: string) => !['isFriendProfile'].includes(prop),
})<ProfileHeaderType>(({ theme, isFriendProfile }) => ({
  marginLeft: isFriendProfile ? '30px' : '40px',
  marginRight: isFriendProfile ? '16px' : 0,
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    marginLeft: '10px',
  },
}));
