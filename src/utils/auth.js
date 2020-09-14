import Cookies from 'js-cookie'

const TokenKey = 'cbw-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (agencyToken) {
  return Cookies.set(TokenKey, agencyToken)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
