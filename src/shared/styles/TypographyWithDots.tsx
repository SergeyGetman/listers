import { styled, Typography } from '@mui/material';

type TypographyWithDotsProps = {
  lines?: number;
};

export const TypographyWithDots = styled(Typography)<TypographyWithDotsProps>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ lines }) => lines || 1};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.2s linear;
`;
