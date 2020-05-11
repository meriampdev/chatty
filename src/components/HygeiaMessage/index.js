import React from 'react'
import './hygeia.scss'

export default function HygeiaMessage(props) {
  return (
    <div className='hygeia-message messages'>
      <p>{ props.text || 'From Hygeia' }</p>
    </div>
  )
}