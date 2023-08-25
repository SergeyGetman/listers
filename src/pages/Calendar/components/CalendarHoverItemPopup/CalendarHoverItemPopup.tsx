import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Popup } from '@mobiscroll/react';
import CalendarHoverPopupTaskContent from '../CalendarHoverPopupTaskContent';
import { PlannerItemModelTypeEnum } from '../../../../shared/enums/plannerItemModelType.enum';
import CalendarHoverPopupEventContent from '../CalendarHoverPopupEventContent';
import CalendarHoverPopupPaymentContent from '../CalendarHoverPopupPaymentContent';
type CalendarHoverItemPopupProps = {
  onMouseEnter: any;
  onMouseLeave: any;
  isOpen: boolean;
  anchor: any;
  hoverItem: any;
  setIsOpenHoverPopup: (val: boolean) => void;
};
const CalendarHoverItemPopup: FC<CalendarHoverItemPopupProps> = ({
  hoverItem,
  anchor,
  onMouseEnter,
  onMouseLeave,
  isOpen,
  setIsOpenHoverPopup,
}) => {
  return (
    <Popup
      display="anchored"
      isOpen={isOpen}
      anchor={anchor}
      touchUi={false}
      showOverlay={false}
      contentPadding={false}
      closeOnOverlayClick={false}
      cssClass="calendar-tooltip"
    >
      {hoverItem && (
        <Box
          sx={{ width: 320, padding: '5px', paddingBottom: '20px' }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {hoverItem.model_type === PlannerItemModelTypeEnum.task && (
            <CalendarHoverPopupTaskContent setIsOpenHoverPopup={setIsOpenHoverPopup} item={hoverItem} />
          )}

          {hoverItem.model_type === PlannerItemModelTypeEnum.event && (
            <CalendarHoverPopupEventContent setIsOpenHoverPopup={setIsOpenHoverPopup} item={hoverItem} />
          )}
          {hoverItem.model_type === PlannerItemModelTypeEnum.payment && (
            <CalendarHoverPopupPaymentContent item={hoverItem} />
          )}
        </Box>
      )}
    </Popup>
  );
};

export default CalendarHoverItemPopup;
