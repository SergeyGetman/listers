import React, { useEffect } from 'react';

import SocketConnect from '../../shared/services/socket';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { acceptedTransportWS, addTransportWS, updateTransportWS } from './store/garageThunkV2';
import { deleteCurrentTransport } from './store/garageSliceV2';
import { getCurrentUserIDSelector } from './store/garage-selectors';
import { GarageCardItems } from './GarageMainPage/components/GarageMainPageItems/GarageCardItems/GarageCardItems';

export type Entity = { entity_id: number; entity_type: string; user_id?: number };
export type GarageSocketResponse = {
  entity: Entity;
  entity_user: Entity;
};

const GarageNew = () => {
  const userID = useAppSelector(getCurrentUserIDSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const garageChannel = SocketConnect.connect.private(`users.${userID}`);
    SocketConnect.setChannel(`users.${userID}`, garageChannel);

    garageChannel
      .listen('.transport.updated', (event: Pick<GarageSocketResponse, 'entity'>) => {
        dispatch(updateTransportWS(event.entity));
      })
      .listen('.entity_user.updated', (event: Pick<GarageSocketResponse, 'entity_user'>) => {
        dispatch(updateTransportWS(event.entity_user));
      })
      .listen('.entity_user.attached', (event: Pick<GarageSocketResponse, 'entity_user'>) => {
        if (userID === event.entity_user?.user_id) {
          dispatch(addTransportWS(event.entity_user));
        } else {
          dispatch(updateTransportWS(event.entity_user));
        }
      })
      .listen('.entity_user.detached', (event: Pick<GarageSocketResponse, 'entity_user'>) => {
        if (userID === event.entity_user.user_id) {
          dispatch(deleteCurrentTransport({ transportID: event.entity_user.entity_id }));
        } else {
          dispatch(updateTransportWS(event.entity_user));
        }
      })
      .listen('.entity_user.accepted', (event: Pick<GarageSocketResponse, 'entity_user'>) => {
        if (userID === event.entity_user.user_id) {
          dispatch(acceptedTransportWS(event.entity_user.entity_id));
        } else {
          dispatch(updateTransportWS(event.entity_user));
        }
      })
      .listen('.entity_user.self_removed', (event: Pick<GarageSocketResponse, 'entity_user'>) => {
        dispatch(updateTransportWS(event.entity_user));
      })
      .listen('.entity_user.declined', (event: Pick<GarageSocketResponse, 'entity_user'>) => {
        if (userID === event.entity_user.user_id) {
          dispatch(deleteCurrentTransport({ transportID: event.entity_user.entity_id }));
        } else {
          dispatch(updateTransportWS(event.entity_user));
        }
      });

    return () => {
      if (userID) {
        SocketConnect.connect.leave(`users.${userID}`);
        SocketConnect.removeChannel(`users.${userID}`);
      }
    };
  }, [userID, dispatch]);
  return <GarageCardItems />;
};

export default GarageNew;
