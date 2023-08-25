import { Box, Button, styled } from '@mui/material';

type CustomButtonType = {
  isBigIcon: boolean;
  colorTextBtn?: string;
};

export const CustomButton = styled(Button, {
  shouldForwardProp: (prop: string) => !['isBigIcon', 'colorTextBtn'].includes(prop),
})<CustomButtonType>(({ isBigIcon, colorTextBtn, theme }) => ({
  height: '32px',
  width: '32px',
  minWidth: 'inherit',
  background: theme.palette.case.neutral.n0,
  borderRadius: '16px',
  color: colorTextBtn,

  '& .MuiButton-startIcon': {
    margin: '0px',
  },
  '&:hover': {
    color: 'initial',
    backgroundColor: 'initial',
  },

  '&: disabled': {
    background: theme.palette.case.neutral.n0,

    svg: {
      path: {
        fill: !isBigIcon ? theme.palette.case.neutral.n400 : theme.palette.case.contrast.white,
      },
      circle: {
        fill: theme.palette.case.neutral.n400,
      },
    },
  },
}));

export const CircleIconButtonIcon = styled(Box)<{ color?: string; disabled: boolean | undefined }>(
  ({ color }) => ({
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&: hover': {
      svg: {
        path: {
          fill: color,
        },
      },
    },
    svg: {
      path: {
        fill: color,
      },
    },

    '& .MuiSvgIcon-root': {
      fontSize: '14px',
    },
  }),
);
