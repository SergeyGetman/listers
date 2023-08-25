import React, { FC, useMemo } from 'react';
import { Box, Collapse, Typography, useTheme } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import { AssignPeopleSelectValueModel } from '../../../../../shared/models/assignPeopleSelectValue.model';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import ListItem from '../ListItem';

type ListProps = {
  assignPeopleList: AssignPeopleSelectValueModel[];
  creator: AssignPeopleSelectValueModel;
  isIncludeOwnerInAssignPeople: boolean;
  currentUserId: number;
  disableRemoveYourself: boolean;
  isDisableRemoveUsers?: boolean;
  isShowSelect?: boolean;
  handleDeleteAssignUser: (id: number) => void;
  handleChangeAssignUserPermission: (
    item: AssignPeopleSelectValueModel,
    permission: AssignPeoplePermissionsEnum,
  ) => void;
};

const List: FC<ListProps> = ({
  assignPeopleList,
  isIncludeOwnerInAssignPeople,
  handleDeleteAssignUser,
  handleChangeAssignUserPermission,
  currentUserId,
  disableRemoveYourself,
  isDisableRemoveUsers,
  isShowSelect = true,
  creator,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const currentUserIndex = useMemo(
    () => assignPeopleList.findIndex((item) => item.id === creator.id),
    [assignPeopleList, creator.id],
  );

  const list = useMemo(() => {
    if (currentUserIndex === -1 || currentUserIndex === 0) {
      return assignPeopleList;
    }

    const listCopy = [...assignPeopleList];
    listCopy.unshift(...listCopy.splice(currentUserIndex, 1));

    return listCopy;
  }, [currentUserIndex, assignPeopleList]);

  return (
    <Box sx={{ marginTop: isShowSelect ? '8px' : '0' }}>
      {!isIncludeOwnerInAssignPeople && (
        <Collapse in={!isIncludeOwnerInAssignPeople}>
          <Box sx={{ opacity: '0.6' }}>
            <ListItem
              isNotAssignedCreator
              handleChangeAssignUserPermission={handleChangeAssignUserPermission}
              handleDeleteAssignUser={handleDeleteAssignUser}
              item={creator}
              isDisableRemoveUsers={isDisableRemoveUsers}
              creatorId={creator.id}
              currentUserId={currentUserId}
            />
          </Box>
        </Collapse>
      )}

      {!!list.length ? (
        <TransitionGroup>
          {list.map((item) => (
            <Collapse key={item.id}>
              <ListItem
                handleChangeAssignUserPermission={handleChangeAssignUserPermission}
                handleDeleteAssignUser={handleDeleteAssignUser}
                item={item}
                isDisableRemoveUsers={isDisableRemoveUsers}
                disableRemoveYourself={disableRemoveYourself}
                creatorId={creator.id}
                currentUserId={currentUserId}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="small" sx={{ color: theme.palette.case.warning.high }}>
            {t('validation.assignPeople.required')}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default List;
