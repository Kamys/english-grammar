import { combine, createStore } from 'effector/effector.cjs'
import { $hasErrors } from './answerForm'
import { $verbs, onNextQuestion, onShowCorrectAnswer, onSortVerb } from './verbs'
import { createEvent } from 'effector'
import { countCorrectAnswerToday, getVerbScore } from './utils'

interface Answer {
  v1: string
  createdAt: number
  isCorrect: boolean
}

export const $answers = createStore<Answer[]>([])

$answers.on(onShowCorrectAnswer, answers => {
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

$verbs.on(onSortVerb, verbs => {
  const verbsForToday = verbs.filter(verb => countCorrectAnswerToday(verb) < 1)

  return verbsForToday.sort((a, b) => getVerbScore(a) - getVerbScore(b))
})

onNextQuestion.watch(() => {
  const currentIndex = $currentIndex.getState()
  const verbs = $verbs.getState()
  if (currentIndex >= verbs.length - 1) {
    onSortVerb()
  } else {
    onNextCurrentIndex()
  }
})

export const onNextCurrentIndex = createEvent()

export const $currentIndex = createStore<number>(0)
  .on(onNextCurrentIndex, currentIndex => currentIndex + 1)
  .on(onSortVerb, () => 0)

export const $currentQuestion = combine($verbs, $currentIndex, (verbs, currentIndex) => {
  return verbs[currentIndex] || null
})