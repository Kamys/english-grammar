import {Table, Input} from 'semantic-ui-react'
import {Verb, VerbError} from "./Type";
import {FC, useCallback} from "react";

interface VerbViewProps {
    onChange: (verb: Verb) => void
    value: Verb,
    error: VerbError,
    correctAnswer: Verb,
}

const Answer = ({answer, label}) => {
    return (
        <div>
            <span style={{color: 'gray'}}>{label}: </span>
            {answer}
        </div>
    )
}

type VerbType = keyof Verb

export const VerbRow: FC<VerbViewProps> = ({onChange, value, error, correctAnswer}) => {

    let handleChange = useCallback((verbType: VerbType, verbText: string) => {
        onChange({
            ...value,
            [verbType]: verbText,
        })
    }, [onChange])

    let hasError = error.v2 || error.v3 || error.translate;

    return (
        <Table.Row>
            <Table.Cell>
                <Input value={value.v1}/>
            </Table.Cell>
            <Table.Cell>
                <Input error={error.v2} placeholder='V2' value={value.v2}
                       onChange={e => handleChange('v2', e.target.value)}/>
            </Table.Cell>
            <Table.Cell>
                <Input error={error.v3} placeholder='V3' value={value.v3}
                       onChange={e => handleChange('v3', e.target.value)}/>
            </Table.Cell>
            <Table.Cell>
                <Input
                    error={error.translate}
                    placeholder='translate'
                    value={value.translate}
                    onChange={e => handleChange('translate', e.target.value)}
                />
            </Table.Cell>
            <Table.Cell>
                <div style={{width: 200, display: hasError ? 'block' : 'none'}}>
                    <Answer label="V2" answer={correctAnswer.v2}/>
                    <Answer label="V3" answer={correctAnswer.v3}/>
                    <Answer label="Translate" answer={correctAnswer.translate}/>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}