import * as React from 'react'
import { Verb } from './Type'

interface Props {
  verb: Verb,
}

export const VerbView: React.FC<Props> = ({ verb }) => {
  return (
    <div>
      {verb.v1}
    </div>
  )
}