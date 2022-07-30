import { combine, createEvent, createStore } from 'effector'
import sourceVerbs from '../sourceVerbs'

export interface Verb {
  v1: string,
  v2: string,
  v3: string
  translate: string
}

export interface Answer {
  v1: string,
  v2: string,
  v3: string
  translate: string
}

export const $verbs = createStore<Verb[]>(sourceVerbs)

export const onShowCorrectAnswer = createEvent()

export const onNextQuestion = createEvent()

export const $currentIndex = createStore<number>(0)
  .on(onNextQuestion, (currentIndex) => currentIndex + 1)

export const $currentQuestion = combine($verbs, $currentIndex, (verbs, currentIndex) => {
  return verbs[currentIndex]
})

export const toAnswer = createEvent<Answer>()

export const $answers = createStore<Record<string, Answer>>({})
  .on(toAnswer, (answers, newAnswer) => ({ ...answers, [newAnswer.v1]: newAnswer }))
