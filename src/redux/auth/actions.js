import { SIGN_UP, SIGN_IN } from './types'

export const signin = (payload) => {
  return {
    type: SIGN_IN,
    payload: payload
  }
}