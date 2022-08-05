import { Verb } from './stores/verbs'
import { shuffle } from 'lodash'

const sourceVerbs: Verb[] = [
  {
    "v1": "dig",
    "v2": "dug",
    "v3": "dug",
    "translate": "копать, рыть"
  },
  {
    "v1": "know",
    "v2": "knew",
    "v3": "known",
    "translate": "знать, иметь представление"
  },
  {
    "v1": "sweep",
    "v2": "swept",
    "v3": "swept",
    "translate": "мести, подметать, смахивать"
  },
  {
    "v1": "mean",
    "v2": "meant",
    "v3": "meant",
    "translate": "значить, иметь в виду, подразумевать"
  },
]

export default shuffle(sourceVerbs)