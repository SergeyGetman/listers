import React, { FC, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import BaseActionMenu from '../../../../actionMenus/BaseActionMenu';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import { NoteItemModel } from '../../../../../shared/models/todo/notes/noteItemModel';
import NoteCardContent from '../NoteCardContent/NoteCardContent';
import { Container } from './NoteDesktopCard.style';
import CardTitleForm from '../../../../forms/CardTitleForm';

type Props = {
  item: NoteItemModel;
  menuList: ActionMenuListModel;
  handleOpenShareModal: () => void;
  handleDecline: () => void;
  handleAccept: () => void;
  permissions: { isEditor: boolean; isCreator: boolean };
  isNotAcceptedItem: boolean;
  handleOpenAttachFilesModal: () => void;
  handleUpdateNotesTitle: ({
    noteId,
    title,
    callback,
  }: {
    noteId: number;
    title: string;
    callback: () => void;
  }) => void;
  handleChangeNotesDescription: ({
    noteId,
    description,
    callback,
  }: {
    noteId: number;
    description: string;
    callback: () => void;
  }) => void;
  isCanDnD?: boolean;
  isDndActive?: boolean;
};

const NoteDesktopCard: FC<Props> = ({
  item,
  menuList,
  handleOpenShareModal,
  permissions,
  handleOpenAttachFilesModal,
  isNotAcceptedItem,
  handleDecline,
  handleAccept,
  handleUpdateNotesTitle,
  handleChangeNotesDescription,
  isDndActive,
  isCanDnD,
}) => {
  const theme = useTheme();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
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
    setIsEdit(false);
    setIsShowLoader(false);
  };

  const handleChangeTitle = ({ title }: { title: string }) => {
    handleUpdateNotesTitle({ noteId: item.id, title, callback: handleCompleteEdit });
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
          <NoteCardContent
            item={item}
            handleOpenShareModal={handleOpenShareModal}
            permissions={permissions}
            isNotAcceptedItem={isNotAcceptedItem}
            handleDecline={handleDecline}
            handleAccept={handleAccept}
            handleOpenAttachFilesModal={handleOpenAttachFilesModal}
            handleChangeNotesDescription={handleChangeNotesDescription}
          >
            <Box
              sx={{
                pointerEvents: isNotAcceptedItem ? 'none' : 'auto',
                display: 'flex',
                position: 'relative',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: '48px',
                borderRadius: '5px 5px 0px 0px',
                borderBottom: `1px solid #EFF1FB`,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: '-5px',
                  display: isCanDnD && isHover && !isEdit && !isNotAcceptedItem ? 'block' : 'none',
                  mr: '8px',
                  color: theme.palette.case.neutral.n400,
                }}
                {...listeners}
                {...attributes}
              >
                <DragIndicatorIcon sx={{ cursor: 'grab' }} />
              </Box>
              <Box
                sx={{
                  ml: '12px',
                  //   TODO add new color
                  color: '#444C6D',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexGrow: '1',
                  maxWidth: 'calc(100% - 80px)',
                }}
              >
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
                    onDoubleClick={() => (permissions.isEditor ? setIsEdit(true) : true)}
                    noWrap
                    variant="large"
                  >
                    {item.title}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: '6px', pointerEvents: 'auto' }}>
                  <BaseActionMenu menuList={menuList} />
                </Box>
              </Box>
            </Box>
          </NoteCardContent>
        </>
      )}
    </Container>
  );
};

export default NoteDesktopCard;
