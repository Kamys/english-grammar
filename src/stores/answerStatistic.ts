import { combine, createStore } from 'effector/effector.cjs'
import { $hasErrors } from './answerForm'
import { $verbs, Answer, onNextQuestion, onShowCorrectAnswer } from './verbs'
import { getVerbStatistic } from './utils'

export const $answerStatistic = createStore<Answer[]>([])

$answerStatistic.on(onShowCorrectAnswer, state => {
  const hasError = $hasErrors.getState()
  const currentQuestion = $currentQuestion.getState()
  const answer: Answer = {
    key: currentQuestion.v1,
    isCorrect: !hasError,
    createAt: Date.now(),
  }

  return [...state, answer]
})

$answerStatistic.watch((state) => {
  console.log('$answerStatistic: ', state)
})

export const $currentIndex = createStore<number>(0)
  .on(onNextQuestion, (currentIndex) => {
    const verbs = $verbs.getState()
    const answerStatistic = $answerStatistic.getState()
    const verbStatistic = getVerbStatistic(answerStatistic)
    console.log('verbStatistic: ', verbStatistic)
    const withoutCorrectAnswer = Object.values(verbStatistic).filter( s => s.correct <= 0 )[0]
    const withoutCorrectAnswerVerb = verbs.findIndex( v => v.v1 == withoutCorrectAnswer?.key )
  })

export const $currentQuestion = combine($verbs, $currentIndex, (verbs, currentIndex) => {
  return verbs[currentIndex]
})