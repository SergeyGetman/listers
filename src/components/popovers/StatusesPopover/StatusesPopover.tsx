import React, { FC, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
import StatuesItem from './components/StatuesItem';
import { StatusesPopoverStyle } from './StatusesPopover.style';

type StatusesPopoverProps = {
  selectedStatus: PlannerItemStatusesEnum;
  children: React.ReactNode;
  statusesMenu: {
    item: {
      label: string;
      id: PlannerItemStatusesEnum;
      icon: any;
      selectedBgColor: string;
      hoverBgColor: string;
      iconColor?: string;
      color?: string;
    };
    callback: () => void;
  }[];
  onChangeMenuState?: (val: boolean) => void;
  anchorOriginVertical?: 'bottom' | 'top' | 'center';
  anchorOriginHorizontal?: 'center' | 'right' | 'left';
  transformOriginVertical?: 'bottom' | 'top' | 'center';
  transformOriginHorizontal?: 'center' | 'right' | 'left';
};
const StatusesPopover: FC<StatusesPopoverProps> = ({
  selectedStatus,
  statusesMenu,
  onChangeMenuState,
  anchorOriginHorizontal = 'center',
  anchorOriginVertical = 'bottom',
  transformOriginHorizontal = 'center',
  transformOriginVertical = 'top',
  children,
}) => {
  const theme = useTheme();

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demo-popup-menu',
  });
  useEffect(() => {
    if (onChangeMenuState) {
      onChangeMenuState(popupState.isOpen);
    }
  }, [popupState.isOpen, onChangeMenuState]);

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Box sx={{ display: 'inline-block', cursor: 'pointer' }} {...bindTrigger(popupState)}>
        {children}
      </Box>

      <StatusesPopoverStyle
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: anchorOriginVertical,
          horizontal: anchorOriginHorizontal,
        }}
        transformOrigin={{
          vertical: transformOriginVertical,
          horizontal: transformOriginHorizontal,
        }}
      >
        {popupState.isOpen && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {statusesMenu.map(({ item, callback }) => (
              <Box
                key={item.id}
                onClick={(e) => {
                  popupState.close();
                  e.stopPropagation();
                  callback();
                }}
                sx={{
                  cursor: 'pointer',
                  p: '8px',
                  borderRadius: '4px',
                  mb: '2px',
                  backgroundColor: item.id === selectedStatus ? theme.palette.case.neutral.n200 : '',
                  '&:hover': {
                    backgroundColor:
                      item.id === selectedStatus
                        ? theme.palette.case.neutral.n200
                        : theme.palette.case.neutral.n100,
                    transition: 'all 0.2s',
                  },
                  '&:last-child': {
                    mb: '0',
                  },
                }}
              >
                <StatuesItem selectedStatus={item.id} />
              </Box>
            ))}
          </Box>
        )}
      </StatusesPopoverStyle>
    </Box>
  );
};

export default StatusesPopover;
