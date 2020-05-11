import React, { useEffect, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup(props) {
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

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    let value = !isNaN(parseInt(event.target.value)) ? parseInt(event.target.value) : event.target.value
    setValue(value);
    setValidation({})
    // props.onRadioChange(value, props.item)
    props.onInputChange(value, props.item)
  };

  return (
    <div className='input-wrapper radio-input'>
      <FormControl error={validation.error} style={{padding: '10px', color: '#000'}} size="small">
        <FormLabel component="legend">{props.item.label}</FormLabel>
        <RadioGroup aria-label={props.item.key} name={props.item.key} value={value} onChange={handleChange} size="small">
          {
            props.item.options.map((option, i) => {
              return <FormControlLabel key={`${props.item.key}-radio-${i}`} value={option.value} 
                control={<Radio name={props.item.key} size="small" />} label={option.label} />
            })
          }
        </RadioGroup>
      </FormControl>
    </div>
  );
}