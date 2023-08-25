export type HubModel = {
  id: number;
  amount?: number;
  canceled_at?: string;
  expired_at: string;
  is_free: boolean;
  is_trial: boolean;
  is_in_package?: boolean;
  name: string;
};
