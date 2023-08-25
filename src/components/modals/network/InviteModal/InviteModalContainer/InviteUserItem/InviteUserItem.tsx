import React, { FC, memo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  InviteUserItemContainer,
  InviteUserItemContent,
  InviteUserItemSelectContainer,
} from './InviteUserItem.style';
import SelectRole from '../../../../../formElements/SelectRole';
import { InviteUser } from '../../../../../../shared/models/network';
import MuiButton from '../../../../../buttons/MuiButton';
import MuiSquareButton from '../../../../../buttons/MuiSquareButton';
import AvatarContainer from '../../../../../avatars/AvatarContainer';

type Props = {
  user: InviteUser;
  handleChangeRole: (id: number, role: string) => void;
  handleSendInvite: (user: InviteUser) => void;
};

const InviteUserItem: FC<Props> = ({ user, handleChangeRole, handleSendInvite }) => {
  const { t } = useTranslation();
  const themed = useTheme();

  const isSmallDisplay = useMediaQuery(themed.breakpoints.down('sm'));

  return (
    <InviteUserItemContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <AvatarContainer
          firstName={user.first_name}
          lastName={user.last_name}
          id={user.id}
          src={user.avatar?.additional_info?.size_urls?.avatar_icon || user.avatar?.url || ''}
        />
        <Typography sx={{ m: '0 10px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {user.first_name} {user.last_name}
        </Typography>
      </Box>
      <InviteUserItemContent>
        <InviteUserItemSelectContainer>
          <SelectRole
            placeholder={t('general.placeholders.select_role')}
            onChange={(role) => handleChangeRole(user.id, role)}
            value={user.selectedRole || ''}
          />
        </InviteUserItemSelectContainer>

        {isSmallDisplay ? (
          <Box sx={{ marginRight: '3px' }}>
            <MuiSquareButton
              onClick={() => handleSendInvite(user)}
              variant="contained"
              icon={<ControlPointIcon sx={{ color: 'white' }} />}
              isDisabled={user.isSendInvite || user.userLoading}
            />
          </Box>
        ) : (
          <Box sx={{ marginRight: '30px' }}>
            <MuiButton
              onClick={() => handleSendInvite(user)}
              label={t('general.buttons.invite')}
              size="small"
              isDisabled={user.isSendInvite || user.userLoading}
              variant="text"
              startIcon={<AddCircleRoundedIcon color="primary" />}
            />
          </Box>
        )}
      </InviteUserItemContent>
    </InviteUserItemContainer>
  );
};

export default memo(InviteUserItem);
