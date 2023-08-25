import { Box, styled } from '@mui/material';

type StatusesItemContainerType = {
  iconColor?: string;
  selectedBgColor?: string;
  isSmall?: boolean;
};
export const StatusesItemContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['iconColor', 'selectedBgColor', 'isSmall'].includes(prop),
})<StatusesItemContainerType>(({ iconColor, selectedBgColor, isSmall }) => ({
  padding: isSmall ? '3px 6px' : '6px',
  height: isSmall ? '16px' : '24px',
  display: 'flex',
  width: 'max-content',
  borderRadius: '4px',
  alignItems: 'center',
  backgroundColor: selectedBgColor,
  svg: {
    display: isSmall ? 'none' : 'block',
    width: '16px',
    height: '16px',
    path: {
      fill: iconColor,
    },
  },
}));
