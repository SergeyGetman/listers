import React, { FC, ReactNode, useCallback } from 'react';
import { Box } from '@mui/material';
import {
  AvatarBox,
  BoxSubTitle,
  BoxTitle,
  BuisenesCardInfoText,
  BuisenesCardStyle,
  BuisenesCardText,
  DelBlock,
} from './BuisenesCardInfo.style';

import AvatarContainer from '../../components/avatars/AvatarContainer/AvatarContainer';
import LocationIcon from '../../assets/Images/location-icon.svg';
import ComputerIcon from '../../assets/Images/computer-icon.svg';
import LetterIcon from '../../assets/Images/mail-icon.svg';
import DelIcon from '../../assets/Images/newGarage/action-menu/Delete.svg';
import MuiPhoneNumberInputView from '../../components/formElements/MuiPhoneNumberInputView';
import { useAppDispatch } from '../../shared/hooks/redux';
import { removeDataAgencyItem, removeDataAgentItem } from '../../pages/GarageNew/store/garageSliceV2';

type IType = 'agent' | 'agency';

interface IBuisenesCardInfo {
  type: IType;
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  webSite: string;
  location: string;
  objId?: number;
  children?: ReactNode;
}

const BuisenesCardInfo: FC<IBuisenesCardInfo> = ({
  type,
  title,
  subtitle,
  phone,
  email,
  webSite,
  location,
  objId = 0,
  children,
}) => {
  const imagesBox = [
    { image: LocationIcon, alt: '', param: location },
    { image: ComputerIcon, alt: '', param: webSite },
    { image: LetterIcon, alt: '', param: email },
  ];

  const dispatch = useAppDispatch();

  const searchTypeOnCard = useCallback(
    (typeOn: IType, id: number) => {
      if (typeOn === 'agency') {
        dispatch(removeDataAgencyItem(id));
      }
      if (typeOn === 'agent') {
        dispatch(removeDataAgentItem(id));
      }
    },
    [dispatch],
  );

  return (
    <>
      <BuisenesCardStyle>
        <BuisenesCardText>
          <AvatarBox>
            <AvatarContainer id={objId} lastName={title} src="" firstName={subtitle} variant="rounded" />
          </AvatarBox>
          <BoxTitle>
            {title}
            <BoxSubTitle>{subtitle}</BoxSubTitle>
          </BoxTitle>
          <DelBlock onClick={() => searchTypeOnCard(type, objId)}>
            <img src={DelIcon} alt="" />
          </DelBlock>
        </BuisenesCardText>

        <BuisenesCardInfoText>
          <Box sx={{ margin: '5px' }}>
            <MuiPhoneNumberInputView
              content={phone}
              country={location}
              isShowPhoneIcon={false}
              isShowCopyBtn={false}
            />
          </Box>
          {imagesBox.map((obj, idx) => {
            return (
              <Box key={idx} sx={{ margin: '4px' }}>
                <img src={obj.image} alt={obj.alt} />

                <a href={obj.param}>{obj.param}</a>
              </Box>
            );
          })}
        </BuisenesCardInfoText>

        <div>{children}</div>
      </BuisenesCardStyle>
    </>
  );
};

export default BuisenesCardInfo;
