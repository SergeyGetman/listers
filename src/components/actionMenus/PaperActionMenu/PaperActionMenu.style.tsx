import { Menu, MenuItem, styled } from '@mui/material';

export const PaperActionMenuContainer = styled(Menu, {
  shouldForwardProp: (prop: string) => !['isSmall'].includes(prop),
})<{ isSmall?: boolean }>(({ theme, isSmall }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },

  '& .MuiMenu-paper': {
    boxShadow: '0px 2px 8px 0px rgba(38, 44, 74, 0.08)',
    padding: '4px',
    width: isSmall ? 'auto' : '208px',
    maxHeight: '226px',
    borderRadius: '8px',
    border: `1px solid ${theme.palette.case.neutral.n200}`,
    backgroundColor: theme.palette.case.background,
    '& .MuiList-root': {
      padding: 0,
    },
  },
}));

export const PaperActionMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop: string) => !['isHideIcon', 'iconColor', 'isSmall'].includes(prop),
})<{ isHideIcon?: boolean; iconColor?: string; isSmall?: boolean }>(
  ({ theme, isHideIcon, iconColor, isSmall }) => ({
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    height: isSmall ? '24px' : '36px',
    fontSize: isSmall ? theme.typography.t12r.fontSize : theme.typography.t14r.fontSize,
    lineHeight: isSmall ? theme.typography.t12r.lineHeight : theme.typography.t14r.lineHeight,
    fontWeight: isSmall ? theme.typography.t12r.fontWeight : theme.typography.t14r.fontWeight,
    padding: isSmall ? '8px' : '5px',
    color: theme.palette.case.neutral.n600,
    backgroundColor: theme.palette.case.background,
    marginBottom: '5px',
    '&:last-of-type': {
      marginBottom: 0,
    },
    svg: {
      marginRight: '6px',
      width: '24px',
      height: '24px',
      opacity: isHideIcon ? '0' : ' 1',
      display: isHideIcon ? 'none' : 'block',
      path: {
        fill: iconColor ?? '',
      },
    },

    '&:hover': {
      backgroundColor: theme.palette.case.neutral.n100,
      color: theme.palette.case.neutral.n700,
      svg: {
        opacity: '1',
      },
    },

    '&.Mui-selected': {
      backgroundColor: theme.palette.case.neutral.n200,
      color: theme.palette.case.neutral.n900,
      svg: {
        opacity: '1',
      },
      '&:hover': {
        backgroundColor: theme.palette.case.neutral.n200,
        color: theme.palette.case.neutral.n900,
        svg: {
          opacity: '1',
        },
      },
    },

    '&.Mui-disabled': {
      opacity: 1,
      backgroundColor: theme.palette.case.background,
      color: theme.palette.case.neutral.n400,
      cursor: 'not-allowed !important',
      svg: {
        opacity: 0.6,
      },
    },
  }),
);
