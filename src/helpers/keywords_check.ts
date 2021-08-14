
import { keywords } from "sw-legion-data/lib/keywords";


export const findKeyword = (keyword: string): (string | undefined) => {
  let result = undefined
  if (keyword.length > 2) {
    let casedKeyword = (keyword.slice(0, 1).toUpperCase() + keyword.slice(1, keyword.length))

    let found = keywords.find(k => k.name.startsWith(casedKeyword))
    if (found) {
      result = `keyword: ${found.name}\n${found.description}`
    }
  }

  return result
}