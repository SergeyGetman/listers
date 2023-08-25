import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../../shared/hooks/redux';
import { ItemUserModel } from '../../../../shared/models/itemUser.model';

export const useGetContacts = () => {
  const [findUsersContactOnly, setFindUsersContactOnly] = useState([]);

  const { connections }: ItemUserModel | any = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (connections) {
      const updateConnections = connections.filter((obj: any) => obj.is_fake === true);
      setFindUsersContactOnly(updateConnections);
    }
  }, [connections]);

  return { findUsersContactOnly, connections };
};
