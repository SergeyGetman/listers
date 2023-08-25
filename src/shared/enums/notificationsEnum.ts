export enum NotificationsEnum {
  news = 'news',
  requests = 'requests',
}

export enum NotificationsTypesEnum {
  task = 'task',
  event = 'event',
  garage = 'garage',
  thread = 'thread',
  userRequest = 'userRequest',
  todo = 'todo',
  note = 'note',
  backlog = 'backlog',
}

export enum NotificationsActionsTypesEnum {
  cancelInvitation = 'cancel_invitation',
  contactShared = 'contact_shared',
  acceptContact = 'accept_contact',
  autoArchived = 'auto_archived',
  deletedAccount = 'deleted_account',
  deleted = 'deleted',
}

export enum NotificationsActionsEnum {
  accept = 'accept',
  decline = 'decline',
  going = 'going',
  maybe = 'maybe',
  notGoing = 'notGoing',
}
