import { Verb } from './verbs'
import { partition } from 'lodash'
import { $answers } from './answerStatistic'
import { needCorrectAnswer } from './constants'

export const getVerbAnswers = (verb: Verb) => {
  const answers = $answers.getState()
  return answers.filter(v => v.v1 == verb.v1)
}

export const getVerbScore = (verb: Verb) => {
  const answerByVerb = getVerbAnswers(verb)
  const [correctAnswers, incorrectAnswers] = partition(answerByVerb, answer => answer.isCorrect)
  const score = correctAnswers.length - incorrectAnswers.length
  return score
}

const isToday = (dateValue: number) => {
  const today = new Date()
  const date = new Date(dateValue)
  return date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
}

export const isDoneOnToday = (verb: Verb) => {
  const answers = getVerbAnswers(verb)
  const correctAnswersToday = answers.filter(answer => answer.isCorrect && isToday(answer.createdAt))
  return correctAnswersToday.length >= needCorrectAnswer
}

export const countCorrectAnswerToday = (verb: Verb) => {
  return getVerbAnswers(verb)
    .filter(answer => answer.isCorrect && isToday(answer.createdAt))
    .length
}