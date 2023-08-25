import React, { FC, useState } from 'react';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { MediaType } from '../../../../../../shared/models/media.model';
import { DocumentsEntityTypeEnum } from '../../../../../../shared/enums/documentEntityType.enum';
import { PlannerItemNavigationEnum } from '../../../../../../shared/enums/plannerItemNavigation.enum';
import { plannerItemNavigationConfig } from '../../../../../../shared/configs/plannerItemNavigation.config';
import PlannerItemNavigationPanel from '../../../../../modalsElements/components/PlannerItemNavigationPanel';
import PlannerItemAttachments from '../../../../../modalsElements/components/PlannerItemAttachments';
import PlannerItemLocation from '../../../../../modalsElements/components/PlannerItemLocation';
import PlannerItemChecklists from '../../../../../modalsElements/components/PlannerItemChecklists';
import PlannerItemNotes from '../../../../../modalsElements/components/PlannerItemNotes';

type EditTaskModalTabsContainerProps = {
  attachments: MediaType[];
  handleAddAttachment: (files: MediaType[]) => void;
  entityType: DocumentsEntityTypeEnum;
  control: Control<any>;
  entityId: number;
};
const EditTaskModalTabsContainer: FC<EditTaskModalTabsContainerProps> = ({
  attachments,
  handleAddAttachment,
  entityType,
  control,
  entityId,
}) => {
  const { t } = useTranslation();
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
      item: plannerItemNavigationConfig[PlannerItemNavigationEnum.location],
    },
    {
      item: plannerItemNavigationConfig[PlannerItemNavigationEnum.notes],
    },
    {
      item: plannerItemNavigationConfig[PlannerItemNavigationEnum.checklists],
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
        <TabPanel sx={{ height: '100%', p: '0' }} value={PlannerItemNavigationEnum.location}>
          <PlannerItemLocation placeholder={t('general.placeholders.enter_location')} control={control} />
        </TabPanel>
        <TabPanel sx={{ height: '100%', p: '0' }} value={PlannerItemNavigationEnum.checklists}>
          <PlannerItemChecklists isCanEdit entityId={entityId} />
        </TabPanel>
        <TabPanel sx={{ height: '100%', p: '0' }} value={PlannerItemNavigationEnum.notes}>
          <PlannerItemNotes isCanEdit entityId={entityId} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default EditTaskModalTabsContainer;
