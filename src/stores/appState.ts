import { createEvent, createStore } from 'effector-logger'
import { Answer, AppState, Verb } from './Models'

export const onInitAppState = createEvent<AppState>()
export const onSortVerb = createEvent()
export const onInitAnswers = createEvent<Answer[]>()
export const onUserAnswer = createEvent()
export const onUserNextQuestion = createEvent()
export const initVerbsForToday = createEvent<Verb[]>()
export const calcVerbsForToday = createEvent()

export const $answers = createStore<Answer[]>([])
  .on(onInitAnswers, (_, answers)  => answers)

onInitAppState.watch((appState) => {
  onInitAnswers(appState.answers)
  initVerbsForToday(appState.verbsForToday)
  if (appState.verbsForToday.length === 0) {
    calcVerbsForToday()
    onSortVerb()
  }
})