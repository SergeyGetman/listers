import React, { FC } from 'react';
import { Box } from '@mui/material';
import AvatarContainer from '../../avatars/AvatarContainer';
import BaseActionMenu from '../../actionMenus/BaseActionMenu';
import { ActionMenuListModel } from '../../../shared/models/actionMenuList.model';
import { FlexContainer, NetworkUserCardContainer, TextContainer } from './NetworkCard.style';

type Props = {
  actionMenuList?: ActionMenuListModel | null;
  firstName: string;
  lastName: string;
  avatar: string;
  id: number;
  isActiveCard: boolean;
  company?: string | null;
  children?: React.ReactElement;
};
const NetworkCard: FC<Props> = ({
  actionMenuList,
  firstName,
  lastName,
  company,
  avatar,
  id,
  children,
  isActiveCard,
}) => {
  return (
    <NetworkUserCardContainer isActive={isActiveCard} key={id}>
      <FlexContainer>
        <AvatarContainer
          variant="circular"
          firstName={firstName}
          lastName={lastName}
          src={avatar}
          id={id}
          size="medium"
        />
        <Box sx={{ ml: '10px' }}>
          <Box>
            <TextContainer variant="t14r">
              {firstName} {lastName}
            </TextContainer>
          </Box>
          <TextContainer variant="t12r">{company}</TextContainer>
        </Box>
      </FlexContainer>
      <FlexContainer>
        {children}
        {actionMenuList && <BaseActionMenu menuList={actionMenuList} />}
      </FlexContainer>
    </NetworkUserCardContainer>
  );
};

export default NetworkCard;
