import React, { FC } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ModalHeader from '../../../../headers/ModalHeader';
import CreateVariantItemCard from '../../../../itemCards/CreateVariantItemCard';

type Props = {
  onClose: () => void;
  itemList: {
    item: { label: string; id: string; icon?: any };
    callback: () => void;
  }[];
};

const ModalContent: FC<Props> = ({ onClose, itemList }) => {
  const { t } = useTranslation();

  return (
    <>
      <ModalHeader title={t('general.add', { item: t(`general.item`) })} onClose={onClose} />
      <Box
        sx={{
          width: '100%',
          padding: '16px',
        }}
      >
        {itemList?.map((element) => (
          <CreateVariantItemCard key={element.item.id} callback={element.callback} item={element.item} />
        ))}
      </Box>
    </>
  );
};

export default ModalContent;
