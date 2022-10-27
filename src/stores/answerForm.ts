import { combine, createEvent, createStore } from 'effector-logger'
import { $verbsAll } from './verbs'
import { $currentQuestion } from './answerStatistic'
import { getVerbScore, isDoneOnToday } from './utils'
import { needLeanWordTodayCount } from './constants'
import { $answers, calcVerbsForToday, initVerbsForToday, onUserAnswer, onUserNextQuestion } from './appState'

interface AnswerForm {
  v2: string
  v3: string
}

interface AnswerFormErrors {
  v2: string | null
  v3: string | null
}

export const onChangeV2 = createEvent<string>()
export const onChangeV3 = createEvent<string>()

const initial = { v2: '', v3: '' }
export const $answerForm = createStore<AnswerForm>(initial)
  .on(onChangeV2, (state, payload) => ({ ...state, v2: payload }))
  .on(onChangeV3, (state, payload) => ({ ...state, v3: payload }))
  .on(onUserNextQuestion, () => initial)

export const $answerFormErrors = combine($currentQuestion, $answerForm, (currentQuestion, answerForm) => {
  if (!currentQuestion) {
    return {} as AnswerFormErrors
  }

  const errors: AnswerFormErrors = {
    v2: currentQuestion.v2 != answerForm.v2 ? currentQuestion.v2 : null,
    v3: currentQuestion.v3 != answerForm.v3 ? currentQuestion.v3 : null,
  }
  return errors
})

export const $hasErrors = combine($answerFormErrors, (answerFormErrors) => {
  return !Object.values(answerFormErrors).every(value => value === null)
})

export const $verbsLearned = combine($verbsAll, $answers, (verbsAll) => {
  return verbsAll.filter(isDoneOnToday)
})

calcVerbsForToday.watch(() => {
  const verbsAll = $verbsAll.getState()
  const verbsLearned = $verbsLearned.getState()
  const answers = $answers.getState()

  const needLeanWordCount = needLeanWordTodayCount - verbsLearned.length
  console.log(needLeanWordCount)


  if(needLeanWordCount <= 0) {
    initVerbsForToday([])
    return
  }

  const verbForToday = verbsAll
    .filter(v => !isDoneOnToday(v))
    .sort((a, b) => getVerbScore(a) - getVerbScore(b))
    .slice(0, needLeanWordCount)
  initVerbsForToday(verbForToday)
})

export enum QuestionFormStateState {
  WAITING_ANSWER,
  ANSWERED,
}

export const $nextFormState = createStore<QuestionFormStateState>(QuestionFormStateState.WAITING_ANSWER)
  .on(onUserAnswer, () => QuestionFormStateState.ANSWERED)
  .on(onUserNextQuestion, () => QuestionFormStateState.WAITING_ANSWER)
