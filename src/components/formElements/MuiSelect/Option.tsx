import React, { FC } from 'react';
import { Box } from '@mui/material';
import { OptionProps, components } from 'react-select';
import AvatarContainer from '../../avatars/AvatarContainer';
import { useSelectContext } from './SelectContext';
import { OptionType } from './types';
import { ItemUserModel } from '../../../shared/models/itemUser.model';
export const Option: FC<OptionProps<OptionType>> = (props) => {
  const { data, label } = props;
  const { id, first_name, last_name, avatar } = data as unknown as ItemUserModel;
  const avatar_icon = avatar?.additional_info?.size_urls?.avatar_icon;
  const avatar_url = avatar?.url;
  const { isShowAvatarInOptions } = useSelectContext();

  return (
    <components.Option {...props}>
      {isShowAvatarInOptions ? (
        <>
          <Box sx={{ mr: '10px' }}>
            <AvatarContainer
              id={id}
              firstName={first_name}
              lastName={last_name}
              isOwner={false}
              size="small"
              src={avatar_icon || avatar_url || ''}
            />
          </Box>
          {label}
        </>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {data.icon && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: '8px',
              }}
            >
              <data.icon />
            </Box>
          )}
          {label}
        </Box>
      )}
    </components.Option>
  );
};
