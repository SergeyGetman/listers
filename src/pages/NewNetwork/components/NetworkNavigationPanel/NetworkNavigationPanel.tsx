import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { NetworkNavigationPanelContainer } from './NetworkNavigationPanel.style';
import router from '../../../../shared/services/router';
import { ReactComponent as ConnectionsIcon } from '../../../../assets/Images/network/network-icon.svg';
import { ReactComponent as ContactsIcon } from '../../../../assets/Images/network/contacts-icon.svg';
import NavigationTabs from '../../../../components/NavigationTabs';

const NetworkNavigationPanel: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const isContactsPage = useMemo(() => {
    return location.pathname.includes(`${router.networkNew.children.contacts.path}`);
  }, [location.pathname]);

  const [value, setValue] = useState(isContactsPage ? 1 : 0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue !== value) {
      if (newValue === 0) {
        navigate(router.networkNew.path);
      } else if (newValue === 1) {
        navigate(router.networkNew.children.contacts.path);
      }
      setValue(newValue);
    }
  };

  return (
    <>
      <NetworkNavigationPanelContainer>
        <NavigationTabs
          value={value}
          handleChange={handleChange}
          tabs={[
            {
              label: t('network.connections'),
              icon: <ConnectionsIcon />,
            },
            {
              label: t('network.contacts'),
              icon: <ContactsIcon />,
            },
          ]}
        />
      </NetworkNavigationPanelContainer>
    </>
  );
};

export default React.memo(NetworkNavigationPanel);
