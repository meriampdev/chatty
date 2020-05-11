import React from 'react'
import Button from '@material-ui/core/Button'

export default function ActionButtons(props) {
  const onClickBtn = (data) => {
    console.log('data', data)
    if(data.path) {
      window.open(`${window.location}${data.path}`, '_blank');
    }
  }
  return (
    <div className='input-wrapper'>
      {
        props.buttons.map((btn, actionIndex) => {
          let onClick = btn.newChat ? props.newChat : () => onClickBtn(btn)
          return <Button onClick={onClick} key={`btn-${actionIndex}`} variant="contained" color="primary" disableElevation style={{marginRight: '5px'}}>
            {btn.label}
          </Button>
        })
      }
    </div>
  )
}