import { Chip, styled } from '@mui/material';

export const ChipUIContainer = styled(Chip, {
  shouldForwardProp: (prop: string) => !['isHaveLabel'].includes(prop),
})<{ isHaveLabel?: boolean }>(({ theme, isHaveLabel }) => ({
  '&.MuiChip-root': {
    gap: isHaveLabel ? '6px' : '0',
    height: '24px',
    padding: '6px 8px',
    borderRadius: '4px',
    background: theme.palette.case.neutral.n100,
    margin: 0,
  },
  '& .MuiChip-label': {
    fontFamily: 'Archivo',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '16px',
    color: theme.palette.case.neutral.n800,
    padding: '0',
  },

  '& .MuiChip-icon': {
    height: '16px',
    width: '16px',
    margin: '0',
  },
}));
