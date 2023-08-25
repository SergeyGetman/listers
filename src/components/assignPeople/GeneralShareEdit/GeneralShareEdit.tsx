import React, { FC, memo } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiSelect from '../../formElements/MuiSelect';
import { ReactComponent as AssignPeopleIcon } from '../../../assets/Images/sidebar/profile.svg';
import List from './components/List';
import { AssignPeopleSelectValueModel } from '../../../shared/models/assignPeopleSelectValue.model';
import { AssignPeoplePermissionsEnum } from '../../../shared/enums/assignPeoplePermissions.enum';

type GeneralShareEditProps = {
  options: AssignPeopleSelectValueModel[];
  creator: AssignPeopleSelectValueModel;
  currentUserId: number;
  isDisableRemoveUsers?: boolean;
  disableRemoveYourself?: boolean;
  assignPeopleList: AssignPeopleSelectValueModel[];
  setAssignPeopleList: (newValue: AssignPeopleSelectValueModel[]) => void;
  isDisabledSelect?: boolean;
  isShowSelect?: boolean;
};
const GeneralShareEdit: FC<GeneralShareEditProps> = ({
  options,
  creator,
  currentUserId,
  assignPeopleList,
  setAssignPeopleList,
  isDisableRemoveUsers,
  disableRemoveYourself = false,
  isDisabledSelect,
  isShowSelect = true,
}) => {
  const { t } = useTranslation();

  const isIncludeOwnerInAssignPeople =
    assignPeopleList.findIndex((item: AssignPeopleSelectValueModel) => item.id === creator.id) !== -1;

  const handleDeleteAssignUser = (id: number) => {
    const newArr = assignPeopleList.filter((item) => item.id !== id);
    setAssignPeopleList(newArr);
  };

  const handleChangeAssignUserPermission = (
    user: AssignPeopleSelectValueModel,
    permission: AssignPeoplePermissionsEnum,
  ) => {
    const newArr = assignPeopleList.map((item) => {
      if (item.id === user.id) {
        return {
          ...item,
          role: permission,
        };
      }
      return item;
    });

    setAssignPeopleList(newArr);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {isShowSelect && (
        <MuiSelect
          value={assignPeopleList}
          isMulti
          isDisableKeybordClear
          isSearchable
          isDisabled={isDisabledSelect}
          options={options}
          isShowAvatarInOptions
          startIcon={<AssignPeopleIcon sx={{ svg: { width: '20px' } }} />}
          controlShouldRenderValue={false}
          placeholder={t('general.placeholders.selectAMember')}
          onChange={(newValue: AssignPeopleSelectValueModel[]) => setAssignPeopleList(newValue)}
          label=""
        />
      )}

      <List
        handleDeleteAssignUser={handleDeleteAssignUser}
        handleChangeAssignUserPermission={handleChangeAssignUserPermission}
        assignPeopleList={assignPeopleList}
        creator={creator}
        isShowSelect={isShowSelect}
        isDisableRemoveUsers={isDisableRemoveUsers}
        disableRemoveYourself={disableRemoveYourself}
        currentUserId={currentUserId}
        isIncludeOwnerInAssignPeople={isIncludeOwnerInAssignPeople}
      />
    </Box>
  );
};

export default memo(GeneralShareEdit);
