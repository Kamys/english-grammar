import { $hasErrors } from './answerForm'
import { $verbsLearning } from './verbs'
import { combine, createStore, createEvent } from 'effector-logger'
import { countCorrectAnswerToday, getVerbScore } from './utils'
import axios from 'axios'
import { $answers, onSortVerb, onUserAnswer, onUserNextQuestion } from './appState'
import { AppState } from './Models'

$answers.on(onUserAnswer, answers => {
  const hasError = $hasErrors.getState()
  const currentQuestion = $currentQuestion.getState()

  return [
    ...answers,
    {
      v1: currentQuestion.v1,
      isCorrect: !hasError,
      createdAt: Date.now(),
    },
  ]
})

onUserAnswer.watch(() => {
  const answers = $answers.getState()
  const verbsLearning = $verbsLearning.getState()

  const appState: AppState = {
    answers: answers,
    verbsForToday: verbsLearning,
  }

  axios.post('http://localhost:3000/state-save', appState)
})

$verbsLearning.on(onSortVerb, verbs => {
  const verbsForToday = verbs.filter(verb => countCorrectAnswerToday(verb) < 2)

  return verbsForToday.sort((a, b) => getVerbScore(a) - getVerbScore(b))
})

onUserNextQuestion.watch(() => {
  if ($hasNextQuestion.getState()) {
    onNextCurrentIndex()
  } else {
    onSortVerb()
  }
})

export const onNextCurrentIndex = createEvent()

export const $currentIndex = createStore<number>(0)
  .on(onNextCurrentIndex, currentIndex => currentIndex + 1)
  .on(onSortVerb, () => 0)

export const $currentQuestion = combine($verbsLearning, $currentIndex, (verbs, currentIndex) => {
  const a = verbs[currentIndex] || null
  console.log('$currentQuestion: ', a, { verbs: { ...verbs }, currentIndex })
  return a
})

export const $hasNextQuestion = combine($verbsLearning, $currentIndex, (verbs, currentIndex) => {
  return !!verbs[currentIndex + 1]
})