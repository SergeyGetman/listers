import { Box, styled } from '@mui/material';
import { PlannerItemPriorityEnum } from '../../../../../shared/enums/plannerItemPriority.enum';
type PriorityItemContainerType = {
  iconColor: string;
  borderColor: string;
  backgroundColor: string;
  priorityId: string;
};
export const PriorityItemContainer = styled(Box, {
  shouldForwardProp: (prop: string) =>
    !['iconColor', 'borderColor', 'backgroundColor', 'priorityId'].includes(prop),
})<PriorityItemContainerType>(({ iconColor, borderColor, backgroundColor, priorityId, theme }) => ({
  marginRight: '8px',
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px ${priorityId === PlannerItemPriorityEnum.none ? 'dashed' : 'solid'} ${borderColor}`,
  backgroundColor: backgroundColor,
  borderRadius: '50%',
  '&:hover': {
    backgroundColor:
      priorityId === PlannerItemPriorityEnum.none ? theme.palette.case.neutral.n100 : backgroundColor,
  },
  svg: {
    width: '12px',
    height: '12px',
    path: {
      fill: iconColor,
    },
  },
}));
