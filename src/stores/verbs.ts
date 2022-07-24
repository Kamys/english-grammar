import { createEvent, createStore } from 'effector'
import { Verb } from '../Type'

export const init = createEvent<Verb[]>('name')

const store = createStore<Verb[]>([])

store.on(init, (_, newVerbs) => newVerbs)


export const verb = {
  init,
  store
}
