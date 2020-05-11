import React from 'react'
import './user-message.scss'

export default function UserInputMessage({ children }) {
  return (
    <div className='user-input-message messages'>
      { children }
    </div>
  )
}