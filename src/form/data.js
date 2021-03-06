export const FormData = {
  intro: {
    logo: null,
    header: 'The Ultimate Drunk Test',
    subheader: "We're so glad you are trying to find out how drunk you are.\nThough to be honest, you might already be way too drunk if you are interested in this kind of quiz."
  },
  steps: [
    {
      id: 1,
      question: () => 'First up, what should we call you?',
      typeAnswer: 'text',
      fieldId: 'firstName',
      required: true,
      displaySubmit: true
    },
    {
      id: 2,
      question: ({ firstName }) => { return `Ok ${firstName}, and your surname?` },
      typeAnswer: 'text',
      fieldId: 'lastName',
      required: true,
      displaySubmit: true
    },
    {
      id: 3,
      question: () => 'Now, how old were you when you had your first drink?',
      typeAnswer: 'number',
      fieldId: 'age',
      required: true,
      displaySubmit: true
    },
    {
      id: 4,
      question: () => 'When you compare yourself to other people your age, are you concerned about your ability to keep drinking though you feel dizzy?',
      typeAnswer: 'scale',
      options: [0, 1, 2, 3, 4, 5],
      labels: ['Not at all', 'Very much'],
      fieldId: 'ability',
      required: true,
      displaySubmit: false
    },
    {
      id: 5,
      question: () => 'How significant do you think this impacts your ability to function in every-day activities?',
      typeAnswer: 'scale',
      options: [0, 1, 2, 3, 4, 5],
      labels: ['Not at all', 'Somewhat', 'Very much'],
      fieldId: 'activities',
      required: true,
      displaySubmit: false
    },
    {
      id: 6,
      question: () => "How much do you agree or disagree with the following statement: 'I don't have a drinking problem, I do it for fun.'",
      typeAnswer: 'scale',
      options: [0, 1, 2, 3, 4, 5],
      labels: ['Disagree strongly', 'Agree strongly'],
      fieldId: 'statement',
      required: true,
      displaySubmit: false
    },
    {
      id: 7,
      question: () => 'What types of things do you usually do on the weekend',
      typeAnswer: 'multipleChoice',
      options: ['Go out and drink tequila', 'Binge drinking', 'Watch movie and have beer', 'Go wine tasting', 'Netflix & beer'],
      fieldId: 'weekend',
      required: true,
      displaySubmit: true
    },
    {
      id: 8,
      question: () => 'What day would you say you drink the most',
      typeAnswer: 'oneChoice',
      options: ['Friday', 'Saturday', 'Other'],
      fieldId: 'day',
      required: true,
      displaySubmit: false
    },
    {
      id: 9,
      question: () => 'Which drink do you prefer?',
      typeAnswer: 'oneChoice',
      options: ['Beer', 'Whisky', 'Jägerbomb', 'Wine', 'Vodka', 'Other'],
      fieldId: 'drink',
      required: true,
      displaySubmit: false
    },
    {
      id: 10,
      question: () => 'Are you a cool peruvian?',
      typeAnswer: 'oneChoice',
      options: ['Yes', 'No'],
      fieldId: 'peruvian',
      required: true,
      displaySubmit: false
    },
    {
      id: 11,
      question: ({ firstName }) => { return `Great. Now what's your email, ${firstName}?` },
      typeAnswer: 'text',
      fieldId: 'email',
      required: true,
      displaySubmit: true
    },
    // todo: add func to allow type what other
  ],
  outro: {
    logo: null,
    header: 'YOU DRUNK!',
    subheader: 'Though, we already said that in the beginning, so why would you fill the quiz anyway? Have a beer later! Bye!'
  }
}
