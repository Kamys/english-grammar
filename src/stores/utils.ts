import { Answer } from './verbs'
import { groupBy, mapValues } from 'lodash'

type GetVerbStatisticResult = Record<string, { key: string, correct: number, incorrect: number }>
export const getVerbStatistic = (answers: Answer[]): GetVerbStatisticResult => {
  const mapAnswers = groupBy(answers, 'key')
  return mapValues(mapAnswers, (answers: Answer[], key: string) => {
    return {
      key: key,
      correct: answers.filter(a => a.isCorrect).length,
      incorrect: answers.filter(a => !a.isCorrect).length,
    }
  })
}