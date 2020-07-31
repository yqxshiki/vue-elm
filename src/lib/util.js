
export const imgUrl = () => {
  return "https://elm.cangdu.org/img/"
}


export const localSetItem = (key, value) => {
  localStorage.setItem(key, value)
}

export const localGetItem = (key) => {
  return localStorage.getItem(key)
}