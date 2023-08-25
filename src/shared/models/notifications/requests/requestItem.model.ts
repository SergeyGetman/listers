import { AvatarModel } from '../../avatar.model';

export interface RequestItemModel {
  id: number;
  type: string;
  status?: string;
  type_id: number;
  sender: {
    id: number;
    full_name: string;
    first_name: string;
    last_name: string;
    avatar: AvatarModel | null;
    permission: string;
    connection_role: string;
    entity_type: string;
  };
  action: string;
  entity: {
    id: number;
    parent_id: number;
    recurring_id: number;
    is_archive: boolean;
    is_all_day: boolean;
    is_all_day_due_date: boolean;
    is_same: boolean;
    model_type: string;
    priority: string;
    color: string;
    icon: any;
    global_status: string;
    type: string;
    role: string;
    title: string;
    meeting_id: number | null;
    late_fee: number | null;
    amount: number | null;
    site: string | null;
    phone: string | null;
    country: string | null;
    description: string | null;
    // TODO add global location type
    location: { address: string; map: { lat: number; lng: number } };
    recurring_group: string | null;
    status_changed_at: string | null;
    paid_at: string | null;
    due_dated_at: string;
    started_at: string;
    finished_at: string;
    archived_at: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    photos: [];
    documents: [];
  };
  title: string;
  text: string;
  actions: string[];
  created_at: string;
}
