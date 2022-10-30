import React, { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
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
  $hasErrors, needLeanWordTodayCount, needCorrectAnswer, $verbsLearned,
} from '../stores'

interface Props {

}

export const LearnTodayPage: React.FC<Props> = () => {
  const currentVerb = useStore($currentQuestion)
  const verbsLearned = useStore($verbsLearned).length

  if (!currentVerb) {
    return (
      <>
        <Row>
          You learned all words on today!
        </Row>
      </>
    )
  }

  return (
    <>
      <Row className='mt-5'>
        You need learn {needLeanWordTodayCount} words today. Answer correct {needCorrectAnswer} times on each word.
        <br/> Left: {needLeanWordTodayCount - verbsLearned}
      </Row>
      <Row className='mt-2'>
        <Col md={12}>
          <VerbView verb={currentVerb} />
        </Col>
      </Row>
      <Row className='d-flex justify-content-center mt-2'>
        <Col md='auto'>
          <VerbAudio verbV1={currentVerb.v1} />
        </Col>
        <Col md='auto'>
          <NextButton />
        </Col>
      </Row>
    </>
  )
}


const NextButton = () => {
  const state = useStore($nextFormState)
  const hasErrors = useStore($hasErrors)

  if (state == QuestionFormStateState.ANSWERED) {
    return <Button disabled={hasErrors} onClick={() => onUserNextQuestion()}>Next question!</Button>
  }

  return <Button onClick={() => onUserAnswer()}>Check!</Button>
}