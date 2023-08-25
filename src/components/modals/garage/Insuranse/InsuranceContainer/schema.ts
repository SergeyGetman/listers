import { isValidPhoneNumber } from 'react-phone-number-input';
import * as Yup from 'yup';
import i18next from 'i18next';

export const insuranceSchema = Yup.object().shape({
  issued_by: Yup.string()
    .test('issued_by', function (value) {
      if (value && value.trim().length < 2) {
        return this.createError({
          path: this.path,
          message: i18next.t('validation.general.min', {
            field: i18next.t('general.fieldNames.issuedBy'),
            count: 2,
          }),
        });
      }

      return true;
    })
    .max(
      255,
      i18next.t('validation.general.max', {
        field: i18next.t('general.fieldNames.issuedBy'),
        count: 255,
      }),
    ),
  policy_number: Yup.string().max(
    255,
    i18next.t('validation.general.max', {
      field: i18next.t('general.fieldNames.policyNumber'),
      count: 255,
    }),
  ),
  naic: Yup.string().max(
    255,
    i18next.t('validation.general.max', {
      field: i18next.t('general.fieldNames.naic'),
      count: 255,
    }),
  ),
  expiration: Yup.object().shape({
    date: Yup.mixed().required(
      i18next.t('validation.general.required', {
        field: i18next.t('general.fieldNames.expirationDate'),
      }),
    ),
  }),
  amount: Yup.mixed().test('amount', function (value) {
    if (value && value < 0) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }
    if ((this.parent.account_balance !== null || this.parent.minimum_due !== null) && value === null) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.required', {
          field: i18next.t('general.fieldNames.fullAmount'),
        }),
      });
    }
    return true;
  }),
  discount: Yup.mixed().test('discount', function (value) {
    if (value && value < 0) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }
    return true;
  }),
  paid: Yup.mixed().test('paid', function (value) {
    if (value && value < 0) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }
    return true;
  }),
  account_balance: Yup.mixed().test('account_balance', function (value) {
    if (value && value < 0) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }

    if (!!this.parent.amount && !!value && this.parent.amount < value) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.fieldMinOtherField', {
          field1: i18next.t('general.fieldNames.accountBalance'),
          field2: i18next.t('general.fieldNames.fullAmount'),
        }),
      });
    }
    if (this.parent.minimum_due && !!value === false) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.required', {
          field: i18next.t('general.fieldNames.accountBalance'),
        }),
      });
    }
    return true;
  }),
  minimum_due: Yup.mixed().test('minimum_due', function (value) {
    if (value && value < 0) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }

    if (this.parent.account_balance && value && this.parent.account_balance < value) {
      return this.createError({
        path: this.path,

        message: i18next.t('validation.general.fieldMinOtherField', {
          field1: i18next.t('general.fieldNames.minimumDue'),
          field2: i18next.t('general.fieldNames.accountBalance'),
        }),
      });
    }
    return true;
  }),
  collision: Yup.mixed().test('collision', function (value) {
    if (value && value < 0) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }
    return true;
  }),
  comprehensive: Yup.mixed().test('comprehensive', function (value) {
    if (value && value < 0) {
      return this.createError({
        path: this.path,
        message: i18next.t('validation.general.invalid'),
      });
    }
    return true;
  }),
  covered_people: Yup.array().of(
    Yup.object().shape({
      full_name: Yup.string()
        .test('issued_by', function (value) {
          if (value && value.length < 2) {
            return this.createError({
              path: this.path,
              message: i18next.t('validation.general.min', {
                field: i18next.t('general.fieldNames.fullName'),
                count: 2,
              }),
            });
          }
          return true;
        })
        .max(
          255,
          i18next.t('validation.general.max', {
            field: i18next.t('general.fieldNames.fullName'),
            count: 72,
          }),
        ),
    }),
  ),
  agency: Yup.object().shape({
    name: Yup.mixed().test('type', function (value) {
      if (value !== null && value.value.trim().length < 2) {
        return this.createError({
          path: this.path,
          message: i18next.t('validation.general.min', {
            field: i18next.t('general.fieldNames.agencyName'),
            count: 2,
          }),
        });
      }

      if (value !== null && value.value.trim().length > 255) {
        return this.createError({
          path: this.path,
          message: i18next.t('validation.general.max', {
            field: i18next.t('general.fieldNames.agencyName'),
            count: 255,
          }),
        });
      }

      return true;
    }),

    // name: Yup.string()
    //   .test('issued_by', function (value) {
    //     if (value && value.length < 2) {
    //       return this.createError({
    //         path: this.path,
    //         message: i18next.t('validation.general.min', {
    //           field: i18next.t('general.fieldNames.agencyName'),
    //           count: 2,
    //         }),
    //       });
    //     }
    //     return true;
    //   })
    //   .max(
    //     255,
    //     i18next.t('validation.general.max', {
    //       field: i18next.t('general.fieldNames.agencyName'),
    //       count: 255,
    //     }),
    //   ),

    emails: Yup.array().of(
      Yup.object().shape({
        email: Yup.string().email(i18next.t('validation.general.invalid')),
      }),
    ),
    phones: Yup.array().of(
      Yup.object().shape({
        phone: Yup.string().test('phone', function (value) {
          if (value && isValidPhoneNumber(value) === false) {
            return this.createError({
              path: this.path,
              message: i18next.t('validation.general.invalid'),
            });
          }
          return true;
        }),
      }),
    ),
    address: Yup.mixed().test('type', function (value) {
      if (value && value.address && value.map.lat === null) {
        return this.createError({
          path: this.path,
          message: i18next.t('validation.general.invalid'),
        });
      }
      return true;
    }),
    sites: Yup.array().of(
      Yup.object().shape({
        login: Yup.string()
          .test('issued_by', function (value) {
            if (value && value.length < 2) {
              return this.createError({
                path: this.path,
                message: i18next.t('validation.general.min', {
                  field: i18next.t('general.fieldNames.login'),
                  count: 2,
                }),
              });
            }
            return true;
          })
          .max(
            255,
            i18next.t('validation.general.max', {
              field: i18next.t('general.fieldNames.login'),
              count: 255,
            }),
          )
          .nullable(),
        password: Yup.string()
          .test('issued_by', function (value) {
            if (value && value.length < 3) {
              return this.createError({
                path: this.path,
                message: i18next.t('validation.general.min', {
                  field: i18next.t('general.fieldNames.password'),
                  count: 3,
                }),
              });
            }
            return true;
          })
          .max(
            32,
            i18next.t('validation.general.max', {
              field: i18next.t('general.fieldNames.password'),
              count: 32,
            }),
          )
          .nullable(),
        url: Yup.string().max(
          255,
          i18next.t('validation.general.max', {
            field: i18next.t('general.fieldNames.website'),
            count: 255,
          }),
        ),
      }),
    ),
  }),
  agents: Yup.array().of(
    Yup.object().shape({
      name: Yup.mixed().test('type', function (value) {
        if (value !== null && value.value.trim().length < 2) {
          return this.createError({
            path: this.path,
            message: i18next.t('validation.general.min', {
              field: i18next.t('general.fieldNames.agencyName'),
              count: 2,
            }),
          });
        }

        if (value !== null && value.value.trim().length > 72) {
          return this.createError({
            path: this.path,
            message: i18next.t('validation.general.max', {
              field: i18next.t('general.fieldNames.agencyName'),
              count: 72,
            }),
          });
        }

        return true;
      }),

      emails: Yup.array().of(
        Yup.object().shape({
          email: Yup.string().email(i18next.t('validation.general.invalid')),
        }),
      ),
      phones: Yup.array().of(
        Yup.object().shape({
          phone: Yup.string().test('phone', function (value) {
            if (value && isValidPhoneNumber(value) === false) {
              return this.createError({
                path: this.path,
                message: i18next.t('validation.general.invalid'),
              });
            }
            return true;
          }),
        }),
      ),
    }),
  ),
});
