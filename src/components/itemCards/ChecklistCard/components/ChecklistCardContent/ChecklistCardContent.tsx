import React, { FC, useMemo, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Moment from 'moment/moment';
import MuiIconButton from '../../../../buttons/iconButtons/MuiIconButton';
import {
  ChecklistItemWrap,
  Content,
  ContentContainer,
  ContentHeader,
  ContentTopContainer,
} from './ChecklistCardContent.style';
import ChecklistItem from '../ChecklistItem/ChecklistItem';
import { ReactComponent as ShareIcon } from '../../../../../assets/Images/actionsIcons/share.svg';
import { ReactComponent as ConvertIcon } from '../../../../../assets/Images/actionsIcons/convert.svg';
import { ChecklistItemModel } from '../../../../../shared/models/checklists/checklistItem.model';
import MuiAvatarGroup from '../../../../avatars/MuiAvatarGroup';
import { TodoItemModel } from '../../../../../shared/models/todo/todoItemModel';
import CardBottomButtons from '../../../../CardBottomButtons/CardBottomButtons';
import ChecklistForm from '../../../../forms/ChecklistForm';
import { ChecklistItemStatusEnum } from '../../../../../shared/enums/checklistItemStatus.enum';
import { setNewChecklistDataInTodo } from '../../../../../store/todo/Checklists/checklistsSlice';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import MuiDatePicker from '../../../../formElements/MuiDatePicker';
import MuiPreloader from '../../../../MuiPreloader';
import { handleSortChecklists } from '../../../../../store/checklists/checklistsThunk';
import { PackageEnum } from '../../../../../shared/enums/package.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { ReactComponent as SmallCalendar } from '../../../../../assets/Images/small-calendar.svg';

type Props = {
  item: TodoItemModel;
  checklistItems: ChecklistItemModel[];
  handleDeleteChecklistItem?: (itemId: number, callback: (value: boolean) => void) => void;
  handleConvertChecklistItemToTask: (id: number, title: string) => void;
  handleChangeChecklistItemStatus?: (
    newStatus: ChecklistItemStatusEnum,
    itemId: number,
    callback: (value: boolean) => void,
  ) => void;
  handleUpdateChecklistItem?: (itemId: number, body: string, callback: (value: boolean) => void) => void;
  onSubmit: any;
  handleOpenShareModal: () => void;
  handleDecline: () => void;
  handleAccept: () => void;
  permissions: { isEditor: boolean; isCreator: boolean };
  isNotAcceptedItem: boolean;
  isMobile?: boolean;
  handleUpdateChecklistDueDate: ({
    due_date,
    callback,
  }: {
    due_date?: string;
    callback: (value: boolean) => void;
  }) => void;
  isShowFormLoader?: boolean;
  handleOpenAttachFilesModal: () => void;
};

const ChecklistCardContent: FC<Props> = ({
  checklistItems,
  handleDeleteChecklistItem,
  handleConvertChecklistItemToTask,
  handleOpenShareModal,
  item,
  isMobile,
  handleChangeChecklistItemStatus,
  handleUpdateChecklistItem,
  handleOpenAttachFilesModal,
  handleUpdateChecklistDueDate,
  onSubmit,
  isShowFormLoader,
  permissions,
  isNotAcceptedItem,
  handleDecline,
  handleAccept,
}) => {
  const theme = useTheme();
  const [isShowDueDateLoader, setIsShowDueDateLoader] = useState<boolean>(false);

  const [isHover, setIsHover] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [activeId, setActiveId] = useState(null);
  const profileData = useAppSelector(({ profile }) => profile);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: isMobile ? 300 : 0,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: isMobile ? 300 : 0,
        tolerance: 5,
      },
    }),
  );
  const isStarterPackage = useMemo(() => {
    return (
      profileData?.data?.subscription?.package === PackageEnum.starter ||
      !profileData?.data?.subscription?.package
    );
  }, [profileData?.data?.subscription?.package]);
  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };
  const handleOpenUpgradePackageModal = () => {
    modalObserver.addModal(ModalNamesEnum.purchaseModal, {});
  };

  const handleDragEnd = (event: any) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = checklistItems.findIndex(({ id }: { id: number }) => id === active.id);
      const newIndex = checklistItems.findIndex(({ id }: { id: number }) => id === over.id);

      dispatch(
        setNewChecklistDataInTodo({
          todoId: item.id,
          newChecklists: arrayMove(checklistItems, oldIndex, newIndex),
        }),
      );
      dispatch(handleSortChecklists({ id: active.id, index: newIndex }));
    }
  };

  const handleChangeDueDate = (e: any) => {
    setIsShowDueDateLoader(true);
    handleUpdateChecklistDueDate({ due_date: e, callback: setIsShowDueDateLoader });
  };

  return (
    <ContentContainer>
      <ContentTopContainer isNotAcceptedItem={isNotAcceptedItem}>
        <ContentHeader
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
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
              <MuiIconButton onClick={handleOpenShareModal} variant="default" size="medium" color="primary">
                <ShareIcon />
              </MuiIconButton>
            )
          )}
          <Box display="flex" alignItems="center">
            <Box
              display="flex"
              alignItems="center"
              sx={{ pointerEvents: permissions.isEditor && !isNotAcceptedItem ? 'auto' : 'none' }}
            >
              {isShowDueDateLoader ? (
                <MuiPreloader size="medium" isShow />
              ) : (
                <>
                  {isStarterPackage ? (
                    <MuiIconButton
                      onClick={handleOpenUpgradePackageModal}
                      variant="default"
                      size="medium"
                      color="primary"
                    >
                      <SmallCalendar />
                    </MuiIconButton>
                  ) : (
                    <MuiDatePicker
                      isButton
                      isClearable={false}
                      value={item?.due_dated_at ? Moment.utc(item?.due_dated_at).local().toDate() : null}
                      onChange={handleChangeDueDate}
                    />
                  )}
                </>
              )}

              {item?.due_dated_at ? (
                <Typography
                  color={item.current_user.is_late ? theme.palette.case.red.r500 : '#5A6384'}
                  fontWeight={500}
                  variant="default"
                >
                  {Moment.utc(item?.due_dated_at).local().format('DD/MM/YY')}
                </Typography>
              ) : (
                <></>
              )}
              {item?.due_dated_at && (isHover || isMobile) && permissions.isEditor ? (
                <MuiIconButton
                  sx={{ ml: '4px' }}
                  onClick={() =>
                    handleUpdateChecklistDueDate({ due_date: undefined, callback: setIsShowDueDateLoader })
                  }
                  variant="default"
                  size="small"
                  color="primary"
                >
                  <ClearIcon />
                </MuiIconButton>
              ) : (
                <></>
              )}
            </Box>

            <Box
              sx={{
                width: '1px',
                m: '0px 8px',
                height: '24px',
                backgroundColor: theme.palette.case.neutral.n100,
              }}
            />
            <Box
              display="flex"
              alignItems="center"
              sx={{
                pointerEvents:
                  (permissions.isEditor && !isNotAcceptedItem) || item.documents.length > 0 ? 'auto' : 'none',
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
          </Box>
        </ContentHeader>

        <Content>
          <Box sx={{ p: '0 12px' }}>
            <ChecklistForm
              isDisabled={checklistItems?.length > 20 || !permissions.isEditor}
              callBack={onSubmit}
              isShowInputLoader={isShowFormLoader}
            />
          </Box>

          {checklistItems?.length > 0 && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
            >
              <SortableContext items={checklistItems} strategy={verticalListSortingStrategy}>
                <ChecklistItemWrap isNotAcceptedItem={isNotAcceptedItem} isEditor={permissions.isEditor}>
                  {checklistItems.map((checklistItem: ChecklistItemModel) => (
                    <ChecklistItem
                      key={item.id}
                      item={checklistItem}
                      isMobile={isMobile}
                      hasDragAndDrop={!isNotAcceptedItem}
                      handleChangeChecklistItemStatus={handleChangeChecklistItemStatus}
                      handleUpdateChecklistItem={handleUpdateChecklistItem}
                      handleDeleteChecklistItem={handleDeleteChecklistItem}
                      handleConvertChecklistItemToTask={handleConvertChecklistItemToTask}
                      hasEditPermission={permissions.isEditor}
                      isNotAcceptedItem={isNotAcceptedItem}
                    />
                  ))}
                  <DragOverlay>
                    {activeId ? (
                      <ChecklistItem
                        isDndActive
                        item={checklistItems.find((i) => i?.id === activeId) as ChecklistItemModel}
                        handleChangeChecklistItemStatus={handleChangeChecklistItemStatus}
                        hasDragAndDrop
                        handleUpdateChecklistItem={handleUpdateChecklistItem}
                        handleDeleteChecklistItem={handleDeleteChecklistItem}
                        handleConvertChecklistItemToTask={handleConvertChecklistItemToTask}
                        hasEditPermission={permissions.isEditor}
                        isNotAcceptedItem={isNotAcceptedItem}
                      />
                    ) : null}
                  </DragOverlay>
                </ChecklistItemWrap>
              </SortableContext>
            </DndContext>
          )}
        </Content>
      </ContentTopContainer>

      {isNotAcceptedItem && (
        <Box sx={{ mt: '6px' }}>
          <CardBottomButtons handleDecline={handleDecline} handleAccept={handleAccept} />
        </Box>
      )}
    </ContentContainer>
  );
};

export default ChecklistCardContent;
