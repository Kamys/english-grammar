import * as React from 'react'
import { ChangeEvent, useCallback } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { $nextFormState, QuestionFormStateState, Verb } from '../stores'
import { useStore } from 'effector-react'
import {
  $answerForm,
  $answerFormErrors,
  $hasErrors,
  onChangeV2,
  onChangeV3,
} from '../stores'

interface Props {
  verb: Verb,
}

export const VerbView: React.FC<Props> = ({ verb }) => {
  const forms = useStore($answerForm)
  const state = useStore($nextFormState)
  const errors = useStore($answerFormErrors)
  const hasErrors = useStore($hasErrors)
  const answerCorrect = state === QuestionFormStateState.ANSWERED && !hasErrors
  const showValidation = state === QuestionFormStateState.ANSWERED

  const handlerChangeV2 = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeV2(event.target.value)
  }, [])

  const handlerChangeV3 = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChangeV3(event.target.value)
  }, [])

  return (
    <Form noValidate validated={answerCorrect}>
      <Row>
        <Col xs={12} className='d-flex justify-content-center'>
          <h3>{verb.v1}</h3>
        </Col>
        <Col xs={6}>
          <Form.Group>
            <Form.Control
              placeholder='V2'
              value={forms.v2}
              onChange={handlerChangeV2}
              isInvalid={showValidation && !!errors.v2}

            />
            <Form.Control.Feedback type='invalid'>
              <h3>{errors.v2}</h3>
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group>
            <Form.Control
              placeholder='V3'
              value={forms.v3}
              onChange={handlerChangeV3}
              isInvalid={showValidation && !!errors.v3}
            />
            <Form.Control.Feedback type='invalid'>
              <h3>{errors.v3}</h3>
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )
}