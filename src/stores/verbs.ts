import { createStore } from 'effector-logger'
import sourceVerbs from '../sourceVerbs'
import { Verb } from './Models'
import { isDoneOnToday } from './utils'
import { initVerbsForToday, onUserNextQuestion } from './appState'

onUserNextQuestion.watch(() => {
  console.log("=============== NextQuestion ===============")
})

export const $verbsLearning = createStore<Verb[]>([])
  .on(initVerbsForToday, (_, verbs) => verbs.filter(v => !isDoneOnToday(v)))
export const $verbsForToday = createStore<Verb[]>([])
  .on(initVerbsForToday, (_, verbs) => verbs)
export const $verbsAll = createStore<Verb[]>(sourceVerbs)