import { Box, styled } from '@mui/material';

type AdditionalInfoItemProps = {
  isUnread?: boolean;
};

export const AdditionalInfoContainer = styled(Box)(() => ({
  display: 'inline-flex',
  padding: '5px 10px',
  backgroundColor: 'transparent',
  borderRadius: '20px',
}));

export const AdditionalInfoItem = styled(Box, {
  shouldForwardProp: (prop: string) => !['isUnread'].includes(prop),
})<AdditionalInfoItemProps>(({ theme, isUnread }) => ({
  display: 'flex',
  marginRight: '16px',
  alignItems: 'center',
  svg: {
    width: '16px',
    height: '16px',
    marginRight: '5px',

    circle: {
      fill: isUnread ? theme.palette.primary.main : theme.palette.case.neutral.n400,
    },
    path: {
      fill: isUnread ? theme.palette.primary.main : theme.palette.case.neutral.n400,
    },
  },
  '&:last-of-type': {
    marginRight: 0,
  },
}));
