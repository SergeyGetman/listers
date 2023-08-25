import { Grid, styled } from '@mui/material';

export const RoadmapKanbanColumnContainer = styled(Grid, {
  shouldForwardProp: (prop: string) => !['isFirstColumn', 'isSecondColumn', 'isLastColumn'].includes(prop),
})<{ isFirstColumn?: boolean; isSecondColumn?: boolean; isLastColumn?: boolean }>(
  ({ theme, isSecondColumn, isLastColumn }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minWidth: isSecondColumn ? '35% !important' : '',
    maxWidth: isSecondColumn ? '' : '32% !important',
    flexGrow: 1,
    alignItems: isSecondColumn ? 'center' : 'none' && isLastColumn ? 'flex-end' : 'none',
    borderRight: isSecondColumn ? `1px dashed ${theme.palette.case.neutral.n200}` : 'none',
    borderLeft: isSecondColumn ? `1px dashed ${theme.palette.case.neutral.n200}` : 'none',
  }),
);
