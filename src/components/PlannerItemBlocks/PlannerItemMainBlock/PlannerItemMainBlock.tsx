import React, { FC, memo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Moment from 'moment';
import Linkify from 'react-linkify';
import { PlannerItemPriorityEnum } from '../../../shared/enums/plannerItemPriority.enum';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
import { plannerItemPriorityConfig } from '../../../shared/configs/plannerItemPriority.config';
import PlannerItemStatusesView from '../../plannerItemStatuses/PlannerItemStatusesView';
import { PaperActionMenuItemModel } from '../../../shared/models/paperActionMenuItem.model';
import PaperActionMenu from '../../actionMenus/PaperActionMenu';
import { PlannerItemModelTypeEnum } from '../../../shared/enums/plannerItemModelType.enum';
import PlannerItemMainBlockContent from './PlannerItemMainBlockContent';
import {
  PlannerItemMainBlockContainer,
  PlannerItemMainBlockContentContainer,
  PlannerItemRecurringIcon,
} from './PlannerItemMainBlock.style';

type PlannerItemMainBlockProps = {
  description?: string;
  title: string;
  dueDate?: string;
  isLate?: boolean;
  priority?: PlannerItemPriorityEnum | null;
  status: PlannerItemStatusesEnum;
  currentStatus: PlannerItemStatusesEnum;
  isMobileDisplay: boolean;
  isShowPriority?: boolean;
  icon: any;
  iconColor: string;
  modelType?: PlannerItemModelTypeEnum;
  isAllDay?: boolean;
  isShowDueDate?: boolean;
  isRecurring?: boolean;
  containerDate?: string;
  site?: string;
  address?: string;
  phone?: string;
  location?: google.maps.LatLng | google.maps.LatLngLiteral;
  statusMenu: {
    item: PaperActionMenuItemModel;
    callback: () => void;
    disableCallback?: () => void;
    isDisabled?: boolean;
    tooltipTitle?: string;
  }[];
};

const PlannerItemMainBlock: FC<PlannerItemMainBlockProps> = ({
  description,
  dueDate,
  isLate,
  title,
  priority,
  status,
  isMobileDisplay,
  isShowPriority,
  icon,
  isShowDueDate,
  statusMenu,
  currentStatus,
  iconColor,
  containerDate,
  isAllDay,
  isRecurring,
  site,
  location,
  address,
  modelType,
  phone,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const priorityItem = priority ? plannerItemPriorityConfig[priority] : plannerItemPriorityConfig.none;

  return (
    <PlannerItemMainBlockContainer>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: 'calc( 100% - 80px)' }}>
          <Box
            sx={{
              mr: '7px',
              position: 'relative',
            }}
          >
            {isRecurring && (
              <PlannerItemRecurringIcon className="planner-item-recurring-icon">
                <AutorenewIcon />
              </PlannerItemRecurringIcon>
            )}
            <Box
              sx={{
                svg: {
                  width: '16px',
                  height: '16px',
                  path: {
                    fill: iconColor,
                  },
                },
              }}
            >
              {icon}
            </Box>
          </Box>
          <Typography noWrap sx={{ mr: '7px' }} variant="default_bolt">
            {title}
          </Typography>
          {isShowPriority && (
            <Box
              sx={{
                svg: {
                  width: '16px',
                  height: '16px',
                },
              }}
            >
              <priorityItem.icon sx={{ color: priorityItem.iconColor }} />
            </Box>
          )}
        </Box>
        {isShowDueDate && (
          <Typography
            noWrap
            sx={{
              ml: '10px',
              flexShrink: '0',
              color: isLate ? theme.palette.case.warning.high : theme.palette.case.contrast.black,
            }}
            variant="extra_small"
          >
            {`${t('general.fieldNames.due')} ${
              Moment(containerDate ? containerDate : '').format('YYYY-MM-DD') ===
              Moment.utc(dueDate, 'YYYY-MM-DD').local().format('YYYY-MM-DD')
                ? isAllDay
                  ? t('general.fieldNames.allDay')
                  : Moment.utc(dueDate, 'YYYY-MM-DD HH:mm:ss').local().format('hh:mm A')
                : Moment.utc(dueDate, 'YYYY-MM-DD HH:mm:ss').local().format('MM/DD/YY')
            }`}
          </Typography>
        )}
      </Box>
      {(isMobileDisplay || phone || description || site || (address && location)) && (
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
          <PlannerItemMainBlockContentContainer>
            {modelType === PlannerItemModelTypeEnum.event ? (
              <PlannerItemMainBlockContent
                site={site}
                location={location}
                address={address}
                description={description}
                phone={phone}
              />
            ) : (
              <>
                {description ? (
                  <Typography
                    noWrap
                    sx={{
                      width: ' 100%',
                    }}
                    variant="default"
                  >
                    {description ? parse(description) : 'N/A'}
                  </Typography>
                ) : site ? (
                  <Typography
                    noWrap
                    sx={{
                      width: ' 100%',
                    }}
                    variant="default"
                  >
                    <Linkify
                      componentDecorator={(decoratedHref, decoratedText, key) => (
                        <a onClick={(e) => e.stopPropagation()} target="blank" href={decoratedHref} key={key}>
                          {decoratedText}
                        </a>
                      )}
                    >
                      {site}
                    </Linkify>
                  </Typography>
                ) : address && location?.lat ? (
                  <Typography
                    noWrap
                    sx={{
                      width: ' 100%',
                    }}
                    variant="default"
                  >
                    <a
                      target="blank"
                      onClick={(e) => e.stopPropagation()}
                      href={`http://maps.google.com/maps?q=loc:${location?.lat},${location?.lng}`}
                    >
                      {address}
                    </a>
                  </Typography>
                ) : phone ? (
                  <Typography
                    noWrap
                    sx={{
                      width: '100%',
                    }}
                    variant="default"
                  >
                    <a href={`tel:${phone}`}>{phone}</a>
                  </Typography>
                ) : (
                  <Typography
                    noWrap
                    sx={{
                      width: ' 100%',
                    }}
                    variant="default"
                  >
                    N/A
                  </Typography>
                )}
              </>
            )}
          </PlannerItemMainBlockContentContainer>
          {isMobileDisplay && (
            <Box sx={{ ml: '10px' }}>
              <PaperActionMenu menuList={statusMenu} activeItem={currentStatus}>
                <PlannerItemStatusesView size="medium" variant={status} />
              </PaperActionMenu>
            </Box>
          )}
        </Box>
      )}
    </PlannerItemMainBlockContainer>
  );
};

export default memo(PlannerItemMainBlock);
