import React, { FC, useMemo } from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import MuiBaseAccordion from '../../../../../components/accordions/MuiBaseAccordion';
import MuiBaseInputView from '../../../../../components/formElements/MuiBaseInputView';
import MuiDotAccordion from '../../../../../components/accordions/MuiDotAccordion';
import FileView from '../../../../../components/FilePreView';
import LocationView from '../../../../../components/locations/LocationView';
import PayDateInputView from '../../../../../components/formElements/PayDateInputView';
import { ActionMenuListModel } from '../../../../../shared/models/actionMenuList.model';
import { InsuranceModel } from '../../../../../shared/models/insurance.model';
import { MediaType } from '../../../../../shared/models/media.model';
import { getSelectOptionValue } from '../../../../../shared/utils/generateSelectOptions';
import { getCurrencyValue } from '../../../../../shared/utils/getCurrencyValue';
import MuiBaseMobileAccordion from '../../../../../components/accordions/MuiBaseMobileAccordion';
import MuiPhoneNumberInputView from '../../../../../components/formElements/MuiPhoneNumberInputView';

type Props = {
  menu: ActionMenuListModel;
  data: InsuranceModel;
  isShowMenu: boolean;
};
const GarageOpenItemInsurance: FC<Props> = ({ menu, data, isShowMenu }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  const renderContent = useMemo(
    () => (
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid xs={6} item>
          <PayDateInputView
            label={t('general.fieldNames.effectiveDate')}
            date={moment(data.effective.date).format('MM/DD/YY')}
          />
        </Grid>

        <Grid xs={6} item>
          <PayDateInputView
            label={t('general.fieldNames.expirationDate')}
            date={moment(data.expiration.date).format('MM/DD/YY')}
          />
        </Grid>

        {(data.insurance_card_front.length > 0 || data.insurance_card_back.length > 0) && (
          <Grid xs={12} sm={data.documents.length > 0 ? 6 : 12} item>
            <MuiDotAccordion label={t('general.containers.insuranceCad')} isDisabledExpand>
              <FileView files={[...data.insurance_card_front, ...data.insurance_card_back] as MediaType[]} />
            </MuiDotAccordion>
          </Grid>
        )}

        {data.documents.length > 0 && (
          <Grid
            xs={12}
            sm={data.insurance_card_front.length > 0 || data.insurance_card_back.length > 0 ? 6 : 12}
            item
          >
            <MuiDotAccordion label={t('general.containers.documents')} isDisabledExpand>
              <FileView files={data.documents as MediaType[]} />
            </MuiDotAccordion>
          </Grid>
        )}

        {(data.issued_by || data.policy_number || data.naic) && (
          <Grid xs={12} sm={12} item>
            <MuiDotAccordion label={t('general.containers.main')} isDisabledExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                {data.issued_by && (
                  <Grid xs={6} item>
                    <MuiBaseInputView content={data.issued_by} label={t('general.fieldNames.issuedBy')} />
                  </Grid>
                )}
                {data.policy_number && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={data.policy_number}
                      label={t('general.fieldNames.policyNumber')}
                    />
                  </Grid>
                )}
                {data.naic && (
                  <Grid xs={6} item>
                    <MuiBaseInputView content={data.naic} label={t('general.fieldNames.naic')} />
                  </Grid>
                )}
                <Grid xs={6} item>
                  <MuiBaseInputView
                    content={moment(data.effective.date).format('MM/DD/YY')}
                    label={t('general.fieldNames.effectiveDate')}
                  />
                </Grid>
                <Grid xs={6} item>
                  <MuiBaseInputView
                    content={moment(data.expiration.date).format('MM/DD/YY')}
                    label={t('general.fieldNames.expirationDate')}
                  />
                </Grid>
              </Grid>
            </MuiDotAccordion>
          </Grid>
        )}

        {(data.amount !== null ||
          data.account_balance !== null ||
          data.minimum_due !== null ||
          (data.payment_due_day && data.payment_due_day.date) ||
          data.frequency) && (
          <Grid xs={12} sm={12} item>
            <MuiDotAccordion label={t('general.containers.payment')} isDisabledExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                {data.payment_due_day && data.payment_due_day.date && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={moment(data.payment_due_day.date).format('MM/DD/YY')}
                      label={t('general.fieldNames.paymentDueDay')}
                    />
                  </Grid>
                )}

                <Grid xs={6} item>
                  <MuiBaseInputView
                    content={getSelectOptionValue(data.frequency, 'garage.frequency')}
                    label={t('general.fieldNames.frequency')}
                  />
                </Grid>
                {data.amount !== null && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={getCurrencyValue(data.amount)}
                      label={t('general.fieldNames.amount')}
                    />
                  </Grid>
                )}

                {data.account_balance !== null && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={getCurrencyValue(data.account_balance)}
                      label={t('general.fieldNames.accountBalance')}
                    />
                  </Grid>
                )}
                {data.minimum_due !== null && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={getCurrencyValue(data.minimum_due)}
                      label={t('general.fieldNames.minimumDue')}
                    />
                  </Grid>
                )}
                {data.discount !== null && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={getCurrencyValue(data.discount)}
                      label={t('general.fieldNames.discount')}
                    />
                  </Grid>
                )}
                {data.paid !== null && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={getCurrencyValue(data.paid)}
                      label={t('general.fieldNames.paid')}
                    />
                  </Grid>
                )}
              </Grid>
            </MuiDotAccordion>
          </Grid>
        )}
        {(data.collision !== null || data.comprehensive !== null) && (
          <Grid xs={12} sm={12} item>
            <MuiDotAccordion label={t('general.containers.deductibles')} isDisabledExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                {data.collision !== null && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={getCurrencyValue(data.collision)}
                      label={t('general.fieldNames.сollision')}
                    />
                  </Grid>
                )}
                {data.comprehensive !== null && (
                  <Grid xs={6} item>
                    <MuiBaseInputView
                      content={getCurrencyValue(data.comprehensive)}
                      label={t('general.fieldNames.comprehensive')}
                    />
                  </Grid>
                )}
              </Grid>
            </MuiDotAccordion>
          </Grid>
        )}
        {!!data.covered_people.length && (
          <Grid xs={12} sm={12} item>
            <MuiDotAccordion label={t('general.containers.coveredPeople')} isDisabledExpand>
              <Grid container rowSpacing="16px" columnSpacing="20px">
                {data.covered_people.map((item, index) => (
                  <Grid key={index} xs={12} sm={12} item>
                    <MuiBaseInputView content={item.full_name} label={t('general.fieldNames.fullName')} />
                  </Grid>
                ))}
              </Grid>
            </MuiDotAccordion>
          </Grid>
        )}

        {data.agency !== null &&
          (data.agency.name ||
            data.agency.phones.length > 0 ||
            data.agency.emails.length > 0 ||
            data.agency.sites.length > 0 ||
            data.agency.address) && (
            <Grid xs={12} sm={12} item>
              <MuiDotAccordion label={t('general.containers.agency')} isDisabledExpand>
                {data.agency.name && (
                  <Box sx={{ mb: '16px' }}>
                    <MuiBaseInputView content={data.agency.name} label={t('general.fieldNames.agencyName')} />
                  </Box>
                )}

                <Grid container rowSpacing="16px" columnSpacing="20px">
                  {data.agency.phones.map((phone, index) => (
                    <Grid xs={12} sm={6} item key={index}>
                      <MuiPhoneNumberInputView country={phone.country} content={phone.phone} isShowCopyBtn />
                    </Grid>
                  ))}

                  {data.agency.emails.map((item, index) => (
                    <Grid xs={12} sm={6} key={index} item>
                      <MuiBaseInputView
                        content={item.email}
                        label={t('general.fieldNames.email')}
                        isShowCopyBtn
                      />
                    </Grid>
                  ))}

                  {data.agency.sites.map((item, index) => (
                    <Grid key={index} item xs={12}>
                      <Grid container rowSpacing="16px" columnSpacing="20px">
                        {item.url && (
                          <Grid xs={12} sm={12} item>
                            <MuiBaseInputView
                              content={item.url}
                              label={t('general.fieldNames.website')}
                              isShowCopyBtn
                            />
                          </Grid>
                        )}
                        {item.login && (
                          <Grid xs={6} item>
                            <MuiBaseInputView
                              content={item.login}
                              label={t('general.fieldNames.login')}
                              isShowCopyBtn
                            />
                          </Grid>
                        )}
                        {item.password && (
                          <Grid xs={6} item>
                            <MuiBaseInputView
                              content={item.password}
                              label={t('general.fieldNames.password')}
                              isShowCopyBtn
                              isPassword
                            />
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                  {data.agency.address !== null && (
                    <Grid xs={12} sm={12} item>
                      <LocationView
                        address={data.agency.address.address as string}
                        location={data.agency.address.map as { lat: number; lng: number }}
                      />
                    </Grid>
                  )}
                </Grid>
              </MuiDotAccordion>
            </Grid>
          )}

        {data.agents.map((agent, agentIndex) => (
          <Grid key={agentIndex} xs={12} sm={12} item>
            <MuiDotAccordion label={t('general.containers.agent')} isDisabledExpand>
              {agent.name && (
                <Box sx={{ mb: '16px' }}>
                  <MuiBaseInputView content={agent.name} label={t('general.fieldNames.agentName')} />
                </Box>
              )}

              <Grid container rowSpacing="16px" columnSpacing="20px">
                {agent.phones.map((phone, index) => (
                  <Grid xs={12} sm={6} item key={index}>
                    <MuiPhoneNumberInputView country={phone.country} content={phone.phone} isShowCopyBtn />
                  </Grid>
                ))}

                {agent.emails.map((item, index) => (
                  <Grid xs={12} sm={6} key={index} item>
                    <MuiBaseInputView
                      content={item.email}
                      label={t('general.fieldNames.email')}
                      isShowCopyBtn
                    />
                  </Grid>
                ))}
              </Grid>
            </MuiDotAccordion>
          </Grid>
        ))}
      </Grid>
    ),
    [
      data.account_balance,
      data.agency,
      data.agents,
      data.amount,
      data.collision,
      data.comprehensive,
      data.covered_people,
      data.discount,
      data.documents,
      data.effective.date,
      data.expiration.date,
      data.frequency,
      data.insurance_card_back,
      data.insurance_card_front,
      data.issued_by,
      data.minimum_due,
      data.naic,
      data.paid,
      data.payment_due_day,
      data.policy_number,
      t,
    ],
  );

  return isMobileDisplay ? (
    <MuiBaseMobileAccordion
      menuList={menu}
      isEdit={isShowMenu}
      titleWhiteSpace="normal"
      rightChildren={
        <Box sx={{ maxWidth: '120px', minWidth: '100px', mr: '5px', width: '100%' }}>
          <PayDateInputView
            label={t('general.fieldNames.expirationDate')}
            date={moment(data.expiration.date).format('MM/DD/YY')}
          />
        </Box>
      }
      title={t('general.containers.insurance')}
      subtitleText={`${data.issued_by || ''}`}
    >
      <Box sx={{ padding: '0 10px 16px 10px' }}> {renderContent}</Box>
    </MuiBaseMobileAccordion>
  ) : (
    <MuiBaseAccordion
      menuList={menu}
      withHover
      isShowMenu={isShowMenu}
      isShowInfoDialog={false}
      isDisabledExpand={false}
      label={t('general.containers.insurance')}
    >
      {renderContent}
    </MuiBaseAccordion>
  );
};

export default GarageOpenItemInsurance;
