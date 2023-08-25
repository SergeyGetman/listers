import { Box, styled } from '@mui/material';

export const PlaceAutocompleteItemContainer = styled(Box)(({ theme }) => ({
  padding: '10px 10px',
  fontFamily: theme.typography.fontFamily,
  fontStyle: theme.typography.small.fontStyle,
  fontWeight: theme.typography.small.fontWeight,
  fontSize: theme.typography.small.fontSize,
  lineHeight: theme.typography.small.lineHeight,
  backgroundColor: theme.palette.case.contrast.white,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.case.contrast.black,
    transition: '200ms',
  },
}));
