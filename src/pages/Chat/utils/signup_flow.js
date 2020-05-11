export default [
  { 
    code: 'sign-up-fillup',
    conversation: [
      { 
        from: 'hygeia', 
        messages: [
          { type: 'message', text: "Hi! Some Greetings"}, 
          { type: 'message', text: 'Join Global Health Way Now' }
        ]
      },
      {
        from: 'user',
        userForm: {
          inputs: [
            { key: 'firstName', label: 'First Name', inputType: 'text', 
              validations: [{ required: true }] 
            },
            { key: 'lastName', label: 'Last Name', inputType: 'text', 
              validations: [{ required: true }] 
            },
            { key: 'sssNum', label: 'Social Security Number', required: true, inputType: 'regex-validated',
              validations: [{ regex: 'ssn' }] 
            },
            { key: 'mobileNumber', label: 'Mobile Number', required: true, inputType: 'phone-number', 
              validations: [{ regex: 'phone-number' }] 
            },
            { key: 'dateOfBirth', label: 'Date of Birth', required: true, inputType: 'date',
              validations: [{ required: true }] 
            },
            { key: 'gender', label: 'Gender', required: true, 
              inputType: 'radio', options: [{ value: 'male', label: 'Male'}, { value: 'female', label: 'Female' }],
              validations: [{ required: true }] 
            },
            { key: 'email', label: 'Email Address', required: true, inputType: 'email',
              validations: [{ required: true, regex: 'email' }] 
            }
          ],
          onSuccessAction: 'SAVE-SIGN-UP-FORM'
        }
      }
    ]
  },
  {
    code: 'sign-up-success',
    conversation: [
      {
        from: 'hygeia',
        messages: [
           { 
            type: 'text-response-dependent', 
            inputKey: 'firstName',
            valueType: 'text',
            text: "Hello ${firstName} Thank You for Joining Global Health Way." 
          },
          { type: 'message', text: 'Are you a healthcare provider?' }
        ]
      },
      {
        from: 'user',
        userForm: {
          inputs: [
            { key: 'userRole', label: '', required: true, 
              inputType: 'radio', options: [{ value: 1, label: 'Yes' }, { value: 0, label: 'No' }],
              validations: [{ required: true }] 
            }
          ],
          onSuccessAction: 'PROCEED-REDIRECTS'
        },
      }
    ],
  },
  {
    code: 'after-userRole-define',
    conversation: [
      {
        from: 'hygeia',
        messages: [ { type: 'message', text: "Please click on what action you'd like."} ]
      },
      {
        from: 'user',
        userForm: {
          inputs: [
            {
              key: 'action',
              inputType: 'boolean-response-dependent',
              stepCodeDependency: 'sign-up-success',
              dependencyKey: 'userRole',
              inputKey: 'decision',
              valueType: 'binary',
              scenarios: [
                { 
                  type: 'redirect-button', 
                  buttons: [
                    { label: 'Get Started', path: null, newChat: true, nextChat: 'consultation_flow' },
                    { label: 'Go to Home', path: '/home' }
                  ] 
                },
                { 
                  type: 'redirect-button', 
                  buttons: [
                    { label: 'Go to Portal', path: '/provider-portal' },
                    { label: 'Go to Home', path: '/provider-home' }
                  ] 
                }
              ]
            }
          ]
        }
      }
    ]
  }
]