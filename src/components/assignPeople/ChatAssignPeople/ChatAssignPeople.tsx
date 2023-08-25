import { Box } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import MuiSelect from '../../formElements/MuiSelect';
import { ReactComponent as AssignPeopleIcon } from '../../../assets/Images/assignPeople.svg';
import { AssignPeopleChatModel } from '../../../shared/models/assignPeopleSelectValue.model';

type Props = {
  options: AssignPeopleChatModel[];
  value: AssignPeopleChatModel[];
  setAssignPeopleList: (newValue: AssignPeopleChatModel[]) => void;
  isLoading: boolean;
  isError: boolean;
  helpText?: string;
};

const ChatAssignPeople: FC<Props> = ({
  options,
  value,
  setAssignPeopleList,
  isLoading,
  isError,
  helpText,
}) => {
  const { t } = useTranslation();
  return (
    <Box>
      <MuiSelect
        value={value}
        isLoading={isLoading}
        isMulti
        isShowAvatarInOptions
        options={options}
        startIcon={<AssignPeopleIcon />}
        controlShouldRenderValue={false}
        placeholder={t('general.placeholders.selectAMember')}
        onChange={(newValue: AssignPeopleChatModel[]) => setAssignPeopleList(newValue)}
        label={t('general.fieldNames.inviteToGroupChat').toUpperCase()}
        isError={isError}
        helpText={helpText}
      />
    </Box>
  );
};

export default ChatAssignPeople;
