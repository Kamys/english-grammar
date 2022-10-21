import { combine, createEvent, createStore } from 'effector'
import { onNextQuestion, onShowCorrectAnswer } from './verbs'
import { $currentQuestion } from './answerStatistic'

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
  .on(onNextQuestion, () => initial)

export const $showValidation = createStore(false)
  .on(onShowCorrectAnswer, () => true)
  .on(onNextQuestion, () => false)

export const $answerFormErrors = combine($currentQuestion, $answerForm, (currentQuestion, answerForm) => {

  if (!currentQuestion) {
    return {} as AnswerFormErrors
  }

  const errors: AnswerFormErrors = {
    v2: currentQuestion.v2 != answerForm.v2 ? currentQuestion.v2 : null,
    v3: currentQuestion.v3 != answerForm.v3 ? currentQuestion.v3 : null
  }
  return errors
})

export const $hasErrors = combine($answerFormErrors, (answerFormErrors) => {
  return !Object.values(answerFormErrors).every(value => value === null)
})
