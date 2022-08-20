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
  console.log("----Sort----")
  const newSort = [...verbs].sort((a, b) => a.score - b.score)
  console.log("old: " + verbs.map(v => v.v1 + " " + v.score))
  console.log("newSort: " + newSort.map(v => v.v1 + " " + v.score))
  return newSort
})

onNextQuestion.watch(() => {
  const currentIndex = $currentIndex.getState()
  const verbs = $verbs.getState()
  console.log(currentIndex)
  console.log("verbs.length " + verbs.length)
  if (currentIndex >= verbs.length - 1) {
    console.log("onSortVerb")
    onSortVerb()
  } else {
    console.log("onNextCurrentIndex")
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