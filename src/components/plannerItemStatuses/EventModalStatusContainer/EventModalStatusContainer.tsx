import React, { FC } from 'react';
import { Box } from '@mui/material';
import { EventStatusItemContainer } from './EventModalStatusContainer.style';
import PlannerItemStatusBtn from '../PlannerItemStatusBtn';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
import { outOfDate } from '../../../shared/functions/outOfCurrentDate';
type EventModalStatusContainerProps = {
  selectedStatus: PlannerItemStatusesEnum;
  isShowRequestLoading?: boolean;
  handleChangeStatus: ({
    selectedStatus,
    setIsLoading,
  }: {
    selectedStatus: PlannerItemStatusesEnum;
    setIsLoading?: (val: boolean) => void;
  }) => void;
  isArchive?: boolean;
  isExstraSmallBtn?: boolean;
  finished_at: string;
};
const EventModalStatusContainer: FC<EventModalStatusContainerProps> = ({
  isArchive,
  isShowRequestLoading = true,
  selectedStatus,
  handleChangeStatus,
  isExstraSmallBtn,
  finished_at,
}) => {
  const isOutOfCurrentDate = outOfDate(finished_at);
  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}>
      {isArchive && (
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: 'rgba(253,253,253,0.4)',
            width: '100%',
            zIndex: '10',
            height: '100%',
          }}
        />
      )}
      <>
        {isOutOfCurrentDate ? (
          <>
            <EventStatusItemContainer>
              <PlannerItemStatusBtn
                isExstraSmallBtn={isExstraSmallBtn}
                isSelected={selectedStatus === PlannerItemStatusesEnum.missed}
                isShowRequestLoading={isShowRequestLoading}
                onClick={(setIsLoading?: (val: boolean) => void) =>
                  handleChangeStatus({ selectedStatus: PlannerItemStatusesEnum.missed, setIsLoading })
                }
                variant={PlannerItemStatusesEnum.missed}
              />
            </EventStatusItemContainer>
            <EventStatusItemContainer>
              <PlannerItemStatusBtn
                isExstraSmallBtn={isExstraSmallBtn}
                isSelected={selectedStatus === PlannerItemStatusesEnum.maybe}
                isShowRequestLoading={isShowRequestLoading}
                onClick={(setIsLoading?: (val: boolean) => void) =>
                  handleChangeStatus({ selectedStatus: PlannerItemStatusesEnum.maybe, setIsLoading })
                }
                variant={PlannerItemStatusesEnum.maybe}
              />
            </EventStatusItemContainer>
            <EventStatusItemContainer>
              <PlannerItemStatusBtn
                isExstraSmallBtn={isExstraSmallBtn}
                isSelected={selectedStatus === PlannerItemStatusesEnum.went}
                isShowRequestLoading={isShowRequestLoading}
                onClick={(setIsLoading?: (val: boolean) => void) =>
                  handleChangeStatus({ selectedStatus: PlannerItemStatusesEnum.went, setIsLoading })
                }
                variant={PlannerItemStatusesEnum.accept}
              />
            </EventStatusItemContainer>
          </>
        ) : (
          <>
            <EventStatusItemContainer>
              <PlannerItemStatusBtn
                isExstraSmallBtn={isExstraSmallBtn}
                isSelected={selectedStatus === PlannerItemStatusesEnum.decline}
                isShowRequestLoading={isShowRequestLoading}
                onClick={(setIsLoading?: (val: boolean) => void) =>
                  handleChangeStatus({ selectedStatus: PlannerItemStatusesEnum.not_going, setIsLoading })
                }
                variant={PlannerItemStatusesEnum.decline}
              />
            </EventStatusItemContainer>
            <EventStatusItemContainer>
              <PlannerItemStatusBtn
                isExstraSmallBtn={isExstraSmallBtn}
                isSelected={selectedStatus === PlannerItemStatusesEnum.maybe}
                isShowRequestLoading={isShowRequestLoading}
                onClick={(setIsLoading?: (val: boolean) => void) =>
                  handleChangeStatus({ selectedStatus: PlannerItemStatusesEnum.maybe, setIsLoading })
                }
                variant={PlannerItemStatusesEnum.maybe}
              />
            </EventStatusItemContainer>
            <EventStatusItemContainer>
              <PlannerItemStatusBtn
                isExstraSmallBtn={isExstraSmallBtn}
                isSelected={selectedStatus === PlannerItemStatusesEnum.going}
                variant={PlannerItemStatusesEnum.accept}
                isShowRequestLoading={isShowRequestLoading}
                onClick={(setIsLoading?: (val: boolean) => void) =>
                  handleChangeStatus({ selectedStatus: PlannerItemStatusesEnum.went, setIsLoading })
                }
              />
            </EventStatusItemContainer>
          </>
        )}
      </>
    </Box>
  );
};

export default EventModalStatusContainer;
