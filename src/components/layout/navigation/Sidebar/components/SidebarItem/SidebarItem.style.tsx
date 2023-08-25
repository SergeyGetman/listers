import { Box, styled, Typography } from '@mui/material';

type SidebarItemContainerProps = {
  isMatch: boolean;
  bgColor?: string;
  isOpen?: boolean;
  isLiteBackground?: boolean;
};

type SidebarItemLabelProps = {
  isOpen?: boolean;
};

export const SidebarItemContainer = styled(Box)<SidebarItemContainerProps>(
  ({ theme, isMatch, bgColor, isOpen, isLiteBackground }) => ({
    marginLeft: '2px',
    height: '43px',
    padding: '10px 10px',
    transition: ' all .4s ease-in-out',
    borderRadius: '5px',
    backgroundColor: isMatch ? bgColor : theme.palette.case.neutral.n50,
    flexShrink: 0,
    width: isOpen ? '160px' : '46px',
    display: 'flex',
    marginTop: '10px',
    marginBottom: '5px',
    alignItems: 'center',
    svg: {
      path: {
        fill:
          isMatch && !isLiteBackground ? theme.palette.case.contrast.white : theme.palette.case.neutral.n700,
      },
    },
    color: isMatch && !isLiteBackground ? theme.palette.case.contrast.white : theme.palette.case.neutral.n700,
    '&:hover': {
      backgroundColor: bgColor,
      transition: 'all .1s ease-in-out',
      color: isLiteBackground ? theme.palette.case.neutral.n700 : theme.palette.case.contrast.white,

      svg: {
        path: {
          fill: isLiteBackground ? theme.palette.case.neutral.n700 : theme.palette.case.contrast.white,
          transition: 'all .1s ease-in-out',
        },
      },
    },
  }),
);

export const SidebarItemLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<SidebarItemLabelProps>(({ isOpen }) => ({
  marginLeft: '8px',
  overflowX: 'hidden',
  minWidth: '27px',
  whiteSpace: 'nowrap',
  display: isOpen ? 'inline' : 'inline',
  transition: 'display 2s ease-in-out 1s',
}));
