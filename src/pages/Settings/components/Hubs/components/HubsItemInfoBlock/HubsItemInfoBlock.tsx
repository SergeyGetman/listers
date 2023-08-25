import React, { FC, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { HubsItemInfo } from './HubsItemInfoBlock.style';

type HubsItemInfoProps = {
  isComing?: boolean;
  [x: string]: any;
};

const HubsItemInfoBlock: FC<HubsItemInfoProps> = ({ isComing, ...args }) => {
  const { t } = useTranslation();
  const getInfo = useMemo(() => {
    if (args?.expired_at && args?.canceled_at && !isComing && !args.is_in_package) {
      return (
        <HubsItemInfo>
          <Typography variant="extra_small">
            {t('hubs.infoBlock.activeUntil')}
            {moment.utc(args.expired_at).local().format(' MMM DD')}
          </Typography>{' '}
        </HubsItemInfo>
      );
    }

    return <></>;
  }, [args?.canceled_at, args?.expired_at, isComing, t, args.is_in_package]);

  return <Box> {getInfo}</Box>;
};

export default HubsItemInfoBlock;
