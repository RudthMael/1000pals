export default {
  fetch: async (input, init) => {
    const response = await fetch(input, init)

    if (response.status === 204) {
      return null
    }

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      let error = null

      try {
        const data = await response.json()
        error = new Error(data.error.message)
        error.response = data
      } catch (e) {
        error = new Error('Api error')
      }

      throw error
    }
  }
}
