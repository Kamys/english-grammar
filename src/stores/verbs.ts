import { combine, createEvent, createStore } from 'effector'
import sourceVerbs from '../sourceVerbs'

export interface Verb {
  v1: string,
  v2: string,
  v3: string
  translate: string
}

export interface Answer {
  key: string
  createAt: number
  isCorrect: boolean
}

export const $verbs = createStore<Verb[]>(sourceVerbs)

export const onShowCorrectAnswer = createEvent()

export const onNextQuestion = createEvent()
