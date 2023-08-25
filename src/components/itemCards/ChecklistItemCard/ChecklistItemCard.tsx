import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import Linkify from 'react-linkify';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiIconButton from '../../buttons/MuiIconButton';
import { ChecklistItemContainer, ChecklistItemMainInfo } from './ChecklistItemCard.style';
import { ChecklistItemModel } from '../../../shared/models/checklists/checklistItem.model';
import { ChecklistItemStatusEnum } from '../../../shared/enums/checklistItemStatus.enum';
import MuiPreloader from '../../MuiPreloader';
import BaseActionMenu from '../../actionMenus/BaseActionMenu';
import { ActionMenuListModel } from '../../../shared/models/actionMenuList.model';
import typeGuardFormActionMenu from '../../../shared/functions/typeGuardFormActionMenu';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import { ChecklistFormPayloadModel } from '../../../shared/models/checklists/checklistFormPayload.model';
import modalObserver from '../../../shared/utils/observers/modalObserver';

import ChecklistUpdateForm from '../../forms/ChecklistUpdateForm/ChecklistUpdateForm';
type ChecklistItemCardProps = {
  item: ChecklistItemModel;
  handleChangeChecklistItemStatus?: (
    newStatus: ChecklistItemStatusEnum,
    itemId: number,
    callback: (value: boolean) => void,
  ) => void;
  handleUpdateChecklistItem?: (itemId: number, body: string, callback: (value: boolean) => void) => void;
  handleDeleteChecklistItem?: (itemId: number, callback: (value: boolean) => void) => void;
  hasEditPermission: boolean;
  isBorderRadius?: boolean;
  hoverColor?: string | null;
  isActionMenu?: boolean;
};
const ChecklistItemCard: FC<ChecklistItemCardProps> = ({
  item,
  handleChangeChecklistItemStatus,
  handleUpdateChecklistItem,
  handleDeleteChecklistItem,
  hasEditPermission,
  isBorderRadius,
  hoverColor,
  isActionMenu,
}) => {
  const theme = useTheme();
  const [isShowStatusLoader, setIsShowStatusLoader] = useState<boolean>(false);
  const [isShowInputLoader, setIsShowInputLoader] = useState<boolean>(false);
  const [isShowRemoveLoader, setIsShowRemoveLoader] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { t } = useTranslation();

  const changeStatus = useCallback(
    (newStatus: ChecklistItemStatusEnum) => {
      if (handleChangeChecklistItemStatus) {
        setIsShowStatusLoader(true);
        handleChangeChecklistItemStatus(newStatus, item.id, setIsShowStatusLoader);
      }
    },
    [handleChangeChecklistItemStatus, item.id],
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

  const handleChangeEdit = useCallback((val: boolean) => {
    setIsEdit(val);
  }, []);

  const handleDelete = useCallback(
    (itemId: number) => {
      if (handleDeleteChecklistItem) {
        setIsShowRemoveLoader(true);
        handleDeleteChecklistItem(itemId, setIsShowRemoveLoader);
      }
    },
    [handleDeleteChecklistItem],
  );

  const handleConvertToTask = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.createTaskModal, {
      props: {
        description: item?.body,
        handleDeleteChecklistItem: () => handleDelete(item?.id),
      },
    });
  }, [handleDelete, item?.body, item?.id]);

  const menuList: ActionMenuListModel = useMemo(() => {
    return [
      hasEditPermission && {
        label: t('general.actionMenus.edit'),
        callback: () => handleChangeEdit(true),
        tooltipTitle: t('general.tooltips.activateHubs'),
      },
      hasEditPermission && {
        label: t('general.actionMenus.convertToTask'),
        callback: () => handleConvertToTask(),
        tooltipTitle: t('general.tooltips.activateHubs'),
      },
      hasEditPermission && {
        label: t('general.actionMenus.deleteTask'),
        callback: () => handleDelete(item?.id),
        isDisabled: false,
      },
    ].filter(typeGuardFormActionMenu);
  }, [hasEditPermission, t, handleChangeEdit, handleConvertToTask, handleDelete, item?.id]);

  const getChecklistItemStatus = useMemo(() => {
    switch (item.status) {
      case ChecklistItemStatusEnum.todo: {
        return (
          <Box
            sx={{
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                opacity: '0.7',
              },
            }}
          >
            <MuiIconButton
              onClick={() => changeStatus(ChecklistItemStatusEnum.done)}
              isDisabled={!hasEditPermission || isShowRemoveLoader}
              color="secondary"
              size="small"
            >
              <CheckBoxOutlineBlankIcon />
            </MuiIconButton>
          </Box>
        );
      }
      case ChecklistItemStatusEnum.done: {
        return (
          <Box
            sx={{
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                opacity: '0.7',
              },
            }}
          >
            <MuiIconButton
              onClick={() => changeStatus(ChecklistItemStatusEnum.todo)}
              isDisabled={!hasEditPermission || isShowRemoveLoader}
              color="primary"
              size="small"
            >
              <CheckBoxIcon />
            </MuiIconButton>
          </Box>
        );
      }
      default: {
        return null;
      }
    }
  }, [item.status, hasEditPermission, changeStatus, isShowRemoveLoader]);

  return (
    <>
      {isEdit ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: '43px',
            p: '4px 2px',
          }}
        >
          <ChecklistUpdateForm
            initialBody={item.body}
            status={item.status}
            callBack={updateChecklistItem}
            isShowInputLoader={isShowInputLoader}
          />
        </Box>
      ) : (
        <ChecklistItemContainer hoverColor={hoverColor} isBorderRadius={isBorderRadius}>
          <ChecklistItemMainInfo isChecked={item.status === ChecklistItemStatusEnum.done}>
            <Box sx={{ height: '16px' }}>
              {isShowStatusLoader ? (
                <MuiPreloader size="small" isShow />
              ) : (
                <Box> {getChecklistItemStatus}</Box>
              )}
            </Box>

            <Typography variant="default" sx={{ marginLeft: '5px', whiteSpace: 'pre-wrap' }}>
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
          </ChecklistItemMainInfo>

          {isShowRemoveLoader ? (
            <Box sx={{ marginRight: '10px', height: '20px', marginTop: '12px' }}>
              <MuiPreloader size="small" isShow />
            </Box>
          ) : (
            <Box sx={{ marginRight: '10px' }}>
              {hasEditPermission && (
                <>
                  {isActionMenu && menuList ? (
                    <Box component="span" className="checklist-item-remove-btn">
                      <BaseActionMenu menuList={menuList} />
                    </Box>
                  ) : (
                    <Box component="span" className="checklist-item-remove-btn">
                      <MuiIconButton
                        isDisabled={isShowStatusLoader}
                        onClick={() => handleDelete(item?.id)}
                        color="secondary"
                        size="small"
                      >
                        <DeleteForeverOutlinedIcon
                          sx={{ '&:hover': { color: theme.palette.case.warning.high, transition: '0.3s' } }}
                        />
                      </MuiIconButton>
                    </Box>
                  )}
                </>
              )}
            </Box>
          )}
        </ChecklistItemContainer>
      )}
    </>
  );
};

export default memo(ChecklistItemCard);
