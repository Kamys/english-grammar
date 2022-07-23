import * as React from 'react'
import { Verb } from './Type'
import { Grid, Input } from 'semantic-ui-react'

interface Props {
  verb: Verb,
}

export const VerbView: React.FC<Props> = ({ verb }) => {
  if (!verb) {
    return null
  }

  return (
    <div>
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={5}>
            {verb.v1}
          </Grid.Column>
          <Grid.Column width={5}>
            <Input value={verb.v2} />
          </Grid.Column>
          <Grid.Column width={5}>
            <Input value={verb.v3} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}