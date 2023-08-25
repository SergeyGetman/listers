import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Collapse } from '@mui/material';

import React, { FC, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';

import * as yup from 'yup';
import { ReactComponent as AssignPeopleIcon } from '../../../../assets/Images/assignPeople.svg';

import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { AssignPeopleChatModel } from '../../../../shared/models/assignPeopleSelectValue.model';
import { ItemUserModel } from '../../../../shared/models/itemUser.model';
import { NetworkUserModel } from '../../../../shared/models/network';
import { getFriends } from '../../../../store/Common/commonThunk';
import { networkShare } from '../../../../store/network/networkThunk';
import MuiSelect from '../../../formElements/MuiSelect';
import ModalFooter from '../../../modalsElements/containers/Footer/ModalFooter';
import MuiDefaultDrawerHeader from '../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import NetworkSharingUserItem from './NetworkSharingModalItem';
import {
  NetworkSharingModalContentContainer,
  NetworkSharingModalForm,
} from './NetworkSharingModalContainer.style';

type Props = {
  onClose: (value?: boolean) => void;
  user: NetworkUserModel;
  setIsShowUnsavedDataModal: (value: boolean) => void;
};

const initialValues = {
  users: [],
};

type FormTypes = {
  users: any[];
};

// TODO translate file

const schema = yup.object().shape({
  users: yup.array().test('users', function (value) {
    if (value?.length === 0) {
      return this.createError({
        // TODO need error text
        message: `Min 1 user`,
        path: this.path,
      });
    }
    return true;
  }),
});

const NetworkSharingModalContainer: FC<Props> = ({ onClose, user, setIsShowUnsavedDataModal }) => {
  const [friends, setFriends] = useState<AssignPeopleChatModel[]>([]);
  const profile = useAppSelector((state) => state.profile.data);
  const [isLoading, setIsLoading] = useState(true);

  const [submitLoading, setSubmitLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { isDirty },
  } = useForm<FormTypes>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (form: FormTypes) => {
    setSubmitLoading(true);
    dispatch(
      networkShare({ data: { users: form.users.map((item) => ({ id: item.id })) }, id: user.friend_id }),
    )
      .then((result) => {
        if (networkShare.fulfilled.match(result)) {
          onClose(true);
        }
      })
      .finally(() => setSubmitLoading(false));
  };

  const handleDeleteUser = (id: number) => {
    const newData = watch('users').filter((item) => item.id !== id);
    setValue('users', newData);
  };

  const setFriendsData = (data: ItemUserModel[]) => {
    const newData = data.map((item) => ({
      ...item,
      value: item.id,
      label: item.full_name || '',
    }));

    setFriends(newData);
  };

  const getFriendsData = useCallback(() => {
    dispatch(getFriends({ setLoading: (val) => setIsLoading(val) })).then((result) => {
      if (getFriends.fulfilled.match(result)) {
        setFriendsData(result.payload.filter((item) => item.id !== (profile.id as number)));
      }
    });
  }, [dispatch, profile]);

  useEffect(() => {
    setIsShowUnsavedDataModal(isDirty);
  }, [isDirty, setIsShowUnsavedDataModal]);

  useEffect(() => {
    getFriendsData();
    return () => {
      reset();
    };
  }, [getFriendsData, reset]);

  return (
    <NetworkSharingModalForm onSubmit={handleSubmit(onSubmit)}>
      <NetworkSharingModalContentContainer>
        <MuiDefaultDrawerHeader onClose={onClose} title="Sharing" />
        <Box sx={{ flexGrow: 1, p: '0 10px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ pt: '30px' }}>
              {/* // TODO do dirty  */}
              <Controller
                name="users"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    {...field}
                    isLoading={isLoading}
                    options={friends}
                    isMulti
                    isSearchable
                    isShowAvatarInOptions
                    startIcon={<AssignPeopleIcon sx={{ svg: { width: '20px' } }} />}
                    controlShouldRenderValue={false}
                    placeholder={t('general.placeholders.selectAMember')}
                    label="Select Member to share with"
                    isError={!!fieldState.error?.message}
                    helpText={fieldState.error?.message}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            </Box>

            <Box sx={{ overflowY: 'auto' }}>
              <TransitionGroup>
                {watch('users').map((item) => (
                  <Collapse key={item.id}>
                    <NetworkSharingUserItem
                      item={item}
                      profileId={profile.id as number}
                      onDelete={handleDeleteUser}
                    />
                  </Collapse>
                ))}
              </TransitionGroup>
            </Box>
          </Box>
        </Box>
        <ModalFooter
          isShow
          isShowSecurityInfo
          middleBtnProps={{
            isShow: true,
            label: t('general.buttons.cancel'),
            onClick: () => onClose(),
          }}
          rightBtnProps={{
            isShow: true,
            isStopPropagation: false,
            loading: submitLoading,
            label: t('general.buttons.save'),
            variant: 'contained',
            isLoadingBtn: true,
            type: 'submit',
          }}
        />
      </NetworkSharingModalContentContainer>
    </NetworkSharingModalForm>
  );
};

export default NetworkSharingModalContainer;
