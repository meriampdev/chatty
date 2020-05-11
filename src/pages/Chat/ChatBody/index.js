import React from 'react'
import signup_flow from '../utils/signup_flow'
import consultation_flow from '../utils/consultation_flow'
import UserInputMessage from '../../../components/UserInputMessage'
import HygeiaMessageRenderer from './Hygeia'
import UserForm from './UserForm'
import _ from 'lodash'

let conversationFlow = signup_flow
export default class ChatBody extends React.Component {
  constructor(props) {
    super(props)

    this.state = { readyStep: [], currentFormIndex: 0, responses: {} }
    this.runSteps = this.runSteps.bind(this)
    this.newChat = this.newChat.bind(this)

    this.runSteps(0)
    this.props.onLoadForms(conversationFlow.length)
    this.props.onProgress(1)
  }

  newChat() {
    conversationFlow = consultation_flow
    this.setState({ readyStep: [], currentFormIndex: 0, responses: {} })
    this.runSteps(0)
    this.props.onLoadForms(conversationFlow.length)
    this.props.onProgress(1)
  }

  bufferedMessage(message) {
    return new Promise((resolve) => {
      setTimeout(function() { resolve(message) }, 1000);
    })
  }

  runMessages(messages, i) {
    return new Promise(async (resolve) => {
      if(i < messages.length) {
          let messageBuffered = await this.bufferedMessage(messages[i])
          let dependencyFormData, dependencyFormKey
          let isResponseDependent = messageBuffered.type === 'text-response-dependent' || messageBuffered.type === 'boolean-response-dependent'
          if(isResponseDependent) {
            dependencyFormData = this.state.previousFormData
            dependencyFormKey = this.state.dependencyFormKey
          } 

          let stepMessageData = { from: 'hygeia', message: messageBuffered, dependencyFormData, dependencyFormKey }
          let newReadyStep = [ ...this.state.readyStep, stepMessageData ]
          if(isResponseDependent && this.state.hasFormData &&  !(!this.state.dependencyFormKey)) {
            let findMessageIndex = _.findIndex(this.state.readyStep, (item) => { 
              return (typeof item.dependencyFormKey !== undefined) && (item.dependencyFormKey === this.state.dependencyFormKey)
            })
            if(findMessageIndex >= 0) {
              newReadyStep = newReadyStep.slice(0, findMessageIndex)
              newReadyStep = [ ...newReadyStep, stepMessageData ]
            } 
          } 

          this.setState({ readyStep: newReadyStep })
          resolve(this.runMessages(messages, i+1))
      } else {
        resolve()
      }
    })
  }

  runStepConversation(conversation, ci, code) {
    return new Promise(async (resolve) => {
      if(ci < conversation.length) {
        let convo = conversation[ci]
        if(convo.from === 'hygeia') {
          await this.runMessages(convo.messages, 0)
          this.runStepConversation(conversation, ci+1, code)
        } else {
          await this.bufferedMessage(true)
          let newData = { ...convo, code: code }
          let newReadyStep = [ ...this.state.readyStep, newData ]
          this.setState({ readyStep: newReadyStep })
          this.runStepConversation(conversation, ci+1, code)
        }
      } else {
        resolve()
      }
    })
  }

  runSteps(index) {
    return new Promise(async (resolve) => {
      if(index < conversationFlow.length) {
        let step = conversationFlow[index]
        await this.runStepConversation(step.conversation, 0, step.code)
        resolve(this.runSteps(index+1))
      } else {
        resolve()
      }
    })
  }

  setFormData(formKey, formData) {
    this.setState({ [formKey]: formData })
  }

  handleNext(formKey, code, formData) {
    let nextFormIndex
    conversationFlow.forEach((flow, i) => {
      if(flow.code === code) {
        nextFormIndex = i + 1
      }
    })

    let hasFormData = formData ? true : false
    this.props.onProgress(nextFormIndex+1)

    let responses = { ...this.state.responses, [code]: formData }
    localStorage.setItem('responses', JSON.stringify(responses))
    this.setState({ previousFormData: formData, hasFormData, 
      dependencyFormKey: formKey, [formKey]: formData,
      responses: responses
    })
    this.runSteps(nextFormIndex)
  }

  handleRedirectButtons(data) {

  }

  render() {
    const { readyStep } = this.state

    return (
      <div className='ChatBody'>
        {
          readyStep.map((step, i) => {
            if(step.from === 'hygeia') {
              return <HygeiaMessageRenderer key={`message-${i}`} 
                {...step}
              />
            } else {
              return (<UserInputMessage key={`message-${i}`}>
                  <UserForm code={step.code}
                    handleNext={this.handleNext.bind(this)}
                    inputs={step.userForm.inputs} 
                    formKey={step.userForm.onSuccessAction} 
                    setFormData={this.setFormData.bind(this)}
                    handleRedirectButtons={this.handleRedirectButtons.bind(this)}
                    newChat={this.newChat}
                  />
                </UserInputMessage>
              )
            }
          })
        }
      </div>
    )
  }
}
