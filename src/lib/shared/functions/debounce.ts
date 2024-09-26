export function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: any): Promise<any> => {
    if (timeout !== null) clearTimeout(timeout)

    return new Promise((resolve, reject) => {
      timeout = setTimeout(async () => {
        try {
          const result = await func(...args)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      }, wait)
    })
  }
}
