import React, { FC, useCallback, useState } from 'react';
import { AccordionDetails, Box, Typography, useTheme } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import BaseActionMenu from '../../../../actionMenus/BaseActionMenu';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import ChecklistCardContent from '../ChecklistCardContent/ChecklistCardContent';
import { TodoItemModel } from '../../../../../shared/models/todo/todoItemModel';
import { AccordionCustom, AccordionSummaryCustom } from './ChecklistMobileCard.style';
import ChecklistCounter from '../ChecklistCounter/ChecklistCounter';
import { ChecklistItemModel } from '../../../../../shared/models/checklists/checklistItem.model';
import { ChecklistItemStatusEnum } from '../../../../../shared/enums/checklistItemStatus.enum';
import CardTitleForm from '../../../../forms/CardTitleForm';

type Props = {
  item: TodoItemModel;
  sortedChecklistData: { data: ChecklistItemModel[]; todoCount: number; doneCount: number };
  iconItem: any;
  menuList: ActionMenuListModel;
  setIsEditTitle: (value: boolean) => void;
  isEditTitle: boolean;
  handleDeleteChecklistItem?: (itemId: number, callback: (value: boolean) => void) => void;
  handleConvertChecklistItemToTask: (id: number, title: string) => void;
  onSubmit: any;
  handleOpenAttachFilesModal: () => void;
  handleOpenShareModal: () => void;
  handleChangeChecklistItemStatus?: (
    newStatus: ChecklistItemStatusEnum,
    itemId: number,
    callback: (value: boolean) => void,
  ) => void;
  handleUpdateChecklistItem?: (itemId: number, body: string, callback: (value: boolean) => void) => void;
  handleDecline: () => void;
  handleAccept: () => void;
  handleUpdateChecklistDueDate: ({
    due_date,
    callback,
  }: {
    due_date?: string;
    callback: (value: boolean) => void;
  }) => void;
  handleUpdateChecklist: ({
    checklistId,
    title,
    callback,
  }: {
    checklistId: number;
    title: string;
    callback: () => void;
  }) => void;
  permissions: { isEditor: boolean; isCreator: boolean };
  isNotAcceptedItem: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  isShowFormLoader?: boolean;
  isCanDnD?: boolean;
  isDndActive?: boolean;
};

const ChecklistMobileCard: FC<Props> = ({
  item,
  iconItem,
  isCanDnD,
  menuList,
  handleChangeChecklistItemStatus,
  handleUpdateChecklistDueDate,
  handleUpdateChecklistItem,
  handleUpdateChecklist,
  handleOpenAttachFilesModal,
  handleDeleteChecklistItem,
  handleConvertChecklistItemToTask,
  sortedChecklistData,
  handleOpenShareModal,
  permissions,
  isNotAcceptedItem,
  handleDecline,
  handleAccept,
  isExpanded,
  onSubmit,
  isEditTitle,
  setIsEditTitle,
  isShowFormLoader,
  onToggleExpand,
  isDndActive,
}) => {
  const [isOpen, toggleOpen] = useState<boolean>(isExpanded);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const theme = useTheme();

  const handleToggleExpand = useCallback(() => {
    toggleOpen(!isOpen);
    onToggleExpand();
  }, [isOpen, onToggleExpand]);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled: !isCanDnD || isEditTitle || isNotAcceptedItem,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? 'grabbing' : 'default',
    opacity: 1,
    backgroundColor: isDragging ? '#EFF6FF' : '',
    border: isDndActive ? '1px solid #2563EC' : isDragging ? '1px dashed #61A5FA' : '1px solid #D9DDEC',
  };

  const handleCompleteEdit = () => {
    setIsEditTitle(false);
    setIsShowLoader(false);
  };

  const handleChangeTitle = ({ title }: { title: string }) => {
    handleUpdateChecklist({ checklistId: item.id, title, callback: handleCompleteEdit });
    setIsShowLoader(true);
  };
  return (
    <AccordionCustom
      style={style}
      ref={setNodeRef}
      disableGutters
      expanded={isOpen}
      onChange={handleToggleExpand}
      isNotAcceptedItem={isNotAcceptedItem}
    >
      <AccordionSummaryCustom
        isOpen={isOpen}
        isNotAcceptedItem={isNotAcceptedItem}
        aria-controls="panel1a-content"
        id="panel1a-header"
        {...listeners}
        {...attributes}
      >
        <Box
          sx={{
            opacity: isDragging ? 0 : 1,
            width: '100%',
            display: 'fex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: '-5px',
              display: isDndActive ? 'block' : 'none',
              mr: '8px',
              top: '30%',
              color: theme.palette.case.neutral.n400,
            }}
          >
            <DragIndicatorIcon width="16px" height="16px" sx={{ cursor: 'grab' }} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexGrow: '1',
              maxWidth: item.is_done ? 'calc(100% - 110px)' : 'calc(100% - 100px)',
            }}
          >
            <Box sx={{ pr: '10px' }}>{iconItem?.icon && <iconItem.icon />}</Box>

            {isEditTitle ? (
              <Box onClick={(e) => e.stopPropagation()} sx={{ flexGrow: 1, mr: '10px' }}>
                <CardTitleForm
                  isShowInputLoader={isShowLoader}
                  title={item.title}
                  callBack={handleChangeTitle}
                  handleCancelEdit={handleCompleteEdit}
                />
              </Box>
            ) : (
              <Typography width="100%" noWrap variant="large">
                {item.title}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {sortedChecklistData?.data?.length || item?.is_done ? (
              <ChecklistCounter
                isDone={item.is_done}
                allChecklistsCount={sortedChecklistData?.data?.length}
                doneChecklistsCount={sortedChecklistData.doneCount}
              />
            ) : (
              <></>
            )}

            <BaseActionMenu menuList={menuList} />
          </Box>
        </Box>
      </AccordionSummaryCustom>

      <AccordionDetails sx={{ p: 0 }}>
        <Box sx={{ opacity: isDragging ? 0 : 1 }}>
          <ChecklistCardContent
            item={item}
            isMobile
            checklistItems={item.checklists}
            handleDeleteChecklistItem={handleDeleteChecklistItem}
            handleConvertChecklistItemToTask={handleConvertChecklistItemToTask}
            handleOpenShareModal={handleOpenShareModal}
            permissions={permissions}
            handleUpdateChecklistItem={handleUpdateChecklistItem}
            handleChangeChecklistItemStatus={handleChangeChecklistItemStatus}
            isNotAcceptedItem={isNotAcceptedItem}
            handleDecline={handleDecline}
            handleOpenAttachFilesModal={handleOpenAttachFilesModal}
            handleAccept={handleAccept}
            handleUpdateChecklistDueDate={handleUpdateChecklistDueDate}
            isShowFormLoader={isShowFormLoader}
            onSubmit={onSubmit}
          />
        </Box>
      </AccordionDetails>
    </AccordionCustom>
  );
};

export default ChecklistMobileCard;
