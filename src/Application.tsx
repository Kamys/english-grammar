import React, { useEffect } from 'react'
import { verb } from './stores/verbs'
import { VerbView } from './Verb'
import { useStore } from 'effector-react'
import sourceVerbs from './sourceVerbs'

export const Application = () => {
  useEffect(() => {
    console.log("Send sourceVerbs " + sourceVerbs[0])
    verb.init(sourceVerbs)
  }, [])

  const verbs = useStore(verb.store)
  const currentVerb = verbs[0]

  console.log("Hello")

  return (
    <div>
      <h1>English grammar</h1>
      {currentVerb && <VerbView verb={currentVerb} />}
    </div>
  )
}