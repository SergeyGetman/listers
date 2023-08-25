import { styled } from '@mui/material';

export const OnboardingContainer = styled('div')`
  width: 100%;
  height: 100%;
  position: absolute;
  background: ${({ theme }) => theme.palette.case.neutral.n75};
  display: flex;
  align-items: center;
  justify-content: center;
`;
