

export interface VerbError {
    v1: string,
    v2: boolean,
    v3: boolean
    translate: boolean
    correctAnswer: {
        translate: string
        v2: string,
        v3: string
    }
}