import React, { FC } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactComponent as ArrowRight } from '../../../assets/Images/arrow-right.svg';
import { ReactComponent as CrownPremium } from '../../../assets/Images/crowns/CrownPlatinumSmall.svg';
import {
  CreateVariantRightIconContainer,
  CreateVariantItemContainer,
  CreateVariantItemIconContainer,
} from './CreateVariantItemCard.style';
import { VariantItemContainerV2, VariantItemIconContainerV2 } from './CreateVariantItemCardV2.style';
import { Version } from '../../stubs/StubWithCreateVariants/StubWithCreateVariants';

type CreateVariantItemProps = {
  item: {
    label: string;
    id: string;
    icon?: any;
    backgroundCardColor?: string;
    hoverBackgroundCardColor?: string;
  };

  callback: () => void;
  subtitle?: string | null;
  version?: Version;
  isPlatinum?: boolean | null;
};

const CreateVariantItemCard: FC<CreateVariantItemProps> = ({
  item,
  callback,
  version = 'v1',
  subtitle = null,
  isPlatinum = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  function renderSwitchVersion(versions: Version) {
    switch (versions) {
      case 'v1':
        return (
          <CreateVariantItemContainer
            hoverBackground={item.hoverBackgroundCardColor}
            background={item.backgroundCardColor}
            onClick={callback}
          >
            <CreateVariantItemIconContainer className="variant-icon-container">
              {item.icon ? <item.icon /> : <></>}
            </CreateVariantItemIconContainer>
            <Typography
              variant="s2"
              sx={{ color: theme.palette.case.neutral.n700 }}
              dangerouslySetInnerHTML={{ __html: item?.label }}
            />
            <CreateVariantRightIconContainer>
              <ArrowRight />
            </CreateVariantRightIconContainer>
          </CreateVariantItemContainer>
        );
      case 'v2':
        return (
          <VariantItemContainerV2 onClick={callback}>
            <VariantItemIconContainerV2 className="variant-icon-container">
              {item.icon ? <item.icon /> : <></>}
            </VariantItemIconContainerV2>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant={isMobile ? 't14m' : 's2'} sx={{ color: theme.palette.case.neutral.n700 }}>
                {item?.label}
              </Typography>
              {subtitle !== null && (
                <Typography
                  variant={isMobile ? 't12r' : 't14r'}
                  sx={{ color: theme.palette.case.neutral.n600, textAlign: 'start' }}
                >
                  {subtitle}
                </Typography>
              )}
              {!isPlatinum && (
                <Box position="absolute" right="12px" top="22px">
                  <CrownPremium />
                </Box>
              )}
            </Box>
          </VariantItemContainerV2>
        );
      default: {
        return 'v1';
      }
    }
  }

  return <>{renderSwitchVersion(version)}</>;
};

export default CreateVariantItemCard;
