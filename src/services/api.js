export default {
  fetch: async (input, init) => {
    const response = await fetch(input, init)
    const data = await response.json()

    if (!response.ok) {
      const error = new Error(data.result.error.message)
      error.result = data.result

      throw new Error(error)
    }

    return data
  }
}
