import { styled, Typography } from '@mui/material';

export const GarageAttachmentDocumentSubtitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'stretch',
  maxWidth: '160px',
  color: theme.palette.case.neutral.n500,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
