import React, { FC, useState } from 'react';
import { Box } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { PlannerItemNavigationEnum } from '../../../../../shared/enums/plannerItemNavigation.enum';
import { plannerItemNavigationConfig } from '../../../../../shared/configs/plannerItemNavigation.config';
import PlannerItemAttachments from '../../../../modalsElements/components/PlannerItemAttachments';
import { MediaType } from '../../../../../shared/models/media.model';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import PlannerItemChecklists from '../../../../modalsElements/components/PlannerItemChecklists';
import PlannerItemNotes from '../../../../modalsElements/components/PlannerItemNotes';
import PlannerItemNavigationPanel from '../../../../modalsElements/components/PlannerItemNavigationPanel';

type CreateEventModalTabsContainerProps = {
  attachments: MediaType[];
  handleAddAttachment: (files: MediaType[]) => void;
  entityType: DocumentsEntityTypeEnum;
};
const CreateEventModalTabsContainer: FC<CreateEventModalTabsContainerProps> = ({
  attachments,
  handleAddAttachment,
  entityType,
}) => {
  const [value, setValue] = useState<PlannerItemNavigationEnum>(PlannerItemNavigationEnum.attachments);
  const handleChange = (newValue: PlannerItemNavigationEnum) => {
    if (newValue !== value) {
      setValue(newValue);
    }
  };

  const navigationMenu = [
    {
      item: plannerItemNavigationConfig[PlannerItemNavigationEnum.attachments],
    },
    {
      item: plannerItemNavigationConfig[PlannerItemNavigationEnum.checklists],
    },
    {
      item: plannerItemNavigationConfig[PlannerItemNavigationEnum.notes],
    },
  ];

  return (
    <Box>
      <TabContext value={value}>
        <PlannerItemNavigationPanel tabs={navigationMenu} handleChange={handleChange} />
        <TabPanel sx={{ height: '100%', p: '0' }} value={PlannerItemNavigationEnum.attachments}>
          <PlannerItemAttachments
            attachments={attachments}
            handleAddAttachment={handleAddAttachment}
            entityType={entityType}
          />
        </TabPanel>
        <TabPanel sx={{ height: '100%', p: '0' }} value={PlannerItemNavigationEnum.checklists}>
          <PlannerItemChecklists isCreate isCanEdit />
        </TabPanel>
        <TabPanel sx={{ height: '100%', p: '0' }} value={PlannerItemNavigationEnum.notes}>
          <PlannerItemNotes isCanEdit isCreate />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default CreateEventModalTabsContainer;
