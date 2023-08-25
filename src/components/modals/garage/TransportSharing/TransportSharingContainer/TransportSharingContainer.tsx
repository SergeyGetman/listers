import { Box } from '@mui/material';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import MuiSelect from '../../../../formElements/MuiSelect';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import useGetConnections from '../../../../../shared/hooks/useGetConnections';
import ShareListItem from '../../../../assignPeople/GeneralShareEdit/components/ListItem';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { shareTransport, unshareTransport } from '../../../../../store/garage/garageThunk';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { ReactComponent as AssignPeopleIcon } from '../../../../../assets/Images/sidebar/profile.svg';

import { GarageItemSharedUserModel } from '../../../../../shared/models/garage.model';
import router from '../../../../../shared/services/router';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type TransportShareForm = {
  users: any[];
};

type Props = { onClose: (isSkip?: boolean) => void; data?: GarageItemSharedUserModel[]; transportId: string };

// TODO need to fix backend
enum PermissionEnum {
  viewer = 'view',
  editor = 'edit',
  creator = 'owner',
}
// TODO need to fix backend
const permissionObj: { [key: string]: string } = {
  [AssignPeoplePermissionsEnum.viewer]: PermissionEnum.viewer,
  [AssignPeoplePermissionsEnum.editor]: PermissionEnum.editor,
  [AssignPeoplePermissionsEnum.creator]: PermissionEnum.creator,
};

const TransportSharingContainer: FC<Props> = ({ onClose, data, transportId }) => {
  const { t } = useTranslation();
  const profile = useAppSelector((state) => state.profile.data);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { control, watch, setValue, handleSubmit, reset } = useForm<TransportShareForm>({
    defaultValues: { users: [] },
  });

  const isEdit = useMemo(() => {
    if (data && profile.id) {
      // TODO fix backend permission
      const findUser = data.find((item) => item.id === profile.id);
      if (findUser) {
        return findUser.permission === 'owner';
      }
      return false;
    }
    return false;
  }, [data, profile]);

  const creator = useMemo(() => data?.find((item) => item.permission === 'owner'), [data]);

  const { connectionsLoading, connectionsOptions } = useGetConnections();

  const onSubmit = (form: TransportShareForm) => {
    if (transportId) {
      const newData = form.users.map((item) => ({
        id: item.id,
        permission: permissionObj[item.role] || '',
      })) as { id: number; permission: string }[];

      setLoading(true);
      dispatch(shareTransport({ id: +transportId, data: { users: newData } })).then((result) => {
        if (shareTransport.fulfilled.match(result)) {
          NotificationService.success('Success', 'Save');
          setLoading(false);
        }
      });
    }
  };

  const handleChangePermission = (userId: number, permission: string) => {
    setValue(
      'users',
      watch('users').map((item) => {
        if (item.id === userId) {
          return { ...item, role: permission };
        }
        return item;
      }),
    );
  };

  const handleDeleteUser = (userId: number) => {
    setValue(
      'users',
      watch('users').filter((item) => item.id !== userId),
    );
  };

  const handleUnShare = useCallback(() => {
    if (transportId) {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.confirmCancelSharing.title'),
          text: t('general.modals.confirmCancelSharing.text'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            dispatch(unshareTransport(+transportId)).then((result) => {
              if (unshareTransport.fulfilled.match(result)) {
                onClose(true);
                navigate(router.garage.path);
              }
            }),
        },
      });
    }
  }, [dispatch, transportId, navigate, onClose, t]);

  const modalMenu = useMemo(() => {
    return [
      {
        label: t('general.actionMenus.removeYourself'),
        callback: () => handleUnShare(),
      },
    ];
  }, [t, handleUnShare]);

  // TODO need to fix backend
  useEffect(() => {
    if (data) {
      if (isEdit) {
        reset({
          users: data
            .filter((item: any) => item.permission !== 'owner')
            .map((item) => ({
              ...item,
              label: item.full_name,
              value: item.id.toString(),
              role:
                item.permission === 'edit'
                  ? AssignPeoplePermissionsEnum.editor
                  : AssignPeoplePermissionsEnum.viewer,
            })),
        });
      } else {
        reset({
          users: data.map((item) => ({
            ...item,
            label: item.full_name,
            value: item.id.toString(),
            role:
              item.permission === 'edit'
                ? AssignPeoplePermissionsEnum.editor
                : AssignPeoplePermissionsEnum.viewer,
          })),
        });
      }
    }
  }, [data, isEdit, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <MuiDefaultDrawerHeader
          onClose={onClose}
          title={t('general.containers.sharing')}
          isEditMode={false}
          isShowHeaderMenu={isEdit === false}
          headerMenuList={modalMenu}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ p: '20px 10px 50px 10px' }}>
            {isEdit && (
              <Controller
                name="users"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    {...field}
                    isSearchable
                    isMulti
                    isClearable
                    isShowAvatarInOptions
                    startIcon={<AssignPeopleIcon sx={{ svg: { width: '20px' } }} />}
                    controlShouldRenderValue={false}
                    placeholder={t('general.placeholders.selectAMember')}
                    isLoading={connectionsLoading}
                    options={connectionsOptions.map((item) => ({
                      ...item,
                      role: 'viewer',
                    }))}
                    label={t('general.fieldNames.selectAMemberToShareWith')}
                    isError={!!fieldState?.error?.message}
                    helpText={fieldState?.error?.message}
                  />
                )}
              />
            )}

            <Box sx={{ mt: isEdit ? '30px' : 0 }}>
              {watch('users').map((item) => (
                <ShareListItem
                  handleChangeAssignUserPermission={(user, permission) =>
                    handleChangePermission(user.id, permission)
                  }
                  handleDeleteAssignUser={(userId) => handleDeleteUser(userId)}
                  item={item}
                  disableRemoveYourself
                  creatorId={creator?.id || 0}
                  currentUserId={profile.id}
                />
              ))}
            </Box>
          </Box>
        </Box>
        {isEdit && (
          <ModalFooter
            isShow
            middleBtnProps={{
              color: 'primary',
              isShow: true,
              label: t('general.buttons.cancel'),
              onClick: () => onClose(),
            }}
            rightBtnProps={{
              isLoadingBtn: true,
              isStopPropagation: false,
              isShow: true,
              loading,
              label: t('general.buttons.save'),
              variant: 'contained',
              type: 'submit',
            }}
          />
        )}
      </Box>
    </form>
  );
};

export default TransportSharingContainer;
