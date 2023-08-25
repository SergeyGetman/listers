import React, { FC } from 'react';
import MuiBaseMobileAccordion from '../../../../../../components/accordions/MuiBaseMobileAccordion';
import WalletItemContent from '../WalletItemContent';
import WalletMobileItemHeader from './components/WalletMobileItemHeader';
import { WalletItemModal } from '../../../../../../shared/models/wallet/walletItem.model';
type WalletMobileItemProps = {
  item: WalletItemModal;
};
const WalletMobileItem: FC<WalletMobileItemProps> = ({ item }) => {
  return (
    <MuiBaseMobileAccordion
      isCustomHeader
      isDefaultExpand={false}
      isDefaultHeaderPadding={false}
      isBlurred={item.status === 'upcoming'}
      headerComponent={<WalletMobileItemHeader item={item} />}
    >
      <WalletItemContent item={item} />
    </MuiBaseMobileAccordion>
  );
};

export default WalletMobileItem;
