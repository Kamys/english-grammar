import { partition } from 'lodash'
import { needCorrectAnswer } from './constants'
import { Verb } from './Models'
import { $answers } from './appState'
import dayjs from 'dayjs'

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
  return dayjs(dateValue).isToday()
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