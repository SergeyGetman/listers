export interface WalletItemHubModel {
  name: string;
  amount: number;
  is_free: number;
  is_trial: number;
  original_amount: number;
  discount_amount?: number;
}

// TODO: fix name Modal -> Model
export interface WalletItemModal {
  amount: number;
  discount_amount: number;
  created_at: string;
  expired_at: string;
  id: number;
  paid_at: string;
  started_at: string;
  status: string;
  items: WalletItemHubModel[];
}
