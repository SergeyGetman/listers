import React, { FC, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PaperActionMenu from '../../actionMenus/PaperActionMenu';
import { PaperActionMenuItemModel } from '../../../shared/models/paperActionMenuItem.model';
import { AssignPeoplePermissionsEnum } from '../../../shared/enums/assignPeoplePermissions.enum';

type AssignPeoplePermissionsMenuProps = {
  selectedPermissionsItem: PaperActionMenuItemModel & { id: AssignPeoplePermissionsEnum };
  menu: {
    item: PaperActionMenuItemModel;
    callback: () => void;
    disableCallback?: () => void;
    isDisabled?: boolean;
    tooltipTitle?: string;
  }[];
};
const AssignPeoplePermissionsMenu: FC<AssignPeoplePermissionsMenuProps> = ({
  menu,
  selectedPermissionsItem,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const theme = useTheme();

  return (
    <PaperActionMenu
      isSmall
      onChangeMenuState={setIsOpenMenu}
      activeItem={selectedPermissionsItem.id}
      menuList={menu}
    >
      <Box
        sx={{
          display: 'flex',
          cursor: 'pointer',
          alignItems: 'center',
          svg: { width: '16px', height: '16px', path: { fill: theme.palette.case.neutral.n500 } },
        }}
      >
        <Typography sx={{ m: '0 5px', color: theme.palette.case.neutral.n800 }} variant="t12r">
          {selectedPermissionsItem.label}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            transform: isOpenMenu ? 'rotate(180deg)' : '',
            transition: '0.3s',
          }}
        />
      </Box>
    </PaperActionMenu>
  );
};

export default AssignPeoplePermissionsMenu;
