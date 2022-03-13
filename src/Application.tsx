import {Table, Grid, Button} from 'semantic-ui-react'
import {VerbRow} from "./VerbRow";
import React, {useCallback, useState} from "react";
import { keyBy, mapValues} from "lodash";

export interface Verb {
    v1: string,
    v2: string,
    v3: string
}

export interface VerbError {
    v1: string,
    v2: boolean,
    v3: boolean
}


let verbs: Verb[] = [
    {
        v1: "speak",
        v2: "spoke",
        v3: "spoken"
    },
    {
        v1: "break",
        v2: "broke",
        v3: "broken"
    },
]

let verbDictionary = keyBy<Verb>(verbs, verb => verb.v1)
let withoutAnswer = mapValues<Verb>(verbDictionary, verb => ({...verb, v2: '', v3: ''}))

export const Application = () => {
    let [answers, setAnswers] = useState(withoutAnswer)
    let [errors, setErrors] = useState<VerbError[]>([])
    let errorDictionary = keyBy<VerbError>(errors, verb => verb.v1)

    let handleAnswer = useCallback((verb: Verb) => {
        setAnswers({
            ...answers,
            [verb.v1]: verb
        })
    }, [answers])

    let handleCheck = useCallback(() => {
        let newErrors = Object.values(answers).map((answer): VerbError => {
            let verb = verbDictionary[answer.v1]
            return {
                v1: answer.v1,
                v2: verb.v2 !== answer.v2,
                v3: verb.v3 !== answer.v3,
            }
        })

        setErrors(newErrors)
    }, [answers])

    console.log(answers)
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={8}>
                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='3'>Irregular verbs</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                Object.values(answers).map(verb => (
                                    <VerbRow
                                        key={verb.v1}
                                        value={verb}
                                        onChange={handleAnswer}
                                        error={errorDictionary[verb.v1] || {}}
                                    />
                                ))
                            }
                        </Table.Body>
                    </Table>
                    <Button positive onClick={handleCheck}>Submit</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}