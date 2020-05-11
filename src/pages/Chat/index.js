import React, { useState } from 'react'
import './styles/index.scss'
import Header from '../../components/Header'
import ChatBody from './ChatBody'
import ProgressBar from './ProgressBar'

export default function Chat(props) {
  const [ progress, setProgress ] = useState(0)
  const [ stepsCount, setStepsCount ] = useState(0)

  const onProgress = (progress) => {
    setProgress(progress)
  }

  const onLoadForms = (count) => {
    setStepsCount(count)
  }

  return (
    <div className='Chat'>
      <Header />
      <ChatBody onProgress={onProgress} onLoadForms={onLoadForms} />
      {
        progress ? 
          <div className="footer-progress">
            <ProgressBar progress={progress} stepsCount={stepsCount} />
          </div>
        : null
      }
    </div>
  )
}