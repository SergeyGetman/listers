export type UpdatePaymentsFormPayload = {
  documents: { id: number }[];
  photos: { id: number }[];
  paid_at: string | null;
  late_fee: string | number | null;
};
