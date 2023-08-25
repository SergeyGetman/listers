import React, { FC, memo } from 'react';
import { Box } from '@mui/material';
import { StatusItemContainer } from './TaskModalStatusContainer.style';
import PlannerItemStatusBtn from '../PlannerItemStatusBtn';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
import MuiTooltip from '../../MuiTooltip';

type TaskModalStatusContainerProps = {
  selectedStatus: PlannerItemStatusesEnum;
  isShowRequestLoading?: boolean;
  isEditor?: boolean;
  isHideBacklogBtn?: boolean;
  isDisabledBacklogBtn?: boolean;
  isDisabledTodoBtn?: boolean;
  isDisabledInProgressBtn?: boolean;
  isDisabledDoneBtn?: boolean;
  handleChangeStatus: (value: PlannerItemStatusesEnum, setIsLoading?: (val: boolean) => void) => void;
  isArchive?: boolean;
  isExstraSmallBtn?: boolean;
  backlogBtnTooltipText?: string;
  todoBtnTooltipText?: string;
  inProgressBtnTooltipText?: string;
  doneBtnTooltipText?: string;
};
const TaskModalStatusContainer: FC<TaskModalStatusContainerProps> = ({
  selectedStatus,
  handleChangeStatus,
  isShowRequestLoading = false,
  isEditor = true,
  isHideBacklogBtn = false,
  isArchive,
  isExstraSmallBtn = false,
  isDisabledBacklogBtn,
  isDisabledTodoBtn,
  isDisabledInProgressBtn,
  isDisabledDoneBtn,
  backlogBtnTooltipText,
  todoBtnTooltipText,
  inProgressBtnTooltipText,
  doneBtnTooltipText,
}) => {
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
      {!isHideBacklogBtn && (
        <MuiTooltip title={isDisabledBacklogBtn ? backlogBtnTooltipText || '' : ''}>
          <StatusItemContainer>
            <PlannerItemStatusBtn
              isSelected={selectedStatus === PlannerItemStatusesEnum.backlog}
              isDisabled={
                (!isEditor && selectedStatus !== PlannerItemStatusesEnum.backlog) || isDisabledBacklogBtn
              }
              variant={PlannerItemStatusesEnum.backlog}
              isExstraSmallBtn={isExstraSmallBtn}
              isShowRequestLoading={isShowRequestLoading}
              onClick={(setIsLoading?: (val: boolean) => void) =>
                handleChangeStatus(PlannerItemStatusesEnum.backlog, setIsLoading)
              }
            />
          </StatusItemContainer>
        </MuiTooltip>
      )}
      <MuiTooltip title={isDisabledTodoBtn ? todoBtnTooltipText || '' : ''}>
        <StatusItemContainer>
          <PlannerItemStatusBtn
            isSelected={selectedStatus === PlannerItemStatusesEnum.todo}
            isShowRequestLoading={isShowRequestLoading}
            isExstraSmallBtn={isExstraSmallBtn}
            isDisabled={
              (!isEditor && selectedStatus === PlannerItemStatusesEnum.backlog) || isDisabledTodoBtn
            }
            onClick={(setIsLoading?: (val: boolean) => void) =>
              handleChangeStatus(PlannerItemStatusesEnum.todo, setIsLoading)
            }
            variant={PlannerItemStatusesEnum.todo}
          />
        </StatusItemContainer>
      </MuiTooltip>
      <MuiTooltip title={isDisabledInProgressBtn ? inProgressBtnTooltipText || '' : ''}>
        <StatusItemContainer>
          <PlannerItemStatusBtn
            isSelected={selectedStatus === PlannerItemStatusesEnum.in_progress}
            isShowRequestLoading={isShowRequestLoading}
            isExstraSmallBtn={isExstraSmallBtn}
            isDisabled={
              (!isEditor && selectedStatus === PlannerItemStatusesEnum.backlog) || isDisabledInProgressBtn
            }
            onClick={(setIsLoading?: (val: boolean) => void) =>
              handleChangeStatus(PlannerItemStatusesEnum.in_progress, setIsLoading)
            }
            variant={PlannerItemStatusesEnum.in_progress}
          />
        </StatusItemContainer>
      </MuiTooltip>
      <MuiTooltip title={isDisabledDoneBtn ? doneBtnTooltipText || '' : ''}>
        <StatusItemContainer>
          <PlannerItemStatusBtn
            isSelected={selectedStatus === PlannerItemStatusesEnum.done}
            isShowRequestLoading={isShowRequestLoading}
            isExstraSmallBtn={isExstraSmallBtn}
            isDisabled={
              (!isEditor && selectedStatus === PlannerItemStatusesEnum.backlog) || isDisabledDoneBtn
            }
            onClick={(setIsLoading?: (val: boolean) => void) =>
              handleChangeStatus(PlannerItemStatusesEnum.done, setIsLoading)
            }
            variant={PlannerItemStatusesEnum.done}
          />
        </StatusItemContainer>
      </MuiTooltip>
    </Box>
  );
};

export default memo(TaskModalStatusContainer);
