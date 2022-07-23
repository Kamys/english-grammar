import React, { useMemo, useState } from 'react'
import { keyBy, shuffle } from 'lodash'
import verbs from './verbs'
import { Verb } from './Type'
import { TableVerbs } from './TableVerbs'
import { Select } from 'semantic-ui-react'

export const Application = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const verbDictionary = useMemo(() => {
    const subVerbs = verbs.slice((10 * currentPage) - 10, 10 * currentPage)
    return keyBy<Verb>(shuffle(subVerbs), verb => verb.v1)
  }, [verbs, currentPage])

  const pageOptions = [
    { key: '1', value: '1', text: '1' },
    { key: '2', value: '2', text: '2' },
    { key: '3', value: '3', text: '3' },
    { key: '4', value: '4', text: '4' },
    { key: '5', value: '5', text: '5' },
    { key: '6', value: '6', text: '6' },
    { key: '7', value: '7', text: '7' },
    { key: '8', value: '8', text: '8' },
    { key: '9', value: '9', text: '9' },
  ]

  console.log('verbDictionary: ', verbDictionary)

  return (
    <div>
      <Select
        defaultValue={currentPage.toString()}
        value={currentPage.toString()}
        placeholder='Select page'
        options={pageOptions}
        onChange={(event, data) => setCurrentPage(data.value as number)} />
      <TableVerbs verbDictionary={verbDictionary} />
    </div>
  )
}