import { Box, styled } from '@mui/material';
import { TagsEnum } from '../../../../../shared/enums/tags.enum';
type TagItemContainerType = {
  iconColor: string;
  borderColor: string;
  backgroundColor: string;
  tagId: string;
};
export const TagItemContainer = styled(Box, {
  shouldForwardProp: (prop: string) =>
    !['iconColor', 'borderColor', 'backgroundColor', 'tagId'].includes(prop),
})<TagItemContainerType>(({ iconColor, borderColor, backgroundColor, tagId, theme }) => ({
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px ${tagId === TagsEnum.none ? 'dashed' : 'solid'} ${borderColor}`,
  backgroundColor: backgroundColor,
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: tagId === TagsEnum.none ? theme.palette.case.neutral.n100 : backgroundColor,
  },
  svg: {
    width: '12px',
    height: '12px',
    path: {
      fill: iconColor,
    },
  },
}));
