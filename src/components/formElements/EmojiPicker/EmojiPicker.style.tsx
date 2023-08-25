import { Popover, styled } from '@mui/material';

export const EmojiContainerPopover = styled(Popover)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiPaper-root': {
    boxSizing: 'border-box',
    boxShadow: theme.palette.case.shadow.big,
    display: 'flex',
    alignItems: 'center',
  },

  '.emoji-mart': {
    fontFamily: theme.typography.default.fontFamily,
    fontStyle: theme.typography.default.fontStyle,
    fontWeight: theme.typography.default.fontWeight,
    fontSize: theme.typography.default.fontSize,
    lineHeight: theme.typography.default.lineHeight,
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.04)',
  },

  '.emoji-mart-bar:last-of-type': {
    display: 'none',
  },
  '.emoji-mart-scroll': {
    '::-webkit-scrollbar': {
      width: '6px',
    },
  },
  '.emoji-mart-category-list': {
    button: {
      cursor: 'pointer',
    },
    span: {
      cursor: 'pointer',
    },
  },
  '.emoji-mart-anchor ': {
    cursor: 'pointer',
  },
  '.emoji-mart-anchor-bar': {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  '.emoji-mart-anchor-selected': {
    '.emoji-mart-anchor-icon': {
      svg: {
        path: {
          fill: theme.palette.primary.main,
        },
      },
    },
  },
}));
