import React, { useEffect, useState } from 'react'

import { onUserNextQuestion, onUserAnswer } from '../stores/verbs'
import { VerbView } from './Verb'
import { useStore } from 'effector-react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createStore } from 'effector'
import { $hasErrors } from '../stores/answerForm'
import { $currentQuestion, onInitAnswers, onSortVerb } from '../stores/answerStatistic'
import { Answers } from './Answers'
import axios from 'axios'

export const Application = () => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3000/answers').then(response => {
        setLoading(false)
        onInitAnswers(response.data)
        onSortVerb()
      },
    )
  }, [])

  if (isLoading) {
    return <Spinner animation='grow' />
  }

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