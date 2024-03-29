import React from 'react'
import { useStore } from 'effector-react'
import { ListGroup } from 'react-bootstrap'
import { $verbsForToday } from '../stores'
import { partition, sortBy } from 'lodash'
import { $answers } from '../stores'
import { getVerbScore } from '../stores'
import { $verbsLearned } from '../stores'

export const Answers = () => {
  const verbs = useStore($verbsForToday)
  const answers = useStore($answers)
  const verbsLearned = useStore($verbsLearned)

  const items = sortBy(verbs, (a) => getVerbScore(a))
    .sort()
    .map(verb => {
    const answerByVerb = answers.filter(v => v.v1 == verb.v1)
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
      <div>Today you learned {verbsLearned.length} words</div>
      {items}
    </ListGroup>
  )
}