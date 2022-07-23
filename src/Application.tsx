import React, { useEffect } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { verb } from './stores/verbs'
import { VerbView } from './Verb'
import { useStore } from 'effector-react'

export const Application = () => {
  useEffect(() => {
    verb.init(verbs)
  }, [])

  const verbs = useStore(verb.store)

  return (
    <div>
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header size='huge'>English grammar</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={10}>
            <VerbView verb={verbs[0]} />
          </Grid.Column>
          <Grid.Column width={3}></Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}