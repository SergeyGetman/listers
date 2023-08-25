import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSidebarConfig } from '../../sidebarConfig';
import MuiLinkButton from '../../../../../buttons/MuiLinkButton';
import { SidebarEnum } from '../../../../../../shared/enums/sidebar.enum';
type SidebarContainerBtnProp = {
  handleCloseSidebar: () => void;
  isSmallDisplay: boolean;
  itemId: SidebarEnum;
};
const SidebarContainerBtn: FC<SidebarContainerBtnProp> = ({ handleCloseSidebar, isSmallDisplay, itemId }) => {
  const { t } = useTranslation();
  const item = getSidebarConfig(t)[itemId];

  const resolved = useResolvedPath(item?.to);
  const match = useMatch({ path: resolved?.pathname, end: item?.to?.length === 1 });
  const theme = useTheme();

  return item?.label ? (
    <MuiLinkButton>
      <Link
        style={{
          textDecoration: 'none',
          flexShrink: 0,
        }}
        to={item?.to}
        onClick={() => (isSmallDisplay ? handleCloseSidebar() : true)}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '20px',
            svg: {
              width: '16px',
              height: '16px',
              path: {
                fill: !!match ? theme.palette.case.neutral.n900 : '',
              },
            },
            backgroundColor: !!match ? theme.palette.case.neutral.n200 : '',
            padding: '0px 2px 0px 8px',
            gap: '8px',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: theme.palette.case.neutral.n200,
            },
          }}
        >
          <Typography
            sx={{ color: !!match ? theme.palette.case.neutral.n900 : theme.palette.case.neutral.n700 }}
            variant="label_middle"
          >
            {item.label}
          </Typography>
          {item.icon ? <item.icon /> : <></>}
        </Box>
      </Link>
    </MuiLinkButton>
  ) : (
    <></>
  );
};

export default SidebarContainerBtn;
