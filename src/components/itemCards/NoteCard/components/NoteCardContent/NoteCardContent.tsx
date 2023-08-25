import React, { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';
import MuiIconButton from '../../../../buttons/iconButtons/MuiIconButton';
import { ContentHeader, ContentContainer, ContentTopContainer } from './NoteCardContent.style';
import { ReactComponent as ShareIcon } from '../../../../../assets/Images/actionsIcons/share.svg';
import { ReactComponent as ConvertIcon } from '../../../../../assets/Images/actionsIcons/convert.svg';
import MuiAvatarGroup from '../../../../avatars/MuiAvatarGroup';
import { NoteItemModel } from '../../../../../shared/models/todo/notes/noteItemModel';
import CardBottomButtons from '../../../../CardBottomButtons/CardBottomButtons';
import ChecklistUpdateForm from '../../../../forms/ChecklistUpdateForm/ChecklistUpdateForm';

type Props = {
  children?: React.ReactNode;
  item: NoteItemModel;
  handleOpenShareModal: () => void;
  handleDecline: () => void;
  handleAccept: () => void;
  isEditBody?: boolean;
  setIsEditBody?: (value: boolean) => void;
  permissions: { isEditor: boolean; isCreator: boolean };
  isNotAcceptedItem: boolean;
  handleOpenAttachFilesModal: () => void;
  isMobile?: boolean;
  handleChangeNotesDescription: ({
    noteId,
    description,
    callback,
  }: {
    noteId: number;
    description: string;
    callback: () => void;
  }) => void;
};

const NoteCardContent: FC<Props> = ({
  handleOpenShareModal,
  item,
  isEditBody,
  setIsEditBody,
  permissions,
  isNotAcceptedItem,
  handleDecline,
  isMobile,
  handleAccept,
  handleOpenAttachFilesModal,
  handleChangeNotesDescription,
  children,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const handleCompleteEdit = () => {
    setIsEdit(false);
    setIsShowLoader(false);
    if (setIsEditBody) {
      setIsEditBody(false);
    }
  };

  const handleChangeDescription = ({ body }: { body: string }) => {
    handleChangeNotesDescription({ noteId: item.id, description: body, callback: handleCompleteEdit });
    setIsShowLoader(true);
  };

  return (
    <>
      <ContentContainer isNotAcceptedItem={isNotAcceptedItem}>
        {!!children && children}
        <ContentHeader>
          {item?.users?.length > 0 ? (
            <MuiAvatarGroup
              size="extraSmall"
              isContainOwnerInUsers={false}
              users={item?.users}
              isShowAddUserBtn={permissions.isEditor}
              onClickShare={handleOpenShareModal}
              owner={item?.owner}
            />
          ) : (
            (permissions.isEditor || isNotAcceptedItem) && (
              <MuiIconButton onClick={handleOpenShareModal} variant="default" size="medium" color="secondary">
                <ShareIcon />
              </MuiIconButton>
            )
          )}
          <Box
            display="flex"
            alignItems="center"
            sx={{
              pointerEvents:
                (!isNotAcceptedItem && permissions.isEditor) || item.documents.length > 0 ? 'auto' : 'none',
            }}
          >
            <MuiIconButton
              onClick={handleOpenAttachFilesModal}
              variant="default"
              size="medium"
              color="primary"
            >
              <ConvertIcon />
            </MuiIconButton>
            {item?.documents?.length > 0 ? (
              <Typography color="#5A6384" fontWeight={500} variant="default">
                {item?.documents?.length}
              </Typography>
            ) : (
              <></>
            )}
          </Box>
        </ContentHeader>

        <ContentTopContainer
          onDoubleClick={() =>
            permissions.isEditor && !isNotAcceptedItem && !isMobile ? setIsEdit(true) : true
          }
          isNotAcceptedItem={isNotAcceptedItem}
        >
          {isEdit || isEditBody ? (
            <ChecklistUpdateForm
              handleCancelEdit={handleCompleteEdit}
              maxRows={isMobile ? 5 : 9}
              minRows={isMobile ? 5 : 9}
              isDescription
              isMobile={isMobile}
              initialBody={item.description}
              callBack={handleChangeDescription}
              isShowInputLoader={isShowLoader}
            />
          ) : (
            <>
              {item.description ? (
                <Typography
                  variant="default"
                  color="#444C6D"
                  sx={{ whiteSpace: 'pre-wrap', height: '100%', wordBreak: 'break-word' }}
                >
                  {item.description}
                </Typography>
              ) : (
                <Typography
                  variant="default"
                  color="#787F9D"
                  sx={{ whiteSpace: 'pre-wrap', height: '100%', wordBreak: 'break-word' }}
                >
                  Write your note here...
                </Typography>
              )}
            </>
          )}
        </ContentTopContainer>
      </ContentContainer>

      {isNotAcceptedItem && <CardBottomButtons handleDecline={handleDecline} handleAccept={handleAccept} />}
    </>
  );
};

export default NoteCardContent;
