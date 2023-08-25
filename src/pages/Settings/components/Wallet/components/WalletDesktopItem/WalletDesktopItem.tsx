import React, { FC } from 'react';
import { Box } from '@mui/material';
import MuiBaseMobileAccordion from '../../../../../../components/accordions/MuiBaseMobileAccordion';
import WalletDesktopItemHeader from './components/WalletDesktopItemHeader';
import WalletItemContent from '../WalletItemContent';
import { WalletItemModal } from '../../../../../../shared/models/wallet/walletItem.model';
type WalletDesktopItemProps = {
  item: WalletItemModal;
};
const WalletDesktopItem: FC<WalletDesktopItemProps> = ({ item }) => {
  return (
    <Box sx={{ maxWidth: '1000px' }}>
      <MuiBaseMobileAccordion
        isCustomHeader
        isDefaultExpand={false}
        isDefaultHeaderPadding={false}
        isBlurred={item.status === 'upcoming'}
        headerComponent={<WalletDesktopItemHeader item={item} />}
      >
        <WalletItemContent item={item} />
      </MuiBaseMobileAccordion>
    </Box>
  );
};

export default WalletDesktopItem;
