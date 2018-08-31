export default {
  fetch: async (input, init) => {
    const response = await fetch(input, init)

    if (response.status === 204) {
      return null
    }

    const data = await response.json()

    if (!response.ok) {
      const error = new Error(data.error.message)
      error.response = data

      throw error
    }

    return data
  }
}
