import React, { FC } from 'react';
import { Link, useLocation, useMatch, useResolvedPath } from 'react-router-dom';
import { Badge, Fade, useTheme } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import MuiChip from '../../../../../MuiChip';
import { SidebarItemContainer, SidebarItemLabel } from './SidebarItem.style';
import router from '../../../../../../shared/services/router';
import MuiLinkButton from '../../../../../buttons/MuiLinkButton';
import { useAppSelector } from '../../../../../../shared/hooks/redux';

type SidebarProps = {
  isSmallDisplay: boolean;
  handleCloseSidebar: () => void;
  to: string;
  children: React.ReactNode;
  label: string;
  isOpen?: boolean;
  bgColor: string;
  isLiteBackground?: boolean;
  budge?: string | number;
};

const SidebarItem: FC<SidebarProps> = ({
  isSmallDisplay,
  handleCloseSidebar,
  to,
  children,
  label,
  isOpen,
  bgColor,
  isLiteBackground,
  budge,
}) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: to.length === 1 });
  const theme = useTheme();
  const location = useLocation();
  const networkSelectedFilterType = useAppSelector(({ network }) => network?.network?.networkFilterType);
  return (
    <MuiLinkButton>
      <Link
        style={{
          textDecoration: 'none',
          width: isOpen ? 160 : 46,
          height: 43,
          flexShrink: 0,
        }}
        to={to.includes(`${router.network.path}`) ? `${to}/${networkSelectedFilterType}` : to}
        onClick={() => (isSmallDisplay ? handleCloseSidebar() : true)}
      >
        <SidebarItemContainer
          isOpen={isOpen}
          isMatch={
            // TODO change rout structure for network page
            !!match
              ? !!match
              : to.includes(`${router.network.path}`) &&
                location?.pathname?.includes(`${router.network.path}`)
          }
          isLiteBackground={isLiteBackground}
          bgColor={bgColor}
        >
          <Badge
            invisible={isOpen || !budge}
            color="error"
            variant="dot"
            sx={{
              '& .MuiBadge-badge': {
                width: '10px',
                height: '10px',
                border: `1px solid ${theme.palette.case.contrast.white} `,
                borderRadius: '50%',
                right: '3px',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: '32px',
              }}
            >
              {children}
            </ListItemIcon>
          </Badge>
          <Fade in={isOpen} timeout={400}>
            <SidebarItemLabel variant="small_bolt" isOpen={isOpen}>
              {label}
            </SidebarItemLabel>
          </Fade>

          {!!budge && <MuiChip isShow={isOpen} label={budge} />}
        </SidebarItemContainer>
      </Link>
    </MuiLinkButton>
  );
};

export default SidebarItem;
