export default {
  network: {
    connections: 'Connections',
    contacts: 'Contacts',
    connection: 'Connection',
    contact: 'Contact',
    inviteTo: 'Invite to',
    status: {
      connected: 'Connected',
      pendingRequest: 'Pending request',
      pendingRequests: 'Pending requests',
      notConnected: 'Not connected',
      futureSentRequests: 'Future sent requests',
      futureSentRequest: 'Future sent request',
      futureSent: 'Future sent',
      sentRequest: 'Sent request',
      sentRequests: 'Sent requests',
      connections: 'Connections',
      contacts: 'Contacts',
      myNetwork: 'My network',
    },
    title: {
      connected: 'Connected',
      pendingRequest: 'Pending request',
      pendingRequests: 'Pending requests',
      futureSentRequests: 'Future sent requests',
      futureSent: 'Future sent',
      sentRequest: 'Sent request',
      sentRequests: 'Sent requests',
      connections: 'Connections',
      contacts: 'Contacts',
      incomingContact: 'Shared contacts',
    },
    invite: {
      title: 'Invite',
      subtitle: 'Let’s see if the person you’re searching for is already on hubmee',
    },
    inviteContact: {
      title: 'Send the Invitation',
      text: 'Please, select email or phone number to invite a new user',
    },
    createContact: {
      title: 'The contact is saved',
      text: 'Do you want to invite this person to register in the hubmee system?',
    },
    confirmMessages: {
      decline: 'Are you sure you want to decline this request?',
      cancel: 'Are you sure you want to cancel this request?',
      removeConnections: 'Are you sure you want to remove {{name}} from your network?',
      resend: 'Are you sure you want to resend this request?',
      invite: 'Are you sure you want to invite this user?',
    },
    confirmModal: {
      canselSentRequest: {
        header: 'Cancel request',
        title: 'Your connection request will be canceled',
        subtitle: 'Are you sure you want to cancel? This action cannot be undone',
      },
      declinePendingRequest: {
        header: 'Decline request',
        title: "You'll decline {{userFullName}} connection request",
        subtitle: 'Are you sure you want to decline? This action cannot be undone',
      },
    },
    tooltips: {
      alreadyInvited: 'Already invited',
      alreadySentRequest: `You can resend the request once every seven days.`,
    },
    toasts: {
      sentInvite: 'The invitation has been successfully sent!',
      sentInviteContact: 'Invitation has been sent to the contact from your Network!',
      roleRequired: 'The Role In Tree field is required',
      contactCreated: 'New contact has been saved to your Network!',
      requestCanceled: 'You declined {{userFullName}} connection request',
      connectionRequestCanceled: 'You canceled {{userFullName}} connection request',
      requestConfirm: 'You added {{userFullName}} to your Network',
      requestResend: 'The request has been successfully resent',
      futureRequestResend:
        'You resended connection request to {{userFullName}}. You won’t be able to resend your request again for the next 7 days.',
    },
  },
};
