import { styled, Box } from '@mui/material';

type StatusesViewProps = {
  bgColor?: string;
  contentColor?: string;
  size: string;
  isShowBackground: boolean;
};

export const StatusesView = styled(Box, {
  shouldForwardProp: (prop: string) =>
    !['bgColor', 'selectedBgColor', 'size', 'isShowBackground', 'contentColor'].includes(prop),
})<StatusesViewProps>(({ bgColor, contentColor, size, isShowBackground }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding:
    size === 'large' ? '5px 16px 5px 8px' : size === 'medium' ? '2px 10px' : isShowBackground ? '5px' : '0px',
  borderRadius: '20px',
  border: isShowBackground ? `1px solid ${bgColor}` : 'none',
  backgroundColor: isShowBackground ? bgColor : 'transparent',
  boxSizing: 'border-box',
  color: contentColor,
  svg: {
    width: '14px',
    height: '14px',
    path: {
      fill: contentColor,
    },
  },
}));
