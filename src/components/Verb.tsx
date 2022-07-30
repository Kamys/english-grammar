import * as React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Verb } from '../stores/verbs'
import { ChangeEvent } from 'react'
import { useStore } from 'effector-react'
import { $answerForm, $answerFormErrors, $showValidation, onChangeV2, onChangeV3 } from '../stores/answerForm'

interface Props {
  verb: Verb,
}

const onChange = (event: ChangeEvent<HTMLInputElement>) => event.target.value

export const VerbView: React.FC<Props> = ({ verb }) => {
  const forms = useStore($answerForm)
  const errors = useStore($answerFormErrors)
  const showValidation = useStore($showValidation)

  return (
    <Form noValidate>
      <Row>
        <Col xs={12} className='d-flex justify-content-center'>
          <h3>{verb.v1}</h3>
        </Col>
        <Col xs={6}>
          <Form.Group>
            <Form.Control
              placeholder='V2'
              value={forms.v2}
              onChange={onChangeV2.prepend(onChange)}
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
              onChange={onChangeV3.prepend(onChange)}
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