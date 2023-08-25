import { MoneyActionEnum } from '../enums/moneyAction.enum';

type MoneyActionConfigType = {
  [key: string]: {
    label: string;
    value: MoneyActionEnum;
  };
};

export const MoneyActionConfig: MoneyActionConfigType = {
  [MoneyActionEnum.income]: {
    value: MoneyActionEnum.income,
    label: 'Money in',
  },
  [MoneyActionEnum.outcome]: {
    value: MoneyActionEnum.outcome,
    label: 'Money out',
  },
};
