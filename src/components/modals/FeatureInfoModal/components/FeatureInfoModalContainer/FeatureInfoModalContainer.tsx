import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@mui/material';
import { OrganizersEnum } from '../../../../../shared/enums/organizers.enum';
import { getFeaturesModalConfig } from '../../../../../shared/configs/featuresInfoModal.config';
import FeatureInfoModalBlock from '../FeatureInfoModalBlock';
import FeatureInfoModalHeader from '../FeatureInfoModalHeader/FeatureInfoModalHeader';
import FeatureInfoModalFooter from '../FeatureInfoModalFooter/FeatureInfoModalFooter';
import { ModalContainer, ModalContentContainer } from './FeatureInfoModalContainer.style';
import { ModalFooterBtnModel } from '../../footerModalBtn.model';

type FeatureInfoModalContainerProps = {
  type: OrganizersEnum;
  onClose: () => void;
  rightBtnProps: ModalFooterBtnModel;
};
const FeatureInfoModalContainer: FC<FeatureInfoModalContainerProps> = ({ type, onClose, rightBtnProps }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  const item = getFeaturesModalConfig(t, isMobileDisplay).find((i: any) => i.type === type);

  return (
    <ModalContainer>
      {item ? (
        <>
          <FeatureInfoModalHeader onClose={onClose} title={item.label} />
          <ModalContentContainer>
            {item.items?.map((hub: { description: string; img?: any; title?: string }, index: number) => (
              <FeatureInfoModalBlock
                title={hub.title}
                description={hub.description}
                img={hub.img}
                key={index}
              />
            ))}
          </ModalContentContainer>
          <FeatureInfoModalFooter rightBtnProps={rightBtnProps} onClose={onClose} />
        </>
      ) : (
        <></>
      )}
    </ModalContainer>
  );
};

export default FeatureInfoModalContainer;
