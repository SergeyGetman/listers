import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import { HeaderTitleContainer, HeaderTittleItem } from './HeaderTitle.style';
import { ReactComponent as RightArrow } from '../../../../../assets/Images/right-arrow.svg';
import { BreadcrumbsModel } from '../../../../../shared/models/breadcrumbs.model';
import IconButton from '../../../../buttons/IconButton';

type HeaderTitleProps = {
  breadcrumbs: BreadcrumbsModel;
  isShowHideNavigationBtn?: boolean;
  handleHideNavigationPanel?: (value: boolean) => void;
  isShowNavigationPanel?: boolean;
  isMobileDisplay: boolean;
};
const HeaderTittle: FC<HeaderTitleProps> = ({
  breadcrumbs,
  isShowHideNavigationBtn,
  handleHideNavigationPanel,
  isShowNavigationPanel,
  isMobileDisplay,
}) => {
  const theme = useTheme();
  return (
    <HeaderTitleContainer>
      {breadcrumbs?.map((item) => (
        <HeaderTittleItem key={item.title}>
          {item.href ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link to={item.href}>
                <Typography variant={isMobileDisplay ? 'default_bolt' : 'large'}>{item.title}</Typography>
              </Link>
              <RightArrow />
            </Box>
          ) : (
            <Typography
              sx={{ color: breadcrumbs.length === 1 ? `${theme.palette.case.neutral.n800} !important` : '' }}
              variant={isMobileDisplay ? 'default_bolt' : 'large'}
            >
              {item.title}
            </Typography>
          )}
        </HeaderTittleItem>
      ))}
      {isShowHideNavigationBtn && (
        <IconButton
          onClick={() =>
            handleHideNavigationPanel ? handleHideNavigationPanel(!isShowNavigationPanel) : true
          }
          size="medium"
        >
          <KeyboardArrowDownIcon
            sx={{
              color: theme.palette.case.neutral.n500,
              transform: isShowNavigationPanel ? 'rotate(180deg)' : '',
              transition: '0.3s',
            }}
          />
        </IconButton>
      )}
    </HeaderTitleContainer>
  );
};

export default HeaderTittle;
