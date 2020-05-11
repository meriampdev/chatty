import React, { useState, useEffect } from 'react'
import HygeiaMessage from '../../../components/HygeiaMessage'
import TypingIndicator from '../../../components/TypingIndicator'
import Button from '@material-ui/core/Button'

export default function Hygeia({ message, dependencyFormData }) {
  const [ component, setComponent ] = useState(<TypingIndicator />)
  const [ bufferDone, setBuffer ] = useState(false)
  const messageType = (messageData) => {
    switch(messageData.type) {
      case 'message':
        return <HygeiaMessage text={messageData.text} />
      case 'text-response-dependent':
      {
        let value = dependencyFormData ? dependencyFormData[messageData.inputKey] : ''
        let messageText = messageData.text.replace('${'+`${messageData.inputKey}`+'}', value)
        return <HygeiaMessage text={messageText} />
      }
      case 'boolean-response-dependent':
      {
        let value = dependencyFormData ? dependencyFormData[messageData.inputKey] : 0
        let scenario = messageData.scenarios[value]
        return messageType(scenario)
      }
      case 'redirect-button':
      {
        let elements = messageData.buttons.map((btn, i) => {
          return <Button key={`btn-${i}`} variant="contained" color="primary" disableElevation>{btn.label}</Button>
        })
        return <HygeiaMessage text={elements} />
      }
      default: return null
    }
  }

  useEffect(() => {
    if(!bufferDone) {
      setTimeout(function() {
        setBuffer(true)
      }, 1000);
    } else {
      let comp = messageType(message)
      setComponent(comp)
    }
  },[bufferDone, message, dependencyFormData])
  
  return component
}