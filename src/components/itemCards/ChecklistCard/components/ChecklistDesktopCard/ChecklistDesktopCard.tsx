import React, { FC, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSS } from '@dnd-kit/utilities';
import BaseActionMenu from '../../../../actionMenus/BaseActionMenu';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import ChecklistCardContent from '../ChecklistCardContent/ChecklistCardContent';
import { TodoItemModel } from '../../../../../shared/models/todo/todoItemModel';
import { Container, Header, HeaderIconContainer } from './ChecklistDesktopCard.style';
import ChecklistCounter from '../ChecklistCounter/ChecklistCounter';
import { ChecklistItemModel } from '../../../../../shared/models/checklists/checklistItem.model';
import { ChecklistItemStatusEnum } from '../../../../../shared/enums/checklistItemStatus.enum';
import CardTitleForm from '../../../../forms/CardTitleForm';

type Props = {
  item: TodoItemModel;
  sortedChecklistData: { data: ChecklistItemModel[]; todoCount: number; doneCount: number };
  iconItem: any;
  onSubmit: any;
  menuList: ActionMenuListModel;
  handleDeleteChecklistItem?: (itemId: number, callback: (value: boolean) => void) => void;
  handleConvertChecklistItemToTask: (id: number, title: string) => void;
  handleChangeChecklistItemStatus?: (
    newStatus: ChecklistItemStatusEnum,
    itemId: number,
    callback: (value: boolean) => void,
  ) => void;
  handleUpdateChecklistItem?: (itemId: number, body: string, callback: (value: boolean) => void) => void;
  handleOpenShareModal: () => void;
  handleUpdateChecklist: ({
    checklistId,
    title,
    callback,
  }: {
    checklistId: number;
    title: string;
    callback: () => void;
  }) => void;
  handleDecline: () => void;
  handleAccept: () => void;
  permissions: { isEditor: boolean; isCreator: boolean };
  isNotAcceptedItem: boolean;
  handleOpenAttachFilesModal: () => void;
  handleUpdateChecklistDueDate: ({
    due_date,
    callback,
  }: {
    due_date?: string;
    callback: (value: boolean) => void;
  }) => void;
  isCanDnD?: boolean;
  isShowFormLoader?: boolean;
  isCanDraggable: boolean;
  isDndActive?: boolean;
};

const ChecklistDesktopCard: FC<Props> = ({
  item,
  iconItem,
  menuList,
  handleOpenAttachFilesModal,
  handleDeleteChecklistItem,
  handleConvertChecklistItemToTask,
  handleChangeChecklistItemStatus,
  handleUpdateChecklistItem,
  isCanDraggable,
  sortedChecklistData,
  handleOpenShareModal,
  permissions,
  isNotAcceptedItem,
  handleDecline,
  handleUpdateChecklistDueDate,
  handleUpdateChecklist,
  onSubmit,
  isCanDnD,
  isShowFormLoader,
  isDndActive,
  handleAccept,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });
  const theme = useTheme();
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? 'grabbing' : 'default',
    opacity: 1,
    backgroundColor: isDragging ? '#EFF6FF' : '',
    border: isDndActive ? '1px solid #2563EC' : isDragging ? '1px dashed #61A5FA' : '1px solid #D9DDEC',
  };

  const handleCompleteEdit = () => {
    setIsEdit(false);
    setIsShowLoader(false);
  };

  const handleChangeTitle = ({ title }: { title: string }) => {
    handleUpdateChecklist({ checklistId: item.id, title, callback: handleCompleteEdit });
    setIsShowLoader(true);
  };

  return (
    <Container
      style={style}
      ref={setNodeRef}
      isNotAcceptedItem={isNotAcceptedItem}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      {!isDragging && (
        <>
          <Header isNotAcceptedItem={isNotAcceptedItem}>
            <Box
              sx={{
                position: 'absolute',
                left: '-5px',
                display:
                  isCanDnD && !isNotAcceptedItem && isHover && isCanDraggable && !isEdit ? 'block' : 'none',
                mr: '8px',
                color: theme.palette.case.neutral.n400,
              }}
              {...listeners}
              {...attributes}
            >
              <DragIndicatorIcon width="16px" height="16px" sx={{ cursor: 'grab' }} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexGrow: '1',
                maxWidth: 'calc(100% - 90px)',
              }}
            >
              {iconItem?.icon && (
                <HeaderIconContainer>
                  <iconItem.icon />
                </HeaderIconContainer>
              )}

              {isEdit ? (
                <Box sx={{ flexGrow: 1, mr: '10px' }}>
                  <CardTitleForm
                    isShowInputLoader={isShowLoader}
                    title={item.title}
                    callBack={handleChangeTitle}
                    handleCancelEdit={handleCompleteEdit}
                  />
                </Box>
              ) : (
                <Typography
                  width="100%"
                  onDoubleClick={() => (permissions.isEditor && !isNotAcceptedItem ? setIsEdit(true) : true)}
                  noWrap
                  variant="large"
                >
                  {item.title}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexShrink: '0',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {sortedChecklistData?.data?.length || item?.is_done ? (
                  <ChecklistCounter
                    allChecklistsCount={sortedChecklistData?.data?.length}
                    doneChecklistsCount={sortedChecklistData.doneCount}
                    isDone={item.is_done}
                  />
                ) : (
                  <></>
                )}
                <BaseActionMenu isPrimaryHover={false} color="primary" menuList={menuList} />
              </Box>
            </Box>
          </Header>

          <ChecklistCardContent
            item={item}
            isShowFormLoader={isShowFormLoader}
            onSubmit={onSubmit}
            handleChangeChecklistItemStatus={handleChangeChecklistItemStatus}
            checklistItems={sortedChecklistData.data}
            handleOpenAttachFilesModal={handleOpenAttachFilesModal}
            handleUpdateChecklistDueDate={handleUpdateChecklistDueDate}
            handleDeleteChecklistItem={handleDeleteChecklistItem}
            handleConvertChecklistItemToTask={handleConvertChecklistItemToTask}
            handleOpenShareModal={handleOpenShareModal}
            handleUpdateChecklistItem={handleUpdateChecklistItem}
            permissions={permissions}
            isNotAcceptedItem={isNotAcceptedItem}
            handleDecline={handleDecline}
            handleAccept={handleAccept}
          />
        </>
      )}
    </Container>
  );
};

export default ChecklistDesktopCard;
