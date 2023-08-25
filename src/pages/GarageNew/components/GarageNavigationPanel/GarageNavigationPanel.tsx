import React from 'react';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import MuiButton from '../../../../components/buttons/MuiButton';
import ChipsActionMenu from '../../../../components/actionMenus/ChipsActionMenu/ChipsActionMenu';
import { getGarageAddItemsConfig } from '../../../../shared/configs/hubs/garage/garageAddItems.config';
import { GarageTransportTypeEnum } from '../../../../shared/enums/hubs/garage/garageTransportType.enum';
import modalObserver from '../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';

const GarageNavigationPanel = () => {
  const { t } = useTranslation();
  const garageAddItemConfig = getGarageAddItemsConfig(t);
  const menuList = [
    {
      item: garageAddItemConfig[GarageTransportTypeEnum.car],
      callback: () =>
        modalObserver.addModal(ModalNamesEnum.createGarageItem, {
          props: { type: GarageTransportTypeEnum.car },
        }),
    },
    {
      item: garageAddItemConfig[GarageTransportTypeEnum.motorcycle],
      callback: () =>
        modalObserver.addModal(ModalNamesEnum.createGarageItem, {
          props: { type: GarageTransportTypeEnum.motorcycle },
        }),
    },
    {
      item: garageAddItemConfig[GarageTransportTypeEnum.custom],
      callback: () =>
        modalObserver.addModal(ModalNamesEnum.createGarageItem, {
          props: { type: GarageTransportTypeEnum.custom },
        }),
    },
  ];

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      <ChipsActionMenu menuList={menuList}>
        <MuiButton isStopPropagation={false} label="Add" variant="contained" endIcon={<AddIcon />} />
      </ChipsActionMenu>
    </Box>
  );
};

export default GarageNavigationPanel;
