import React from 'react'
import { useStore } from 'effector-react'
import { ListGroup } from 'react-bootstrap'
import { $allVerbs } from '../stores/verbs'
import { getVerbAnswers } from '../stores/utils'
import { partition } from 'lodash'
import { $answers } from '../stores/answerStatistic'

export const Answers = () => {
  const verbs = useStore($allVerbs)
  const answers = useStore($answers)

  const items = verbs.map(verb => {
    const answerByVerb = answers.filter(v => v.v1 == verb.v1)
    console.log(verb.v1 + " => ", answerByVerb)
    const [correctAnswers, incorrectAnswers] = partition(answerByVerb, answer => answer.isCorrect)
    return (
      <ListGroup.Item
        key={verb.v1}
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{verb.v1}</div>
          Correct: {correctAnswers.length} Incorrect: {incorrectAnswers.length}
        </div>
      </ListGroup.Item>
    )
  })

  return (
    <ListGroup as="ol" numbered>
      {items}
    </ListGroup>
  )
}