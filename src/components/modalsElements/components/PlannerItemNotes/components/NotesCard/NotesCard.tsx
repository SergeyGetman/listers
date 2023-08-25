import React, { FC, useCallback, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Linkify from 'react-linkify';
import { NotesItemModel } from '../../../../../../shared/models/notes/notesItem.model';
import { ReactComponent as DeleteIcons } from '../../../../../../assets/Images/delete-icon.svg';

import MuiPreloader from '../../../../../MuiPreloader';
import MuiTooltip from '../../../../../MuiTooltip';
import MuiIconButton from '../../../../../buttons/iconButtons/MuiIconButton';
import { ChecklistFormPayloadModel } from '../../../../../../shared/models/checklists/checklistFormPayload.model';
import ChecklistUpdateForm from '../../../../../forms/ChecklistUpdateForm/ChecklistUpdateForm';
type NotesCardProps = {
  item: NotesItemModel;
  handleDeleteItem?: (id: number, callback: (value: boolean) => void) => void;
  handleChangeNotesDescription?: ({
    noteId,
    description,
    callback,
  }: {
    noteId: number;
    description: string;
    callback: () => void;
  }) => void;
  isCanEdit: boolean;
};
const NotesCard: FC<NotesCardProps> = ({
  item,
  handleDeleteItem,
  handleChangeNotesDescription,
  isCanEdit,
}) => {
  const theme = useTheme();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isShowInputLoader, setIsShowInputLoader] = useState<boolean>(false);
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  const [isShowRemoveLoader, setIsShowRemoveLoader] = useState<boolean>(false);
  const handleResetLoader = useCallback(() => {
    setIsEdit(false);
    setIsShowInputLoader(false);
  }, []);

  const updateNotesItem = useCallback(
    (value: ChecklistFormPayloadModel) => {
      if (handleChangeNotesDescription) {
        setIsShowInputLoader(true);
        handleChangeNotesDescription({
          noteId: item.id,
          description: value.body,
          callback: handleResetLoader,
        });
      }
    },
    [handleResetLoader, handleChangeNotesDescription, item.id],
  );

  const handleSetEdit = () => {
    setTimeout(() => {
      setIsEdit(true);
    }, 100);
  };
  const handleDelete = useCallback(
    (id: number) => {
      if (handleDeleteItem) {
        setIsShowRemoveLoader(true);
        handleDeleteItem(id, setIsShowRemoveLoader);
      }
    },
    [handleDeleteItem],
  );

  return (
    <>
      {isEdit ? (
        <Box
          sx={{
            padding: '4px',
            borderRadius: '8px',
            border: `1px solid ${theme.palette.case.neutral.n200}`,
            height: '100%',
            backgroundColor: theme.palette.case.neutral.n0,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <ChecklistUpdateForm
            handleCancelEdit={handleResetLoader}
            maxRows={isMobileDisplay ? 7 : 7}
            minRows={isMobileDisplay ? 7 : 7}
            isDescription
            isMobile={isMobileDisplay}
            initialBody={item.body}
            callBack={updateNotesItem}
            isShowInputLoader={isShowInputLoader}
          />
        </Box>
      ) : (
        <Box
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          onDoubleClick={() => (isCanEdit && !isMobileDisplay ? handleSetEdit() : true)}
          sx={{
            padding: '8px',
            borderRadius: '8px',
            border: `1px solid ${theme.palette.case.neutral.n200}`,
            height: '100%',
            backgroundColor: theme.palette.case.neutral.n0,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box position="absolute" right={6} top={6}>
            {isShowRemoveLoader ? (
              <Box
                sx={{
                  height: '32px',
                  width: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MuiPreloader size="medium" isShow />
              </Box>
            ) : (
              <Box>
                {isCanEdit && isHover && (
                  <MuiTooltip title="Remove">
                    <Box className="notes-item-remove-btn" component="span" sx={{ height: '20px' }}>
                      <MuiIconButton
                        onClick={() => handleDelete(item.id)}
                        variant="default"
                        size="medium"
                        color="primary"
                      >
                        <DeleteIcons />
                      </MuiIconButton>
                    </Box>
                  </MuiTooltip>
                )}
              </Box>
            )}
          </Box>

          <Typography
            color={theme.palette.case.neutral.n700}
            sx={{
              height: '100%',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
              overflowY: 'auto',
              display: 'block',
              width: '100%',
              '&::-webkit-scrollbar': {
                width: '4px !important',
                borderRadius: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#EFF1FB ',
                width: '4px !important',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#BFC4DA',
                width: '4px !important',
              },
            }}
            variant="t14r"
          >
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a onClick={(e) => e.stopPropagation()} target="blank" href={decoratedHref} key={key}>
                  {decoratedText}
                </a>
              )}
            >
              {item?.body}
            </Linkify>
          </Typography>
        </Box>
      )}
    </>
  );
};

export default NotesCard;
