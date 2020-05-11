import React, { useState, useEffect } from 'react'
import MuiPhoneNumber from 'material-ui-phone-number'

export default function ITextField(props) {
  const [ validation, setValidation ] = useState({})
  const { item } = props

  useEffect(() => {
    if(props.submitAttempt) {
      if(!props.validation) {
        let isRequired = (item.validations.filter((f) => f.required)).length >= 0
        if(isRequired) {
          setValidation({ error: true, message: 'This Field is Required.' })
        }
      } else {
        setValidation({ error: props.validation.error, message: props.validation.message })
      }
    }
  }, [props, item.validations])
  const [ value, setValue ] = useState("")

  const onPhoneChange = (value, countryData, item) => {
    setValue(value)
    setValidation({})
    props.onInputChange(value, item)
  }

  return (
    <div className='input-wrapper phone-input'>
      <MuiPhoneNumber 
        defaultCountry={'us'} value={value}
        onChange={(value, countryData) => onPhoneChange(value, countryData, item)} 
        error={validation.error}
        helperText={validation.message}
      />
    </div>
  )
}