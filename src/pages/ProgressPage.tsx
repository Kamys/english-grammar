import React, { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Answers } from '../components/Answers'
import { useStore } from 'effector-react'
import { VerbView } from '../components/Verb'
import { VerbAudio } from '../components/VerbAudio'
import {
  $currentQuestion,
  $nextFormState,
  QuestionFormStateState,
  calcVerbsForToday,
  onUserAnswer,
  onUserNextQuestion,
  $hasErrors,
} from '../stores'

interface Props {

}

export const ProgressPage: React.FC<Props> = () => {
  return (
    <>
      <Row className='mt-5'>
        <Answers />
      </Row>
    </>
  )
}