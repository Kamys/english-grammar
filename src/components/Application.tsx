import React from 'react'

import { onNextQuestion, onShowCorrectAnswer } from '../stores/verbs'
import { VerbView } from './Verb'
import { useStore } from 'effector-react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createStore } from 'effector'
import { $hasErrors } from '../stores/answerForm'
import { $currentQuestion } from '../stores/answerStatistic'
import { Answers } from './Answers'

export const Application = () => {
  return (
    <Container className='h-100 d-flex flex-column align-items-center'>
      <Row className='d-flex justify-content-center mt-5'>
        <h1>English grammar</h1>
      </Row>
      <VerbContainer />
      <Row>
        <Answers />
      </Row>
    </Container>
  )
}

const VerbContainer = () => {
  const currentVerb = useStore($currentQuestion)

  if (!currentVerb) {
    return (
      <>
        <Row>
          Слова на сегодня выучены
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
      <Row>
        <Col md className='d-flex justify-content-center mt-3'>
          <NextButton />
        </Col>
      </Row>
    </>
  )
}

export enum NextButtonState {
  CHECK_ANSWER,
  NEXT_QUESTION,
}

export const $nextButtonState = createStore<NextButtonState>(NextButtonState.CHECK_ANSWER)
  .on(onShowCorrectAnswer, () => NextButtonState.NEXT_QUESTION)
  .on(onNextQuestion, () => NextButtonState.CHECK_ANSWER)

const NextButton = () => {
  const state = useStore($nextButtonState)
  const hasErrors = useStore($hasErrors)

  if (state == NextButtonState.NEXT_QUESTION) {
    return <Button disabled={hasErrors} onClick={() => onNextQuestion()}>Go to next question!</Button>
  }

  return <Button onClick={() => onShowCorrectAnswer()}>Check!</Button>
}