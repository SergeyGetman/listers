import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ColumnListItemContainer,
  ColumnTitleItemContainer,
  ColumnTitleItemIconContainer,
  ComingSoonItemBlock,
  ComingSoonItemContentBlock,
  ComingSoonItemContentIconBlock,
  ComingSoonItemText,
  TabContent,
  TabsConteiner,
} from './PlanTable.styled';
import {
  PlansTableOrganizerItemsComingSoonType,
  PlansTableOrganizerItemsType,
} from '../../../../../../shared/configs/plansTable/organizerItem.config';
import { PlansTableLeftItems } from '../../../../../../shared/configs/plansTable/leftOrganizerItems.config';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type PlanTableProps = {
  // TODO eny

  leftColumnItems: any;
  rightColumnItems: any;
};
const PlanTable: FC<PlanTableProps> = ({ leftColumnItems, rightColumnItems }) => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const [activeTab, setActiveTab] = useState<number>(0);
  const { t } = useTranslation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && children}
      </Box>
    );
  };

  const Item = ({ icon, title, listItems }: PlansTableOrganizerItemsType) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <ColumnTitleItemContainer>
          <ColumnTitleItemIconContainer>{icon}</ColumnTitleItemIconContainer>
          <Typography variant="h3">{title}</Typography>
        </ColumnTitleItemContainer>
        {listItems.map((item) => {
          return (
            <ColumnListItemContainer>
              {item.icon}
              <Typography sx={{ fontWeight: '400' }} variant="large">
                {item.text}
              </Typography>
            </ColumnListItemContainer>
          );
        })}
      </Box>
    );
  };

  const comingSoonBlock = (item: PlansTableOrganizerItemsComingSoonType) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '200px', margin: 'auto' }}>
          <ComingSoonItemBlock />
          <ComingSoonItemContentBlock>
            <ComingSoonItemContentIconBlock>{item.icon}</ComingSoonItemContentIconBlock>
            <ComingSoonItemText variant="large">{item.title}</ComingSoonItemText>
          </ComingSoonItemContentBlock>
          <ComingSoonItemBlock sx={{ marginBottom: '16px' }} />
        </Box>
        <ComingSoonItemText variant="large">{item.description}</ComingSoonItemText>
      </Box>
    );
  };

  return (
    <Box>
      <Grid sx={{ m: '0px' }} container spacing={2} columns={12}>
        <Grid
          item
          sx={{ pl: '0 !important', maxWidth: isMobile ? 'initial' : '179px !important' }}
          xs={12}
          md={2}
        >
          <Box>
            <TabsConteiner
              orientation={isMobile ? 'horizontal' : 'vertical'}
              variant="scrollable"
              value={activeTab}
              onChange={handleChange}
              scrollButtons={false}
              aria-label="scrollable prevent tabs example"
            >
              {leftColumnItems(t).map((item: PlansTableLeftItems) => {
                return <TabContent isDisabled={item.isDisabled} label={item.label} />;
              })}
            </TabsConteiner>
          </Box>
        </Grid>
        <Grid item xs={12} md={10}>
          <Box>
            {rightColumnItems(t).map((item: PlansTableOrganizerItemsComingSoonType, index: number) => {
              return (
                <TabPanel value={activeTab} index={index}>
                  {item.isComingSoon ? (
                    comingSoonBlock(item)
                  ) : (
                    <Grid container spacing={2} columns={16}>
                      {rightColumnItems(t)[index].map((tableListsItems: PlansTableOrganizerItemsType) => {
                        return (
                          <Grid item xs={16} md={5}>
                            {Item({
                              icon: tableListsItems.icon,
                              title: tableListsItems.title,
                              listItems: tableListsItems.listItems,
                            })}
                          </Grid>
                        );
                      })}
                    </Grid>
                  )}
                </TabPanel>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlanTable;
