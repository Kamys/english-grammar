import { Verb } from './stores/verbs'
import { shuffle } from 'lodash'

const sourceVerbs: Verb[] = [
  {
    "v1": "dig",
    "v2": "dug",
    "v3": "dug",
    "translate": "копать, рыть",
    "score": 0,
  },
  {
    "v1": "know",
    "v2": "knew",
    "v3": "known",
    "translate": "знать, иметь представление",
    "score": 0,
  },
  {
    "v1": "sweep",
    "v2": "swept",
    "v3": "swept",
    "translate": "мести, подметать, смахивать",
    "score": 0,
  },
  {
    "v1": "mean",
    "v2": "meant",
    "v3": "meant",
    "translate": "значить, иметь в виду, подразумевать",
    "score": 0,
  },
]

export default shuffle(sourceVerbs)