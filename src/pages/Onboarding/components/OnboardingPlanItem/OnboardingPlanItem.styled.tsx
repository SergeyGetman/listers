import { Box, styled } from '@mui/material';

export const OnboardingPlanContainer = styled(Box)<{ recommended: boolean; isMiddle: boolean }>`
  width: 180px;
  height: 220px;
  box-shadow: 10px 3px 24px 10px #f0f0f0;
  border-radius: 8px;
  border: ${({ recommended, theme }) =>
    recommended ? `1px solid ${theme.palette.case.primary.p700}` : `1px solid transparency`};
  background: ${({ theme }) => theme.palette.case.neutral.n0};
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ isMiddle }) => (isMiddle ? '35px' : 0)};
  position: relative;
  cursor: pointer;
`;

export const OnboardingPlanFooter = styled(Box)`
  height: 36px;
  width: 100%;
  background: ${({ theme }) => theme.palette.case.neutral.n100};
  color: ${({ theme }) => theme.palette.case.neutral.n700};
  border-radius: 0px 0px 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserChooseContainer = styled(Box)`
  position: absolute;
  top: -12px;
  padding: 2px 24px;
  border-radius: 5px;
  left: 50%;
  transform: translate(-50%, 0);
  background: ${({ theme }) => theme.palette.case.primary.p500};
  color: ${({ theme }) => theme.palette.case.neutral.n0};
`;
