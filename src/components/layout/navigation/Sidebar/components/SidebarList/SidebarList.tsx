import React, { FC, memo, useMemo } from 'react';
import { Box, List, Fade } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import moment from 'moment';
import router from '../../../../../../shared/services/router';
import MuiButton from '../../../../../buttons/MuiButton';
import { PlansPricingItemEnum } from '../../../../../../shared/enums/plansPricingItem.enum';
import { ModalNamesEnum } from '../../../../../../shared/enums/modalNames.enum';
import modalObserver from '../../../../../../shared/utils/observers/modalObserver';

type SidebarListProps = {
  isOpen: boolean;
  currentPackageName: PlansPricingItemEnum;
  handleCloseSidebar: () => void;
  isSmallDisplay: boolean;
  isShowEvent?: boolean;
};

const SidebarList: FC<SidebarListProps> = ({
  isOpen,
  handleCloseSidebar,
  isSmallDisplay,
  currentPackageName,
  isShowEvent,
}) => {
  const isDiscount = useMemo(() => {
    return moment().toDate() < moment('14.02.2023', 'DD.MM.YYYY').toDate() && isShowEvent;
  }, [isShowEvent]);

  const handleOpenPromocodeEvent = () => {
    modalObserver.addModal(ModalNamesEnum.promocodeEvent, { props: {} });
  };

  return (
    <List
      dense
      sx={{
        display: 'flex',
        padding: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      {/* <Box> */}
      {/*  {sidebarConfig.topItems.map((item: SidebarConfigProps) => ( */}
      {/*    <Box key={item.id}> */}
      {/*      {item.isHub && item.hubId ? ( */}
      {/*        !!hubs?.[item.hubId]?.expired_at || */}
      {/*        !!hubs?.[item.hubId]?.is_in_package || */}
      {/*        (item?.secondHubId && !!hubs?.[item?.secondHubId]?.expired_at) || */}
      {/*        (item?.secondHubId && !!hubs?.[item?.secondHubId]?.is_in_package) ? ( */}
      {/*          <SidebarItem */}
      {/*            handleCloseSidebar={handleCloseSidebar} */}
      {/*            isSmallDisplay={isSmallDisplay} */}
      {/*            key={item.id} */}
      {/*            to={item.to} */}
      {/*            isOpen={isOpen} */}
      {/*            bgColor={item.bgColor} */}
      {/*            label={item.label} */}
      {/*            budge={getCounters(item.id)} */}
      {/*            isLiteBackground={item.isLiteBackground} */}
      {/*          > */}
      {/*            <item.icon /> */}
      {/*          </SidebarItem> */}
      {/*        ) : ( */}
      {/*          <></> */}
      {/*        ) */}
      {/*      ) : ( */}
      {/*        <SidebarItem */}
      {/*          handleCloseSidebar={handleCloseSidebar} */}
      {/*          isSmallDisplay={isSmallDisplay} */}
      {/*          key={item.id} */}
      {/*          to={item.to} */}
      {/*          isOpen={isOpen} */}
      {/*          bgColor={item.bgColor} */}
      {/*          label={item.label} */}
      {/*          budge={getCounters(item.id)} */}
      {/*          isLiteBackground={item.isLiteBackground} */}
      {/*        > */}
      {/*          <item.icon /> */}
      {/*        </SidebarItem> */}
      {/*      )} */}
      {/*    </Box> */}
      {/*  ))} */}

      {/*  <Box sx={{ pt: '3px' }}> */}
      {/*    <Fade in={isOpen && isShowHubsBtn} timeout={400}> */}
      {/*      <Box sx={{ ml: '2px', width: '160px' }}> */}
      {/*        <Link */}
      {/*          style={{ textDecoration: 'unset' }} */}
      {/*          to={`${router.settings.path}/${router.settings.children.hubs.path}`} */}
      {/*        > */}
      {/*          <MuiButton */}
      {/*            sx={{ fontSize: '13px' }} */}
      {/*            variant="contained" */}
      {/*            onClick={() => (isSmallDisplay ? handleCloseSidebar() : true)} */}
      {/*            isStopPropagation={false} */}
      {/*            fullWidth */}
      {/*            size="small" */}
      {/*            label={t('general.buttons.addHubs')} */}
      {/*          /> */}
      {/*        </Link> */}
      {/*      </Box> */}
      {/*    </Fade> */}
      {/*  </Box> */}
      {/* </Box> */}

      <Box>
        <Fade in={isDiscount && currentPackageName === PlansPricingItemEnum.starter && isOpen} timeout={400}>
          <Box sx={{ paddingBottom: '16px', margin: '8px 0 0 2px', width: '160px' }}>
            <MuiButton
              color="secondary"
              sx={{ fontSize: '13px' }}
              variant="contained"
              fullWidth
              startIcon={<FavoriteBorderIcon />}
              onClick={handleOpenPromocodeEvent}
              isStopPropagation={false}
              size="small"
              label="Get Discount"
            />
          </Box>
        </Fade>

        {currentPackageName !== PlansPricingItemEnum.premium && !isDiscount && (
          <Fade in={isOpen} timeout={400}>
            <Box sx={{ paddingBottom: '16px', margin: '8px 0 0 2px', width: '160px' }}>
              <Link
                style={{ textDecoration: 'unset' }}
                to={`${router.settings.path}/${router.settings.children.plans.path}`}
              >
                <MuiButton
                  sx={{ fontSize: '13px' }}
                  variant="contained"
                  fullWidth
                  onClick={() => (isSmallDisplay ? handleCloseSidebar() : true)}
                  isStopPropagation={false}
                  size="small"
                  label="Go Platinum"
                />
              </Link>
            </Box>
          </Fade>
        )}

        {/* <Box */}
        {/*  sx={{ */}
        {/*    borderTop: `1px solid ${theme.palette.case.neutral.n100}`, */}
        {/*  }} */}
        {/* > */}
        {/*  {sidebarConfig.bottomItems.map((item: SidebarConfigProps) => ( */}
        {/*    <SidebarItem */}
        {/*      handleCloseSidebar={handleCloseSidebar} */}
        {/*      isSmallDisplay={isSmallDisplay} */}
        {/*      to={item.to} */}
        {/*      key={item.id} */}
        {/*      isOpen={isOpen} */}
        {/*      bgColor={item.bgColor} */}
        {/*      label={item.label} */}
        {/*      budge={item.budge} */}
        {/*      isLiteBackground={item.isLiteBackground} */}
        {/*    > */}
        {/*      <item.icon /> */}
        {/*    </SidebarItem> */}
        {/*  ))} */}
        {/* </Box> */}
      </Box>
    </List>
  );
};
export default memo(SidebarList);
