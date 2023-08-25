import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  BlockNearAtention,
  BlockOnClose,
  IConAiNotification,
  TitleBlockInsureNotification,
  TitleInsideBlock,
} from './AiNotificationScanInsurance.style';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { changeVisibleAiNotification } from '../../../pages/GarageNew/store/garageSliceV2';

interface IAiNotificationScanInsurance<T> {
  title: T;
  children?: React.ReactNode;
}

const AiNotificationScanInsurance: FC<IAiNotificationScanInsurance<string>> = ({ title, children }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <TitleBlockInsureNotification>
        <BlockNearAtention />
        <IConAiNotification>{children}</IConAiNotification>
        <TitleInsideBlock variant="t16r">{title}</TitleInsideBlock>
        <BlockOnClose onClick={() => dispatch(changeVisibleAiNotification(false))}>
          <CloseIcon />
        </BlockOnClose>
      </TitleBlockInsureNotification>
    </>
  );
};

export default AiNotificationScanInsurance;
