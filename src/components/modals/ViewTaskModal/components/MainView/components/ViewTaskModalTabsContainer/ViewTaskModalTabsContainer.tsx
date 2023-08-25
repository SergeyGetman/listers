import React, { FC, useState } from 'react';
import { Box } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import PlannerItemAttachments from '../../../../../../modalsElements/components/PlannerItemAttachments';
import PlannerItemChecklists from '../../../../../../modalsElements/components/PlannerItemChecklists';
import PlannerItemNotes from '../../../../../../modalsElements/components/PlannerItemNotes';
import PlannerItemNavigationPanel from '../../../../../../modalsElements/components/PlannerItemNavigationPanel';
import { PlannerItemNavigationEnum } from '../../../../../../../shared/enums/plannerItemNavigation.enum';
import { plannerItemNavigationConfig } from '../../../../../../../shared/configs/plannerItemNavigation.config';
import { DocumentsEntityTypeEnum } from '../../../../../../../shared/enums/documentEntityType.enum';
import { MediaType } from '../../../../../../../shared/models/media.model';
import LocationView from '../../../../../../locations/LocationView';
import PlannerItemNavigationStub from '../../../../../../stubs/PlannerItemNavigationStub';

type ViewTaskModalTabsContainerProps = {
  attachments: MediaType[];
  entityId: number;
  location?: { address: string; map: { lat: number; lng: number } };
};
const ViewTaskModalTabsContainer: FC<ViewTaskModalTabsContainerProps> = ({
  attachments,
  entityId,
  location,
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
          {attachments?.length > 0 ? (
            <PlannerItemAttachments
              permission={{ isDelete: false, isDownload: true, isUpdate: false }}
              attachments={attachments}
              isCanAddMedia={false}
              handleAddAttachment={() => true}
              entityType={DocumentsEntityTypeEnum.task_document}
            />
          ) : (
            <PlannerItemNavigationStub variant={PlannerItemNavigationEnum.attachments} />
          )}
        </TabPanel>
        <TabPanel sx={{ height: '100%', p: '0' }} value={PlannerItemNavigationEnum.location}>
          {location?.address ? (
            <Box mt="16px">
              {location && <LocationView location={location?.map} address={location?.address} />}
            </Box>
          ) : (
            <PlannerItemNavigationStub variant={PlannerItemNavigationEnum.location} />
          )}
        </TabPanel>
        <TabPanel sx={{ height: '100%', p: '0' }} value={PlannerItemNavigationEnum.checklists}>
          <PlannerItemChecklists isCanEdit={false} entityId={entityId} />
        </TabPanel>
        <TabPanel sx={{ height: '100%', p: '0' }} value={PlannerItemNavigationEnum.notes}>
          <PlannerItemNotes isCanEdit={false} entityId={entityId} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ViewTaskModalTabsContainer;
