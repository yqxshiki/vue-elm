
export const imgUrl = () => {
  return "https://elm.cangdu.org/img/"
}


export const localSetItem = (value, key = "elm_cityinfo") => {
  localStorage.setItem(key, value)
}

export const localGetItem = (key = 'elm_cityinfo') => {
  return localStorage.getItem(key)
}