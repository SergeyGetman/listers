import { PlansPricingItemEnum } from '../../enums/plansPricingItem.enum';

export const planToolsConfig = {
  [PlansPricingItemEnum.starter]: ['Checklist', 'Notes'],
  [PlansPricingItemEnum.basic]: ['Task', 'Events', 'Deadlines'],
  [PlansPricingItemEnum.premium]: ['Payments', 'Meetings', 'Reminders', 'Appointment'],
};
