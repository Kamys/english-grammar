import {Table, Input} from 'semantic-ui-react'
import {Verb, VerbError} from "~Application";
import {FC, useCallback} from "react";

interface VerbViewProps {
    onChange: (verb: Verb) => void
    value: Verb,
    error: VerbError,
}

type VerbType = keyof Verb

export const VerbRow: FC<VerbViewProps> = ({onChange, value, error}) => {

    let handleChange = useCallback((verbType: VerbType, verbText: string) => {
        onChange({
            ...value,
            [verbType]: verbText,
        })
    }, [onChange])

    return (
        <Table.Row>
            <Table.Cell>
                <Input value={value.v1} />
            </Table.Cell>
            <Table.Cell>
                <Input error={error.v2} placeholder='V2' value={value.v2} onChange={e => handleChange('v2', e.target.value)}/>
            </Table.Cell>
            <Table.Cell error={error.v3}>
                <Input placeholder='V3' value={value.v3} onChange={e => handleChange('v3', e.target.value)}/>
            </Table.Cell>
        </Table.Row>
    )
}