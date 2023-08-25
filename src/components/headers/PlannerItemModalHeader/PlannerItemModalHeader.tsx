import React, { FC } from 'react';
import { Box, Typography, Zoom } from '@mui/material';
import { PlannerItemModalHeaderContainer } from './PlannerItemModalHeader.style';
import { ModalCloseButtonContainer } from '../../modalsElements/containers/MuiModalDowngrade/MuiModalDowngrade.style';
import NavigationButton from '../../buttons/NavigationButton';
import TagPopover from '../../popovers/TagPopover';
import { TagsEnum } from '../../../shared/enums/tags.enum';
import TagItem from '../../popovers/TagPopover/components/TagItem';
import MuiTooltip from '../../MuiTooltip';
import { ReactComponent as CrownGold } from '../../../assets/Images/crown-gold.svg';
import { ReactComponent as CrownPlatinum } from '../../../assets/Images/crown-platinum.svg';
import BaseActionMenu from '../../actionMenus/BaseActionMenu';
import { ActionMenuListModel } from '../../../shared/models/actionMenuList.model';
import { PlannerItemPriorityEnum } from '../../../shared/enums/plannerItemPriority.enum';
import PriorityPopover from '../../popovers/PriorityPopover';
import PriorityItem from '../../popovers/PriorityPopover/components/PriorityItem';
type PlannerItemModalHeaderProps = {
  title: string;
  onClose: () => void;
  handleClickUpgradePackage?: () => void;
  isShowUpgradePackagesBtn?: boolean;
  tag?: TagsEnum | null;
  setTag?: (val: TagsEnum) => void;
  isEdit?: boolean;
  priority?: PlannerItemPriorityEnum | null;
  setPriority?: (val: PlannerItemPriorityEnum) => void;
  isUpgradeToGold?: boolean;
  headerMenuList?: ActionMenuListModel;
  isShowTag?: boolean;
  isShowPriority?: boolean;
};
const PlannerItemModalHeader: FC<PlannerItemModalHeaderProps> = ({
  onClose,
  title,
  isShowTag,
  tag = null,
  setTag,
  isShowPriority,
  priority = null,
  setPriority,
  isEdit,
  handleClickUpgradePackage,
  isShowUpgradePackagesBtn,
  isUpgradeToGold,
  headerMenuList,
}) => {
  return (
    <PlannerItemModalHeaderContainer>
      <Box display="flex" alignItems="center">
        {isShowTag &&
          (setTag && isEdit ? (
            <Box mr="8px">
              <TagPopover setTag={setTag} selectedTag={tag} />
            </Box>
          ) : (
            tag &&
            tag !== TagsEnum.none && (
              <Box mr="8px">
                <TagItem selectedTag={tag} />
              </Box>
            )
          ))}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h3">{title}</Typography>
          {isShowPriority && setPriority && isEdit ? (
            <Box ml="8px">
              <PriorityPopover setPriority={setPriority} selectedPriority={priority} />
            </Box>
          ) : (
            isShowPriority &&
            priority !== PlannerItemPriorityEnum.none && (
              <Box ml="8px">
                <PriorityItem selectedPriority={priority ?? PlannerItemPriorityEnum.none} />
              </Box>
            )
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {isShowUpgradePackagesBtn ? (
          <MuiTooltip color="dark" title="Upgrade">
            <Box
              onClick={() => (handleClickUpgradePackage ? handleClickUpgradePackage() : false)}
              sx={{
                mr: '14px',
                cursor: 'pointer',
                svg: {
                  width: '24px',
                  height: '24px',
                },
              }}
            >
              {isUpgradeToGold ? <CrownGold /> : <CrownPlatinum />}
            </Box>
          </MuiTooltip>
        ) : (
          <></>
        )}
        <Box>
          <Zoom in={!!headerMenuList}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <BaseActionMenu iconSize="large" menuList={headerMenuList || []} />
            </Box>
          </Zoom>
        </Box>
        <Box>
          <ModalCloseButtonContainer>
            <NavigationButton size="medium" type="exit" onClick={onClose} background="none" />
          </ModalCloseButtonContainer>
        </Box>
      </Box>
    </PlannerItemModalHeaderContainer>
  );
};

export default PlannerItemModalHeader;
