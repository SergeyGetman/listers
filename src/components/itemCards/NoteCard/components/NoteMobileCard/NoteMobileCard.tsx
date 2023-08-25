import React, { FC, useCallback, useState } from 'react';
import { AccordionDetails, Box, Typography, useTheme } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import BaseActionMenu from '../../../../actionMenus/BaseActionMenu';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import {
  AccordionCustom,
  AccordionSummaryCustom,
} from '../../../ChecklistCard/components/ChecklistMobileCard/ChecklistMobileCard.style';
import { NoteItemModel } from '../../../../../shared/models/todo/notes/noteItemModel';
import NoteCardContent from '../NoteCardContent/NoteCardContent';
import CardTitleForm from '../../../../forms/CardTitleForm';

type Props = {
  item: NoteItemModel;
  menuList: ActionMenuListModel;
  handleOpenShareModal: () => void;
  setIsEditTitle: (value: boolean) => void;
  setIsEditBody: (value: boolean) => void;
  handleDecline: () => void;
  isEditTitle: boolean;
  isEditBody: boolean;
  handleAccept: () => void;
  permissions: { isEditor: boolean; isCreator: boolean };
  handleOpenAttachFilesModal: () => void;
  isNotAcceptedItem: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
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

const NoteMobileCard: FC<Props> = ({
  item,
  isEditTitle,
  setIsEditTitle,
  isEditBody,
  setIsEditBody,
  menuList,
  handleOpenAttachFilesModal,
  handleOpenShareModal,
  permissions,
  isNotAcceptedItem,
  handleDecline,
  handleAccept,
  handleChangeNotesDescription,
  handleUpdateNotesTitle,
  isExpanded,
  isDndActive,
  onToggleExpand,
  isCanDnD,
}) => {
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const handleToggleExpand = useCallback(() => {
    onToggleExpand();
  }, [onToggleExpand]);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled: !isCanDnD || isEditTitle || isNotAcceptedItem,
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
    setIsEditTitle(false);
    setIsShowLoader(false);
  };

  const handleChangeTitle = ({ title }: { title: string }) => {
    handleUpdateNotesTitle({ noteId: item.id, title, callback: handleCompleteEdit });
    setIsShowLoader(true);
  };

  return (
    <AccordionCustom
      style={style}
      ref={setNodeRef}
      disableGutters
      expanded={isExpanded}
      onChange={handleToggleExpand}
      isNotAcceptedItem={isNotAcceptedItem}
    >
      <AccordionSummaryCustom
        isOpen={isExpanded}
        isNotAcceptedItem={isNotAcceptedItem}
        aria-controls="panel1a-content"
        id="panel1a-header"
        {...listeners}
        {...attributes}
      >
        {!isDragging && (
          <>
            <Box
              sx={{
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
                  top: '30%',
                  display: isDndActive ? 'block' : 'none',
                  mr: '8px',
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
                  maxWidth: 'calc(100% - 30px)',
                }}
              >
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
                <BaseActionMenu menuList={menuList} />
              </Box>
            </Box>
          </>
        )}
      </AccordionSummaryCustom>
      <AccordionDetails sx={{ p: 0 }}>
        {!isDragging ? (
          <>
            <NoteCardContent
              item={item}
              isMobile
              isEditBody={isEditBody}
              setIsEditBody={setIsEditBody}
              handleChangeNotesDescription={handleChangeNotesDescription}
              handleOpenShareModal={handleOpenShareModal}
              permissions={permissions}
              isNotAcceptedItem={isNotAcceptedItem}
              handleOpenAttachFilesModal={handleOpenAttachFilesModal}
              handleDecline={handleDecline}
              handleAccept={handleAccept}
            />
          </>
        ) : (
          <Box sx={{ height: 'calc(100% - 48px)', minHeight: '180px' }} />
        )}
      </AccordionDetails>
    </AccordionCustom>
  );
};

export default NoteMobileCard;
