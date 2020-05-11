import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput(props) {
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

  const [ value, setValue ] = useState(new Date())

  const onChangeDate = (value, item) => {
    setValue(value)
    setValidation({})
    props.onInputChange(value, item)
  }

  return (
    <div className={`input-wrapper date-input ${validation.error ? 'error-date' : ''}`}>
      <DatePicker selected={value} onChange={(e) => onChangeDate(e, item)} />
      {
        validation.error ? <div className='error-message'><span>{validation.message}</span></div> : null
      }
    </div>
  )
}