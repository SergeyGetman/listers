import React, { FC } from 'react';

import { NavigationContainer, TabConteiner, TabsContainer } from './NavigationTabs.style';

type Props = {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabs: {
    icon: any;
    label: string;
  }[];
  minWidthTabs?: string;
};

const NavigationTabs: FC<Props> = ({ value, handleChange, tabs, minWidthTabs = '90px' }) => {
  const allProps = (index: number) => {
    return {
      id: `tab-${index}`,
      'aria-controls': `tab-panel-${index}`,
    };
  };

  return (
    <NavigationContainer>
      <TabsContainer value={value} onChange={handleChange} aria-label="basic tabs">
        {tabs?.map((item, index) => (
          <TabConteiner
            minWidthTabs={minWidthTabs}
            key={index}
            label={item.label}
            icon={item.icon}
            iconPosition="start"
            {...allProps(index)}
          />
        ))}
      </TabsContainer>
    </NavigationContainer>
  );
};

export default React.memo(NavigationTabs);
