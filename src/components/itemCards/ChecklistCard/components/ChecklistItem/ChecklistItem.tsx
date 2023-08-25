import React, { FC, useCallback, useMemo, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSortable } from '@dnd-kit/sortable';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Linkify from 'react-linkify';
import BaseActionMenu from '../../../../actionMenus/BaseActionMenu';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import { ChecklistItemContainer } from './ChecklistItem.style';
import { ChecklistItemStatusEnum } from '../../../../../shared/enums/checklistItemStatus.enum';
import MuiPreloader from '../../../../MuiPreloader';
import { ChecklistItemModel } from '../../../../../shared/models/checklists/checklistItem.model';
import ChecklistUpdateForm from '../../../../forms/ChecklistUpdateForm/ChecklistUpdateForm';
import { ChecklistFormPayloadModel } from '../../../../../shared/models/checklists/checklistFormPayload.model';
import { ReactComponent as CheckboxCheckedIcon } from '../../../../../assets/Images/checkbox-checked-icon.svg';
import { ReactComponent as CheckboxUncheckedIcon } from '../../../../../assets/Images/checkbox-unchecked-icon.svg';
import typeGuardFormActionMenu from '../../../../../shared/functions/typeGuardFormActionMenu';

type Props = {
  item: ChecklistItemModel;
  hasEditPermission: boolean;
  handleDeleteChecklistItem?: (itemId: number, callback: (value: boolean) => void) => void;
  handleConvertChecklistItemToTask: (id: number, title: string) => void;
  handleChangeChecklistItemStatus?: (
    newStatus: ChecklistItemStatusEnum,
    itemId: number,
    callback: (value: boolean) => void,
  ) => void;
  isMobile?: boolean;
  hasDragAndDrop?: boolean;
  isDndActive?: boolean;
  handleUpdateChecklistItem?: (itemId: number, body: string, callback: (value: boolean) => void) => void;
  isNotAcceptedItem?: boolean;
  isShowConvertToTaskBtn?: boolean;
};

