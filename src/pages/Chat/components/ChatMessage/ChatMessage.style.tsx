import { Box, ButtonBase, Typography, styled } from '@mui/material';

export const ChatMessageContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['containerWidth'].includes(prop),
})<{ containerWidth: number }>(({ theme, containerWidth }) => ({
  maxWidth: `${containerWidth}%`,
  transition: 'all 0.3s',
  padding: '10px 5px 10px 10px',
  borderRadius: '5px',
  transaction: 'all 0.3s',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
  '&:hover': {
    boxShadow: theme.palette.case.shadow.big,
  },

  // '& .chat-message-actions': {
  //   transaction: 'opacity 0.3s',
  // },
}));

export const ChatMessageFileContainer = styled(Box)(() => ({
  paddingLeft: '20px',
  '&:before': {
    content: "''",
    width: '1px',
    height: '100%',
    backgroundColor: 'black',
    position: 'absolute',
    left: 0,
  },
}));

export const ChatMessageText = styled(Typography)(({ theme }) => ({
  paddingRight: '5px',
  color: theme.palette.case.neutral.n500,

  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

export const ChatMessageReplyContainer = styled(ButtonBase, {
  shouldForwardProp: (prop: string) => !['isShowDot'].includes(prop),
})<{ isShowDot?: boolean }>(({ theme, isShowDot }) => ({
  display: 'flex',
  padding: '5px',
  paddingRight: isShowDot ? '15px' : '5px',
  marginTop: '10px',
  marginLeft: '-20px',
  maxWidth: '120px',
  cursor: 'pointer',
  alignItems: 'center',
  borderRadius: '10px',
  border: '1px solid transparent',
  ':hover': {
    border: `1px solid ${theme.palette.case.neutral.n100}`,
  },
}));

export const ChatRenderItemContainer = styled(Box)(({ theme }) => ({
  '.animate': {
    animation: 'highlight 5s',
  },

  '@keyframes highlight': {
    '99%': {
      backgroundColor: 'initial',
    },
    '0%': {
      backgroundColor: theme.palette.case.neutral.n100,
    },
  },
}));

export const ChatMessageTimeConteiner = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

type ChatMessageTimeTextType = {
  paddingTop?: string;
};

export const ChatMessageTimeText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'paddingTop',
})<ChatMessageTimeTextType>(({ theme, paddingTop }) => ({
  color: theme.palette.case.neutral.n400,
  paddingTop: paddingTop ? paddingTop : '3px',
  whiteSpace: 'nowrap',
  // TODO change Typography component
  fontSize: '9px',
  lineHeight: '11px',
  cursor: 'default',
}));
