export enum NetworkTypeEnum {
  all = 'all',
  connected = 'connected',
  pending = 'pending',
  future = 'future',
  sent = 'sent',
  contacts = 'contacts',
}

export enum NetworkTypeRequestEnum {
  all = '/connections/all',
  connected = '/connections',
  pending = '/connections/incoming',
  sent = '/connections/outgoing',
  contacts = '/connections/contacts',
  future = '/connections/future_outgoing',
}

export enum NetworkTitleTypeEnum {
  outgoing = 'sentRequest',
}
