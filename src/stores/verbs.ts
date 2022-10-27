import { createEvent, createStore } from 'effector-logger'
import sourceVerbs from '../sourceVerbs'

export interface Verb {
  v1: string
  v2: string
  v3: string
  translate: string
  score: number
}

export const onUserAnswer = createEvent()
export const onUserNextQuestion = createEvent()

onUserNextQuestion.watch(() => {
  console.log("=============== NextQuestion ===============")
})

export const initVerbsForToday = createEvent<Verb[]>()
export const calcVerbsForToday = createEvent()

export const $verbsLearning = createStore<Verb[]>([])
  .on(initVerbsForToday, (_, verbs) => verbs)
export const $verbsForToday = createStore<Verb[]>([])
  .on(initVerbsForToday, (_, verbs) => verbs)
export const $verbsAll = createStore<Verb[]>(sourceVerbs)