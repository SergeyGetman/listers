import { Box, styled } from '@mui/material';

// TODO refactor
export const OnboardingSelectContainer = styled(Box, {
  shouldForwardProp: (prop: string) => !['selected', 'isStroke', 'isCustomizeIcon'].includes(prop),
})<{
  selected: boolean;
  isStroke: boolean;
  isCustomizeIcon: boolean;
}>`
  display: flex;
  width: 100%;
  outline: none;
  background: ${({ selected, theme }) =>
    // TODO add new color
    selected ? '#D9DDEC' : theme.palette.case.neutral.n0};
  align-items: center;
  padding: 12px 16px;
  height: 48px;
  border-radius: 8px;
  // TODO add new color
  border: 1px solid #d9ddec;
  cursor: pointer;
  transition: all 0.2s ease-in;
  color: ${({ selected }) =>
    // TODO add new color
    selected ? '#1F243B' : '#5A6384'};
  &:hover {
    // TODO add new color
    background: #eff1fb;
    color: #444c6d;
    svg {
      path {
        fill: ${({ isStroke, isCustomizeIcon }) =>
          isCustomizeIcon ? (isStroke ? 'auto' : '#444C6D') : 'auto'};
        stroke: ${({ isStroke, isCustomizeIcon }) =>
          isCustomizeIcon ? (isStroke ? '#444C6D' : 'auto') : 'auto'};
      }
    }
  }
  svg {
    path {
      fill: ${({ selected, isStroke, isCustomizeIcon }) =>
        isCustomizeIcon ? (isStroke ? 'auto' : selected ? '#2B324F' : 'auto') : 'auto'};
      stroke: ${({ selected, isStroke, isCustomizeIcon }) =>
        isCustomizeIcon ? (isStroke ? (selected ? '#2B324F' : 'auto') : 'auto') : 'auto'};
    }
    width: 24px;
    height: 24px;
  }
`;
