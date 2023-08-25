import { styled } from '@mui/material';
import { Link } from 'react-router-dom';
export const UnstyledLink = styled(Link)`
  &:hover {
    opacity: 1 !important;
  }
  color: inherit !important;
  textdecoration: inherit !important;
`;
