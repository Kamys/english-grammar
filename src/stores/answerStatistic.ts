import { combine, createStore } from 'effector/effector.cjs'
import { $hasErrors } from './answerForm'
import { $verbs, onNextQuestion, onShowCorrectAnswer, onSortVerb } from './verbs'
import { update, keyBy } from 'lodash'
import { createEvent } from 'effector'

export interface Statistic {
  [key: string]: number
}

export const $answerStatistic = createStore<Statistic>({})

$verbs.on(onShowCorrectAnswer, verbs => {
  const hasError = $hasErrors.getState()
  const currentQuestion = $currentQuestion.getState()
  const newScore = hasError ? -1 : 1

  const verbMap = keyBy(verbs, v => v.v1)
  const updatedMap = update(verbMap, currentQuestion.v1, (verb) => {
    return { ...verb, score: verb.score + newScore }
  })

  return Object.values(updatedMap)
})

$verbs.on(onSortVerb, verbs => {
  return [...verbs].sort((a, b) => a.score - b.score)
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
  return verbs[currentIndex]
})