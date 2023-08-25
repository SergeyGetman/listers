export default {
  validation: {
    base: {
      required: 'The {{field}} is required',
    },
    policy: {
      required: 'Policy acceptance is required',
    },
    password: {
      required: 'The {{field}} is required',
      min: 'Your password must be at least {{count}} characters',
      max: 'The password must be max {{count}} characters',
      confirmation: 'The password confirmation and password fields must match',
      oneLetterOneNumber: 'The password must include at least one letter and one number',
    },
    email: {
      valid: 'The Email format is invalid.',
      confirmation: 'The Email confirmation and email fields must match',
    },
    phone: {
      valid: 'Invalid phone number',
      confirmation: 'The phone confirmation and phone fields must match',
    },
    verificationCode: {
      required: 'The {{field}} is required',
      min: 'Code must be at least {{count}} characters',
      max: 'Code must be max {{count}} characters',
    },
    title: {
      required: 'The {{field}} is required',
      min: 'Title must be at least {{count}} characters',
      max: 'Title must be max {{count}} characters',
    },
    assignPeople: {
      required: 'You have not selected any viewers yet.',
    },
    participants: {
      required: 'The {{field}} is required',
      min: 'Add at least 1 user',
    },
    general: {
      formatInvalid: 'The {{field}} format is invalid',
      required: 'The {{field}} is required',
      areRequired: 'The {{field}} are required',
      invalid: 'This field is invalid',
      invalidField: 'The {{field}} field is invalid',
      min: '{{field}} must be at least {{count}} characters',
      max: '{{field}} must be max {{count}} characters',
      numberMin: '{{field}} must be at least {{count}}',
      numberMax: '{{field}} must be max {{count}}',
      onlyCharacters: "The {{field}} doesn't have to contain numbers.",
      onlyLetters: '{{field}} must be with letters',
      onlyDigits: 'The {{field}} must be {{count}} digits',
      oneOfRequired: 'The {{field1}} or {{field2}} is required',
      fieldMinOtherField: 'The {{field1}} must be less than the {{field2}}',
    },
    checklistForm: {
      required: 'The Text field is required.',
      min: 'The Text field must be at least 2 characters.',
      max: 'Too Long!',
    },
    notesForm: {
      title: {
        required: 'The Title field is required.',
        min: 'The Title field must be at least 2 characters.',
        max: 'Too Long!',
      },
      body: {
        required: 'The Description field is required.',
        min: 'The Text field must be at least 2 characters.',
        max: 'Too Long!',
      },
    },
  },
};
