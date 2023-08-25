import { Box, Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Moment from 'moment/moment';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import MuiBaseInputView from '../../../../formElements/MuiBaseInputView';
import ViewDescriptionContainer from '../../../../viewContainers/ViewDescriptionContainer';
import DocumentsContainer from '../../../../viewContainers/DocumentsContainer';
import { ConnectedUserModel } from '../../../../../shared/models/network';
import ContactViewModalContentSkeleton from './components/ContactViewModalContentSkeleton';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import { getUser } from '../../../../../store/network/networkThunk';
import LocationView from '../../../../locations/LocationView';
import { MenuListItem } from '../../../../itemCards/NetworkUserCard/NetworkUserCard';

type Props = {
  onClose: () => void;
  userId: number;
  menuListItems: MenuListItem[];
};

const ContactViewContainer: FC<Props> = ({ onClose, userId, menuListItems }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [isPreloadingPage, setIsPreloadingPage] = useState(true);

  const [data, setData] = useState<ConnectedUserModel | null>(null);

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId)).then((result) => {
        if (getUser.fulfilled.match(result)) {
          setData(result.payload);
          setIsPreloadingPage(false);
        }
      });
    }
  }, [dispatch, userId]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        paddingBottom: '30px',
      }}
    >
      {isPreloadingPage ? (
        <ContactViewModalContentSkeleton />
      ) : (
        <>
          <MuiDefaultDrawerHeader
            onClose={onClose}
            title={
              data?.contacts.is_company && !!data?.contacts.company
                ? data?.contacts.company
                : data?.full_name
                ? data?.full_name
                : ''
            }
            headerMenuList={menuListItems}
            isShowHeaderMenu
            subtitle={data?.contacts.is_company ? t('general.containers.company') : undefined}
          />
          <Box sx={{ padding: '30px 10px 0', flexGrow: 1 }}>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              {data?.contacts.is_company ? (
                <Grid xs={6} sm={6} item>
                  <MuiBaseInputView
                    content={!!data?.full_name.trim().length ? data?.full_name : '-'}
                    label={t('general.fieldNames.fullName')}
                  />
                </Grid>
              ) : (
                <Grid xs={6} sm={6} item>
                  <MuiBaseInputView
                    content={data?.contacts.company ? data?.contacts.company : '-'}
                    label={t('general.fieldNames.company')}
                  />
                </Grid>
              )}
              <Grid xs={6} sm={6} item>
                <MuiBaseInputView
                  content={
                    data?.birth_day
                      ? Moment.utc(data?.birth_day, 'YYYY-MM-DD ').local().format('MM/DD/YYYY')
                      : '-'
                  }
                  label={t('general.fieldNames.birthday')}
                />
              </Grid>
              <Grid xs={6} sm={6} item>
                <MuiBaseInputView
                  content={data?.gender ? data?.gender : '-'}
                  label={t('general.fieldNames.gender')}
                />
              </Grid>
              <Grid xs={6} sm={6} item>
                <MuiBaseInputView
                  content={data?.recipient_request?.role ? data.recipient_request.role : '-'}
                  label={t('general.fieldNames.role')}
                />
              </Grid>
              {/* {!!data?.contacts?.phones.length ? ( */}
              {/*  data?.contacts?.phones?.map((phone) => { */}
              {/*    return ( */}
              {/*      <Grid xs={12} sm={6} item> */}
              {/*        <MuiPhoneNumberInputView country={phone.country} content={phone.value} /> */}
              {/*      </Grid> */}
              {/*    ); */}
              {/*  }) */}
              {/* ) : ( */}
              {/*  <Grid xs={12} sm={6} item> */}
              {/*    <MuiBaseInputView content="-" label={t('general.fieldNames.phone')} /> */}
              {/*  </Grid> */}
              {/* )} */}

              {/* {!!data?.contacts?.emails.length ? ( */}
              {/*  data?.contacts?.emails?.map((email) => { */}
              {/*    return ( */}
              {/*      <Grid xs={12} sm={6} item> */}
              {/*        <MuiBaseInputView */}
              {/*          content={email.value ? email.value : '-'} */}
              {/*          label={`email${email.type ? ` (${email.type})` : ''}`} */}
              {/*          isShowCopyBtn */}
              {/*        /> */}
              {/*      </Grid> */}
              {/*    ); */}
              {/*  }) */}
              {/* ) : ( */}
              {/*  <Grid xs={12} sm={6} item> */}
              {/*    <MuiBaseInputView content="-" label={t('general.fieldNames.email')} /> */}
              {/*  </Grid> */}
              {/* )} */}

              {data?.contacts?.urls?.map((url) => {
                return (
                  <Grid xs={6} sm={6} item>
                    <MuiBaseInputView
                      content={url.value ? url.value : '-'}
                      label={`url${url.type ? ` (${url.type})` : ''}`}
                      isShowCopyBtn
                    />
                  </Grid>
                );
              })}

              {data?.contacts?.socials?.map((social) => {
                return (
                  <Grid xs={6} sm={6} item>
                    <MuiBaseInputView
                      content={social.value}
                      label={`${t('general.fieldNames.socialMedia')} (${social.type})`}
                    />
                  </Grid>
                );
              })}

              {data?.contacts?.addresses?.map((item) => {
                if (item.address) {
                  return (
                    <>
                      <Grid xs={12} sm={12} item>
                        <LocationView address={item.address} isDefaultOpenMap location={item.map} />
                      </Grid>
                    </>
                  );
                }
                return '';
              })}

              {data?.contacts?.note && (
                <Grid xs={12} sm={12} item>
                  <ViewDescriptionContainer
                    label={t('general.containers.notes')}
                    description={data?.contacts.note}
                  />
                </Grid>
              )}

              {!!data?.attached_documents.length && (
                <Grid xs={12} sm={12} item>
                  <DocumentsContainer
                    isCanAddMedia={false}
                    files={data?.attached_documents}
                    onAddMedia={() => {}}
                    permission={{ isDelete: false, isDownload: true, isUpdate: false }}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};
export default ContactViewContainer;
