import { ButtonBase, styled } from '@mui/material';

type ChatEmojiCountContainerProps = {
  isActive?: boolean;
};

export const ChatEmojiCountContainer = styled(ButtonBase, {
  shouldForwardProp: (prop: string) => !['isActive'].includes(prop),
})<ChatEmojiCountContainerProps>(({ theme, isActive }) => ({
  cursor: 'pointer',
  padding: '2px 5px',
  borderRadius: '10px',
  background: isActive ? theme.palette.case.main.gey.light : theme.palette.case.neutral.n100,
  transition: 'all 0.3s',
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {
    padding: '2px 5px',
  },

  '.emoji-mart-emoji': {
    pointerEvent: 'none',
    height: '16px',
  },

  '&:hover': {
    boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)',
    background: isActive ? theme.palette.case.main.gey.middle : 'transparent',
  },
}));
