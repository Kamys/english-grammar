import {Table, Grid, Button} from 'semantic-ui-react'
import {VerbRow} from "./VerbRow";
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {keyBy, mapValues} from "lodash";
import {Verb, VerbError} from "./Type";

export const TableVerbs = ({verbDictionary}) => {
    let withoutAnswer = useMemo(() => {
        return mapValues<Verb>(verbDictionary, verb => ({ ...verb, v2: '', v3: '', translate: ''}))
    }, [verbDictionary])

    let [answers, setAnswers] = useState(withoutAnswer)

    useEffect(() => {
        setAnswers(withoutAnswer)
    }, [withoutAnswer])

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
                translate: !verb.translate.split(", ").includes(answer.translate),
                correctAnswer: {
                    translate: verb.translate,
                    v2: verb.v2,
                    v3: verb.v3
                }
            }
        })

        setErrors(newErrors)
    }, [answers])


    let handleRestart = useCallback(() => {
        setAnswers(withoutAnswer)
        setErrors([])
    }, [answers])

    console.log('verbDictionary: ', verbDictionary)
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={10}>
                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='5'>Irregular verbs v2</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                Object.values(answers).map(verb => {
                                    console.log(verb.v1, ' = ', verbDictionary[verb.v1])
                                    return (
                                      <VerbRow
                                        key={verb.v1}
                                        value={verb}
                                        onChange={handleAnswer}
                                        error={errorDictionary[verb.v1] || {}}
                                        correctAnswer={verbDictionary[verb.v1] || {}}
                                      />
                                    )
                                })
                            }
                        </Table.Body>
                    </Table>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Button positive onClick={handleCheck}>Submit</Button>
                    <Button positive onClick={handleRestart}>Restart</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}