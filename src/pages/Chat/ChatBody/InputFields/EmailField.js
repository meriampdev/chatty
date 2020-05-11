import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'

export default function EmailField(props) {
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
  const onChange = (e, item) => {
    setValue(e.target.value)
    setValidation({})
    props.onInputChange(e.target.value, item)
  }

  return (
    <div className='input-wrapper'>
      <TextField 
        onChange={(e) => onChange(e, item)}
        type={item.inputType} label={item.label} 
        variant="outlined" size="small" fullWidth 
        error={validation.error}
        helperText={validation.message}
      />
    </div>
  )
}