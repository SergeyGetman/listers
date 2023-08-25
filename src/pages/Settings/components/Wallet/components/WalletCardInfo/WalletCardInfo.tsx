import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PaymentCard from '../PaymentCard';
import MuiBaseAccordion from '../../../../../../components/accordions/MuiBaseAccordion';
import { ReactComponent as HubmeekLetter } from '../../../../../../assets/Images/hubbmeek/hubmeek-letter.svg';
import {
  WalletCardInfoContent,
  WalletCardInfoDescription,
  WalletCardInfoHubmeek,
} from './WalletCardInfo.style';
import { BankCardModel } from '../../../../../../shared/models/plans.model';

type Props = {
  card: BankCardModel | null;
  handleOpenPaymentModal: (isEdit: boolean) => void;
};

const WalletCardInfo: FC<Props> = ({ card, handleOpenPaymentModal }) => {
  const { t } = useTranslation();

  const menuList = useMemo(() => {
    let data = [
      {
        callback: () => handleOpenPaymentModal(true),
        isDisabled: false,
        label: t('general.actionMenus.edit'),
      },
    ];

    if (card) {
      data = [
        {
          callback: () => handleOpenPaymentModal(false),
          isDisabled: false,
          label: t('general.actionMenus.view'),
        },
        ...data,
      ];
    }
    return data;
  }, [card, handleOpenPaymentModal, t]);

  return (
    <MuiBaseAccordion
      infoTooltipText={t('wallet.tooltips.cardInfo')}
      isDefaultExpand
      isDisabledExpand
      label={t('general.containers.cardInformation')}
      menuList={menuList}
      isBoxShadow
    >
      <WalletCardInfoContent>
        <PaymentCard handleOpenPaymentModal={() => handleOpenPaymentModal(false)} card={card} />
        <WalletCardInfoDescription variant="default">
          {t('wallet.cardInfo.cardInfoDescription')}
        </WalletCardInfoDescription>
        <WalletCardInfoHubmeek>
          <HubmeekLetter />
        </WalletCardInfoHubmeek>
      </WalletCardInfoContent>
    </MuiBaseAccordion>
  );
};

export default WalletCardInfo;