const ChecklistItem: FC<Props> = ({
  item,
  handleDeleteChecklistItem,
  handleConvertChecklistItemToTask,
  isDndActive,
  handleChangeChecklistItemStatus,
  handleUpdateChecklistItem,
  hasEditPermission,
  isMobile,
  hasDragAndDrop,
  isNotAcceptedItem,
  isShowConvertToTaskBtn = true,
}) => {
  const { t } = useTranslation();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isShowStatusLoader, setIsShowStatusLoader] = useState<boolean>(false);
  const [isShowInputLoader, setIsShowInputLoader] = useState<boolean>(false);
  const [isShowRemoveLoader, setIsShowRemoveLoader] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled: isMobile ? !hasDragAndDrop : false,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    height: 'auto',
    cursor: isDragging ? 'grabbing' : 'default',
    opacity: 1,
    backgroundColor: isDragging ? '#EFF6FF' : '',
    borderBottom: isDndActive ? '1px solid #2563EC' : isDragging ? '1px dashed #61A5FA' : '1px solid #F6F8FD',
    borderLeft: isDndActive ? '1px solid #2563EC' : isDragging ? '1px dashed #61A5FA' : 'none',
    borderRight: isDndActive ? '1px solid #2563EC' : isDragging ? '1px dashed #61A5FA' : 'none',
    borderTop: isDndActive ? '1px solid #2563EC' : isDragging ? '1px dashed #61A5FA' : 'none',
  };
  const changeStatus = useCallback(
    (newStatus: ChecklistItemStatusEnum) => {
      if (handleChangeChecklistItemStatus) {
        setIsShowStatusLoader(true);
        handleChangeChecklistItemStatus(newStatus, item.id, setIsShowStatusLoader);
      }
    },
    [handleChangeChecklistItemStatus, item.id],
  );

  const handleDelete = useCallback(
    (itemId: number) => {
      if (handleDeleteChecklistItem) {
        setIsShowRemoveLoader(true);
        handleDeleteChecklistItem(itemId, setIsShowRemoveLoader);
      }
    },
    [handleDeleteChecklistItem],
  );
  const handleResetLoader = useCallback(() => {
    setIsEdit(false);
    setIsShowInputLoader(false);
  }, []);

  const updateChecklistItem = useCallback(
    (value: ChecklistFormPayloadModel) => {
      if (handleUpdateChecklistItem) {
        setIsShowInputLoader(true);
        handleUpdateChecklistItem(item.id, value.body, handleResetLoader);
      }
    },
    [handleResetLoader, handleUpdateChecklistItem, item.id],
  );

  const handleSetEdit = () => {
    setTimeout(() => {
      setIsEdit(true);
    }, 100);
  };

  const menuList: ActionMenuListModel = useMemo(() => {
    return [
      isShowConvertToTaskBtn &&
        hasEditPermission && {
          label: t('general.actionMenus.convertToTask'),
          callback: () => {
            handleConvertChecklistItemToTask(item.id, item.body);
          },
          isDisabled: false,
        },
      hasEditPermission &&
        isMobileDisplay && {
          label: t('general.actionMenus.edit'),
          callback: () => handleSetEdit(),
          tooltipTitle: t('general.tooltips.activateHubs'),
        },
      hasEditPermission && {
        label: t('general.actionMenus.delete'),
        callback: () => {
          handleDelete(item.id);
        },
        isDisabled: false,
      },
    ].filter(typeGuardFormActionMenu);
  }, [
    isShowConvertToTaskBtn,
    t,
    hasEditPermission,
    isMobileDisplay,
    handleConvertChecklistItemToTask,
    item.id,
    item.body,
    handleDelete,
  ]);

  const getChecklistItemStatus = useMemo(() => {
    switch (item.status) {
      case ChecklistItemStatusEnum.todo: {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                opacity: !isNotAcceptedItem && hasEditPermission ? '0.7' : 1,
              },
            }}
          >
            <Box
              onTouchEnd={() =>
                isNotAcceptedItem || !hasEditPermission || (isShowRemoveLoader && !isMobile)
                  ? true
                  : changeStatus(ChecklistItemStatusEnum.done)
              }
              onClick={() =>
                isNotAcceptedItem || !hasEditPermission || (isShowRemoveLoader && isMobile)
                  ? true
                  : changeStatus(ChecklistItemStatusEnum.done)
              }
              sx={{
                cursor: hasEditPermission && !isNotAcceptedItem ? 'pointer' : 'default',
                svg: {
                  width: '16px !important',
                  height: '16px !important',
                },
              }}
            >
              <CheckboxUncheckedIcon />
            </Box>
          </Box>
        );
      }
      case ChecklistItemStatusEnum.done: {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                opacity: hasEditPermission ? '0.7' : 1,
              },
            }}
          >
            <Box
              onTouchEnd={() =>
                isNotAcceptedItem || !hasEditPermission || (isShowRemoveLoader && !isMobile)
                  ? true
                  : changeStatus(ChecklistItemStatusEnum.todo)
              }
              onClick={() =>
                isNotAcceptedItem || !hasEditPermission || (isShowRemoveLoader && isMobile)
                  ? true
                  : changeStatus(ChecklistItemStatusEnum.todo)
              }
              sx={{
                svg: {
                  width: '16px !important',
                  height: '16px !important',
                  cursor: hasEditPermission && !isNotAcceptedItem ? 'pointer' : 'default',
                },
              }}
            >
              <CheckboxCheckedIcon />
            </Box>
          </Box>
        );
      }
      default: {
        return null;
      }
    }
  }, [item.status, isNotAcceptedItem, hasEditPermission, isShowRemoveLoader, isMobile, changeStatus]);

  return (
    <ChecklistItemContainer
      style={style}
      ref={setNodeRef}
      onMouseEnter={() => {
        if (!isMobile) {
          setIsHover(true);
        }
      }}
      onMouseLeave={() => {
        if (!isMobile) {
          setIsHover(false);
        }
      }}
      {...(isMobile ? { ...listeners } : {})}
      {...(isMobile ? { ...attributes } : {})}
      sx={{
        '&:hover': {
          '.dnd-icon': {
            display: isDndActive || hasDragAndDrop ? 'block !important' : 'none',
          },
          '.action-menu': {
            display: !isNotAcceptedItem && hasEditPermission && !isEdit ? 'block !important' : 'none',
          },
        },
      }}
    >
      <Box alignItems="center" display="flex" sx={{ width: '100%', opacity: isDragging ? 0 : 1 }}>
        <Box
          sx={{
            position: 'absolute',
            left: '0',
            transition: 'all 0.3s',
            display: (isHover || isDndActive) && hasDragAndDrop ? 'block' : 'none',
            color: theme.palette.case.neutral.n400,
            svg: {
              width: '12px',
              height: '12px',
            },
          }}
          className="dnd-icon"
          {...listeners}
          {...attributes}
        >
          <DragIndicatorIcon sx={{ cursor: 'grab' }} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {isShowStatusLoader ? (
            <Box sx={{ flexShrink: 1 }}>
              <MuiPreloader size="extraSmall" isShow />{' '}
            </Box>
          ) : (
            <Box> {getChecklistItemStatus}</Box>
          )}
          {isEdit ? (
            <Box sx={{ width: '100%', ml: '10px' }}>
              <ChecklistUpdateForm
                handleCancelEdit={handleResetLoader}
                initialBody={item.body}
                status={item.status}
                callBack={updateChecklistItem}
                isShowInputLoader={isShowInputLoader}
              />
            </Box>
          ) : (
            <Typography
              onDoubleClick={() =>
                hasEditPermission && !isNotAcceptedItem && !isMobile ? setIsEdit(true) : true
              }
              variant="default"
              sx={{
                whiteSpace: 'pre-wrap',
                ml: '10px',
                width: '100%',
                wordBreak: 'break-word',
                userSelect: 'none',
                color: item.status === ChecklistItemStatusEnum.done ? '#5A6384' : '#2B324F',
                textDecoration: item.status === ChecklistItemStatusEnum.done ? 'line-through ' : 'none',
              }}
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
          )}
        </Box>

        {isShowRemoveLoader ? (
          <MuiPreloader size="medium" isShow />
        ) : (
          <>
            {!isEdit ? (
              <Box
                component="span"
                className="action-menu"
                sx={{
                  display: !isNotAcceptedItem && isHover && hasEditPermission && !isEdit ? 'block' : 'none',
                }}
              >
                <BaseActionMenu iconSize="small" menuList={menuList} />
              </Box>
            ) : (
              <></>
            )}
          </>
        )}
      </Box>
    </ChecklistItemContainer>
  );
};

export default ChecklistItem;
