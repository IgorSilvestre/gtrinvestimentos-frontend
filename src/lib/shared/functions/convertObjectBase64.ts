
export function convertBase64ToObject(str: string) {
  return JSON.parse(atob(str))
}


export function convertObjectToBase64(obj: object) {
  return btoa(JSON.stringify(obj));
}
