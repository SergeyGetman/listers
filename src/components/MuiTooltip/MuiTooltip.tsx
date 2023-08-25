import React, { FC, useEffect } from 'react';
import { Fade, Tooltip, useMediaQuery, useTheme } from '@mui/material';

type MuiTooltipProps = {
  color?: 'light' | 'dark';
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  isArrow?: boolean;
  isUseCustomStatement?: boolean;
  isOpen?: boolean;
  title: string;
  isShowOnMobile?: boolean;
  isHideOnMobile?: boolean;
  children: JSX.Element;
  style?: any;
};

const MuiTooltip: FC<MuiTooltipProps> = ({
  color = 'light',
  placement = 'top',
  isArrow = true,
  isShowOnMobile = false,
  isUseCustomStatement,
  isHideOnMobile,
  isOpen,
  title,
  children,
  style,
}) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const math = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    // TODO add the same id for scrollable block
    document.getElementById('network-user-scroll')?.addEventListener('scroll', handleClose);

    return () => {
      document.getElementById('network-user-scroll')?.removeEventListener('scroll', handleClose);
    };
  }, []);

  return (
    <Tooltip
      className="mui-tooltip"
      title={title}
      placement={placement}
      arrow={isArrow}
      open={isUseCustomStatement ? isOpen : math && isHideOnMobile ? false : open}
      onClose={handleClose}
      onOpen={handleOpen}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 500 }}
      enterTouchDelay={0}
      leaveTouchDelay={math || isShowOnMobile ? 3000 : 0}
      disableFocusListener={isUseCustomStatement}
      disableHoverListener={isUseCustomStatement}
      disableTouchListener={isUseCustomStatement}
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor:
              color === 'light' ? theme.palette.case.neutral.n50 : theme.palette.case.neutral.n500,
            color: color === 'light' ? theme.palette.case.contrast.black : theme.palette.case.contrast.white,
            padding: '8px !important',
            fontSize: theme.typography.small.fontSize,
            fontWeight: theme.typography.small.fontWeight,
            lineHeight: theme.typography.small.lineHeight,
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.18)',
            '& .MuiTooltip-arrow': {
              color: color === 'light' ? theme.palette.case.neutral.n50 : theme.palette.case.neutral.n700,
            },
            ...style,
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default MuiTooltip;
