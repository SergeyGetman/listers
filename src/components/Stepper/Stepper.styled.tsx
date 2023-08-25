import { Box, styled } from '@mui/material';

export const StepperItem = styled(Box, {
  shouldForwardProp: (prop: string) => !['isActive', 'isDone'].includes(prop),
})<{ isActive: boolean; isDone: boolean }>`
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 7px;
  // background: ${({ isDone, theme }) => (isDone ? theme.palette.primary.main : 'none')};
  color: ${({ theme, isActive, isDone }) =>
    isDone ? 'white' : isActive ? theme.palette.primary.main : theme.palette.case.neutral.n400};
  // border: ${({ theme, isActive }) =>
    `1px solid ${isActive ? theme.palette.primary.main : theme.palette.case.neutral.n400}`};
  &:last-of-type {
    margin-right: 0;
  }
  &:first-of-type {
    margin-left: 0;
  }
`;

export const StepperLine = styled(Box, {
  shouldForwardProp: (prop: string) => !['isActive'].includes(prop),
})<{ isActive: boolean }>`
  width: 70px;
  height: 2px;
  border-radius: 100px;
  background: ${({ theme, isActive }) =>
    isActive ? theme.palette.primary.main : theme.palette.case.neutral.n200};
`;
