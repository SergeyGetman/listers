import i18next from '../locales/i18n';
import { PlanNameEnum } from '../enums/planPeriodEnum';
import { PlansPricingItemEnum } from '../enums/plansPricingItem.enum';

type PlansPricingItemConfigModel = {
  [key: string]: {
    label?: string;
    title: string;
    costFree?: string;
    subtitle: string;
    planListTitle: string;
    planListItems: { listItem: string }[];
    costMonthly?: string;
    costYearly?: string;
    costPeriodMonth?: string;
    costPeriodYear?: string;
  };
};

export const plansPricingItemConfig: PlansPricingItemConfigModel = {
  [PlanNameEnum.starter]: {
    title: PlansPricingItemEnum.starter,
    costFree: i18next.t('plansPricing.costFree'),
    subtitle: i18next.t('plansPricing.subtitle.starterSubtitle'),
    planListTitle: i18next.t('plansPricing.planListTitle.starterPlanListTitle'),
    planListItems: [
      { listItem: i18next.t('planListItems.starterItems.toDoList') },
      { listItem: i18next.t('planListItems.starterItems.profile') },
      { listItem: i18next.t('planListItems.starterItems.chat') },
      { listItem: i18next.t('planListItems.starterItems.network') },
    ],
  },
  [PlanNameEnum.basic]: {
    label: i18next.t('plansPricing.label'),
    title: PlansPricingItemEnum.basic,
    costMonthly: i18next.t('plansPricing.cost.price.priceMonth.basicCost'),
    costYearly: i18next.t('plansPricing.cost.price.priceYear.basicCost'),
    costPeriodMonth: i18next.t('plansPricing.cost.costPeriod.costPeriodMonth'),
    costPeriodYear: i18next.t('plansPricing.cost.costPeriod.costPeriodYear'),
    subtitle: i18next.t('plansPricing.subtitle.basicSubtitle'),
    planListTitle: i18next.t('plansPricing.planListTitle.basicPlanListTitle'),
    planListItems: [
      { listItem: i18next.t('planListItems.basicItems.journal') },
      { listItem: i18next.t('planListItems.basicItems.calendar') },
      // { listItem: i18next.t('planListItems.basicItems.googleSync') },
    ],
  },
  [PlanNameEnum.premium]: {
    title: PlansPricingItemEnum.premium,
    costMonthly: i18next.t('plansPricing.cost.price.priceMonth.premiumCost'),
    costYearly: i18next.t('plansPricing.cost.price.priceYear.premiumCost'),
    costPeriodMonth: i18next.t('plansPricing.cost.costPeriod.costPeriodMonth'),
    costPeriodYear: i18next.t('plansPricing.cost.costPeriod.costPeriodYear'),
    subtitle: i18next.t('plansPricing.subtitle.premiumSubtitle'),
    planListTitle: i18next.t('plansPricing.planListTitle.premiumPlanListTitle'),
    planListItems: [
      { listItem: i18next.t('planListItems.premiumItems.roadmap') },
      { listItem: i18next.t('planListItems.premiumItems.events') },
      { listItem: i18next.t('planListItems.premiumItems.backlog') },
      { listItem: i18next.t('planListItems.premiumItems.garage') },
      { listItem: i18next.t('planListItems.premiumItems.archive') },
      // { listItem: i18next.t('planListItems.premiumItems.storage') },
    ],
  },
};
