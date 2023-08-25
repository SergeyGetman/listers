import i18next from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { OptionType } from '../../components/formElements/MuiSelect/MuiSelect';
import { getFriends } from '../../store/Common/commonThunk';
import { ItemUserModel } from '../models/itemUser.model';
import { useAppDispatch, useAppSelector } from './redux';
import { getConnections } from '../../store/Profile/profile.actions';

export type ConnectionsOptionsType = ItemUserModel & OptionType;

const useGetConnections = (withMe: boolean = false, isAllConnections: boolean = false) => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state) => state.profile.data);
  const [connectionsLoading, setConnectionsLoading] = useState(false);
  const [connectionsOptions, setConnectionOptions] = useState<ConnectionsOptionsType[]>([]);

  const getFriendConnections = useCallback(() => {
    if (profile?.id) {
      dispatch(getFriends({ setLoading: (val) => setConnectionsLoading(val) })).then((result) => {
        if (getFriends.fulfilled.match(result)) {
          if (withMe) {
            setConnectionOptions(
              result.payload.map((item) => {
                if (item.id === (profile.id as number)) {
                  return { ...item, value: item.id.toString(), label: i18next.t('general.me') };
                }
                return { ...item, value: item.id.toString(), label: item.full_name || '' };
              }),
            );
            return;
          }

          setConnectionOptions(
            result.payload
              .filter((item) => item.id !== (profile.id as number))
              .map((item) => ({
                ...item,
                value: item.id.toString(),
                label: item.full_name || '',
              })),
          );
        }
      });
    }
  }, [dispatch, profile.id, withMe]);

  const getAllconnections = useCallback(() => {
    if (profile?.id) {
      dispatch(getConnections({ setLoading: (val) => setConnectionsLoading(val) })).then((result) => {
        if (getConnections.fulfilled.match(result)) {
          if (withMe) {
            setConnectionOptions(
              result.payload.map((item) => {
                if (item.id === (profile.id as number)) {
                  return { ...item, value: item.id.toString(), label: i18next.t('general.me') };
                }
                return { ...item, value: item.id.toString(), label: item.full_name || '' };
              }),
            );
            return;
          }

          setConnectionOptions(
            result.payload
              .filter((item) => item.id !== (profile.id as number))
              .map((item) => ({
                ...item,
                value: item.id.toString(),
                label: item.full_name || '',
              })),
          );
        }
      });
    }
  }, [dispatch, profile.id, withMe]);

  useEffect(() => {
    if (isAllConnections) {
      getAllconnections();
      return;
    }
    getFriendConnections();
  }, [getAllconnections, getFriendConnections, isAllConnections]);

  return { connectionsLoading, connectionsOptions };
};

export default useGetConnections;
