import { createEvent, createStore } from 'effector'
import { Verb } from '../Type'

const init = createEvent<Verb[]>()

const store = createStore<Verb[]>([])
.on(init, verbs => verbs)


export const verb = {
  init,
  store
}