import React, { useEffect } from 'react'

import { onUserNextQuestion, onUserAnswer, calcVerbsForToday } from '../stores/verbs'
import { VerbView } from './Verb'
import { useStore } from 'effector-react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createStore } from 'effector'
import { $hasErrors } from '../stores/answerForm'
import { $currentQuestion } from '../stores/answerStatistic'
import { AnswerLoading } from './AnswerLoading'
import { VerbAudio } from './VerbAudio'
import { Answers } from './Answers'

export const Application = () => {
  return (
    <Container className='h-100 d-flex flex-column align-items-center pt-3'>
      <AnswerLoading>
        <Row className='d-flex justify-content-center mt-5'>
          <h1>English grammar</h1>
        </Row>
        <VerbContainer />
        <Row>
          <Answers />
        </Row>
      </AnswerLoading>
    </Container>
  )
}

const VerbContainer = () => {
  const currentVerb = useStore($currentQuestion)

  useEffect(() => {
    calcVerbsForToday()
  }, [])

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

export enum QuestionFormStateState {
  WAITING_ANSWER,
  ANSWERED,
}

export const $nextFormState = createStore<QuestionFormStateState>(QuestionFormStateState.WAITING_ANSWER)
  .on(onUserAnswer, () => QuestionFormStateState.ANSWERED)
  .on(onUserNextQuestion, () => QuestionFormStateState.WAITING_ANSWER)

const NextButton = () => {
  const state = useStore($nextFormState)
  const hasErrors = useStore($hasErrors)

  if (state == QuestionFormStateState.ANSWERED) {
    return <Button disabled={hasErrors} onClick={() => onUserNextQuestion()}>Next question!</Button>
  }

  return <Button onClick={() => onUserAnswer()}>Check!</Button>
}