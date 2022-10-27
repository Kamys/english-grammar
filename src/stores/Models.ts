export interface AppState {
  answers: Answer[]
  verbsForToday: Verb[]
}

export interface Answer {
  v1: string
  createdAt: number
  isCorrect: boolean
}

export interface Verb {
  v1: string
  v2: string
  v3: string
  translate: string
  score: number
}