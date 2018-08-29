import mongodb from 'mongodb'

const state = {
  db: null
}

const MongoClient = mongodb.MongoClient

export default {
  async connect() {
    if (!state.db) {
      const MONGODB_URI = process.env.MONGODB_URI
      const client = await MongoClient.connect(
        MONGODB_URI,
        { useNewUrlParser: true }
      )
      const dbName = MONGODB_URI.split(/\//).pop()

      state.db = client.db(dbName)
    }

    return state.db
  },

  get() {
    return state.db
  },

  async close() {
    return state.db.close()
  }
}
