import { combine, createStore } from 'effector/effector.cjs'
import { $hasErrors } from './answerForm'
import { $verbs, onUserNextQuestion, onUserAnswer } from './verbs'
import { createEvent } from 'effector'
import { countCorrectAnswerToday, getVerbScore } from './utils'
import axios from 'axios'

interface Answer {
  v1: string
  createdAt: number
  isCorrect: boolean
}

export const onSortVerb = createEvent()
export const onInitAnswers = createEvent()
export const $answers = createStore<Answer[]>([])
  .on(onInitAnswers, (_, answers)  => answers)

$answers.on(onUserAnswer, answers => {
  const hasError = $hasErrors.getState()
  const currentQuestion = $currentQuestion.getState()

  return [
    ...answers,
    {
      v1: currentQuestion.v1,
      isCorrect: !hasError,
      createdAt: Date.now(),
    },
  ]
})

onUserAnswer.watch(() => {
  const answers = $answers.getState()
  axios.post("http://localhost:3000/answers-save", answers)
    .then(() => {
      console.log("Answers save!")
    })
    .catch(() => {
      console.error("Failed answers save!")
    })
})

$verbs.on(onSortVerb, verbs => {
  const verbsForToday = verbs.filter(verb => countCorrectAnswerToday(verb) < 2)

  return verbsForToday.sort((a, b) => getVerbScore(a) - getVerbScore(b))
})

onUserNextQuestion.watch(() => {
  if ($hasNextQuestion.getState()) {
    onNextCurrentIndex()
  } else {
    onSortVerb()
  }
})

export const onNextCurrentIndex = createEvent()

export const $currentIndex = createStore<number>(0)
  .on(onNextCurrentIndex, currentIndex => currentIndex + 1)
  .on(onSortVerb, () => 0)

export const $currentQuestion = combine($verbs, $currentIndex, (verbs, currentIndex) => {
  return verbs[currentIndex] || null
})

export const $hasNextQuestion = combine($verbs, $currentIndex, (verbs, currentIndex) => {
  return !!verbs[currentIndex + 1]
})