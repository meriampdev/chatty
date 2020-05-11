import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from './InputFields/TextField'
import DateInput from './InputFields/DateInput'
import EmailField from './InputFields/EmailField'
import RadioInput from './InputFields/RadioInput'
import PhoneNumber from './InputFields/PhoneNumber'
import ActionButtons from './InputFields/ActionButtons'

export default function UserForm(props) {
  const [ formData, setForm ] = useState({})
  const [ showNextButton, setShowNext ] = useState(true)
  const [ submitAttempt, setSubmitAttempt ] = useState(false)
  useEffect(() => {
    if(props.inputs) {
      let newFormData = formData
      props.inputs.forEach((input) => {
        newFormData = { ...newFormData, [input.key]: { value: null, validations: input.validations } }
      })
      setForm(newFormData)
    }
  }, [ props.inputs ])

  const onInputChange = (value, item) => {
    let newForm = { ...formData, [item.key]: { value: value, validations: item.validations } }
    setForm(newForm)
    // props.setFormData(props.formKey, item.key, e.target.value)
  }
  
  const renderInputType = (item, i) => {
    switch(item.inputType) {
      case 'text':
      case 'regex-validated':
        return <TextField onInputChange={onInputChange} item={item} 
          validation={formData[item.key]} submitAttempt={submitAttempt}
          {...props} key={`${props.formKey}-input-${i}`} />
      case 'radio':
        return <RadioInput item={item} onInputChange={onInputChange} {...props} 
          validation={formData[item.key]} submitAttempt={submitAttempt}
          key={`${props.formKey}-input-${i}`} />
      case 'phone-number':
        return <PhoneNumber item={item}
          validation={formData[item.key]} submitAttempt={submitAttempt}
          {...props} onInputChange={onInputChange} key={`${props.formKey}-input-${i}`} />
      case 'date':
        return <DateInput onInputChange={onInputChange} item={item} 
          validation={formData[item.key]} submitAttempt={submitAttempt}
          {...props} key={`${props.formKey}-input-${i}`} />
      case 'email':
        return <EmailField onInputChange={onInputChange} item={item} 
          validation={formData[item.key]} submitAttempt={submitAttempt}
          {...props} key={`${props.formKey}-input-${i}`} />
      case 'boolean-response-dependent':
      {
        let responses = localStorage.getItem('responses') ? JSON.parse(localStorage.getItem('responses')) : null
        if(responses) {
          let responseData = responses[item.stepCodeDependency] || null
          if(responseData) {
            // setShowNext(false)
            let actualResponse = responseData[item.dependencyKey]
            let scenario = item.scenarios[actualResponse]
            return <ActionButtons newChat={props.newChat} buttons={scenario.buttons} key={`${props.formKey}-input-${i}`} />
          }
        }
        return null
      }
      default: return null;
    }
  }

  const validate = () => {
    let newFormData = formData
    let results = []
    Object.keys(formData).map((key) => {
      let formItem = formData[key]
      if(formItem.validations) {
        formItem.validations.forEach((tester) => {
          let value = typeof formItem.value === 'number' ? formItem.value.toString() : formItem.value
          if(tester.required && !value) {
            let newItemData = { ...formItem, error: true, message: 'This Field is Required.' }
            newFormData = { ...newFormData, [key]: newItemData }
            results.push(false)
          } else if(tester.regex) {
            let isValid, newItemData, regex
            if(tester.regex === 'email') {
              regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            } else if(tester.regex === 'ssn') {
              regex = /^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/
            } else if(tester.regex === 'phone-number') {
              regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
            }

              let phone = formItem.value ? formItem.value.replace('+1 ', '') : ''
            let value = tester.regex === 'phone-number' ? phone : formItem.value
            isValid = regex.test(value)
            newItemData = { ...formItem, error: !isValid, message: !isValid ? 'Invalid Format.' : '' }
            newFormData = { ...newFormData, [key]: newItemData }
            results.push(isValid)
          }
        })
        setForm(newFormData)
      }
    })

    
    return results
  }

  const onClickNext = () => {
    setSubmitAttempt(true)
    let results = validate()
    if(!results.includes(false)) {
      let normalizeData = {}
      Object.keys(formData).map((key) => {
        normalizeData[key] = formData[key].value
      })
      // props.setFormData(props.formKey, normalizeData)
      props.handleNext(props.formKey, props.code, normalizeData)
    } 
    // props.handleNext(props.formKey, props.code)
  }

  return (
    <div className='user-message-input-wrapper'>
      {
        props.inputs.map((item, i) => {
          return renderInputType(item, i)
        })
      }

      {
        showNextButton ? 
          <div className='next-btn-wrapper'>
            <Button onClick ={onClickNext}
              variant="contained" color="primary" disableElevation fullWidth>Next</Button>
          </div>
        : null
      }
    </div>
  )
}