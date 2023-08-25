import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { getSidebarConfig } from '../../sidebarConfig';
import { useAppSelector } from '../../../../../../shared/hooks/redux';
import router from '../../../../../../shared/services/router';
import MuiLinkButton from '../../../../../buttons/MuiLinkButton';

type SidebarListItemProps = {
  handleCloseSidebar: () => void;
  isSmallDisplay: boolean;
  provided: DraggableProvided;
  snapshotProvided: DraggableStateSnapshot;
  itemId: any;
};
const SidebarListItem: FC<SidebarListItemProps> = ({
  itemId,
  handleCloseSidebar,
  snapshotProvided,
  isSmallDisplay,
  provided,
}) => {
  const { t } = useTranslation();
  const item = getSidebarConfig(t)[itemId];
  const resolved = useResolvedPath(item?.to);
  const match = useMatch({ path: resolved?.pathname, end: false });
  const theme = useTheme();
  const networkSelectedFilterType = useAppSelector(({ network }) => network?.network?.networkFilterType);
  return item?.label ? (
    <MuiLinkButton>
      <Box
        sx={{ flexShrink: 0 }}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
        ref={provided.innerRef}
      >
        <Link
          style={{
            textDecoration: 'none',
            flexShrink: 0,
          }}
          to={
            item?.to?.includes(`${router.network.path}`)
              ? `${item?.to}/${networkSelectedFilterType}`
              : item?.to
          }
          onClick={() => (isSmallDisplay ? handleCloseSidebar() : true)}
        >
          <Box
            sx={{
              mb: '4px',
              display: 'flex',
              alignItems: 'center',
              height: '36px',
              svg: {
                width: '20px',
                height: '20px',
                flexShrink: '0',
                path: {
                  fill: !!match ? (item.color ? item.color : theme.palette.case.neutral.n900) : '',
                },
              },
              backgroundColor: snapshotProvided.isDragging || !!match ? theme.palette.case.neutral.n200 : '',
              padding: '0px 8px 0px 8px',
              gap: '8px',
              borderRadius: '4px',
              color: !!match
                ? item.color
                  ? item.color
                  : theme.palette.case.neutral.n900
                : theme.palette.case.neutral.n700,
              '&:hover': {
                backgroundColor: theme.palette.case.neutral.n200,
                color: !!match
                  ? item.color
                    ? item.color
                    : theme.palette.case.neutral.n900
                  : item.color
                  ? item.color
                  : theme.palette.case.neutral.n700,
                svg: {
                  path: {
                    fill: item.color ? item.color : '',
                  },
                },
              },
            }}
          >
            <item.icon />
            <Typography
              sx={{
                whiteSpace: 'nowrap',
              }}
              variant="default"
            >
              {item.label}
            </Typography>
          </Box>
        </Link>
      </Box>
    </MuiLinkButton>
  ) : (
    <></>
  );
};

export default SidebarListItem;
