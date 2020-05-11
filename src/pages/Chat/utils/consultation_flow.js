export default [
  {
    code: 'getting-started',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { type: 'message', text: "I'm Hygeia, your healthcare assistant ."}, 
          { type: 'message', text: 'Let me help you understand your symptoms.' },
          { type: 'message', text: "What is your name?" },
        ]
      },
      {
        from: 'user',
        userForm: {
          inputs: [
            { key: 'nickName', label: '', inputType: 'text', 
              validations: [{ required: true }] 
            },
          ],
          onSuccessAction: 'SAVE-NICKNAME'
        }
      }
    ]
  },
  {
    code: 'ask-action',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          { 
            type: 'text-response-dependent', 
            inputKey: 'nickName',
            valueType: 'text',
            text: "Hi ${nickName}!" 
          },
          { type: 'message', text: "Would you like to provide your symptoms here? or would you rather speak with a healthcare provider?" }
        ]
      },
      {
        from: 'user',
        userForm: {
          inputs: [
            { key: 'proceedDecision', label: '', required: true, 
              inputType: 'radio', 
              options: [{ value: 1, label: 'Provide Symptoms' }, { value: 0, label: 'Speak with a healthcare provider' }],
              validations: [{ required: true }] 
            }
          ]
        }
      }
    ]
  },
  {
    code: 'proceed-decision',
    conversation: [
      {
        from: 'hygeia',
        messages: [
          {
            type: 'boolean-response-dependent',
            inputKey: 'proceedDecision',
            valueType: 'binary',
            scenarios: [
              { messages: [ { type: 'message', text: 'How would you like to pay?' } ] },
              { messages: [ { type: 'message', text: 'Which part of the body is affected?' } ] }
            ]
          }
        ]
      }
    ]
  }
]