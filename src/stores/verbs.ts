import { combine, createEvent, createStore } from 'effector'
import sourceVerbs from '../sourceVerbs'

export interface Verb {
  v1: string
  v2: string
  v3: string
  translate: string
  score: number
}

export const $verbs = createStore<Verb[]>(sourceVerbs)
export const $allVerbs = createStore<Verb[]>(sourceVerbs)

export const onUserAnswer = createEvent()
export const onUserNextQuestion = createEvent()
