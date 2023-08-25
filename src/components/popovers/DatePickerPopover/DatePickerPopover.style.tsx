import { Popover, styled } from '@mui/material';
type PopoverStyledProps = {
  isShowRecurringBlock?: boolean;
};
export const PopoverStyled = styled(Popover, {
  shouldForwardProp: (prop: string) => !['isShowRecurringBlock'].includes(prop),
})<PopoverStyledProps>(({ isShowRecurringBlock }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
  },
  '& .MuiPaper-root': {
    minHeight: '100px',
    width: '325px',
    maxHeight: isShowRecurringBlock ? '700' : '560px',
    boxShadow: '0px 2px 8px 0px rgba(38, 44, 74, 0.08)',
  },
}));
