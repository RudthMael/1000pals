import db from './db'

export default {
  create({ params }) {
    const collection = db.get().collection('payments')
    return collection.insert(params)
  },

  async getAll(accountUid) {
    const collection = db.get().collection('payments')
    return collection
      .find({
        account_uuid: accountUid
      })
      .project({
        account_uuid: 1,
        uuid: 1,
        merchant_siret: 1,
        merchant_name: 1,
        amount: 1,
        currency: 1,
        date: 1
      })
      .map(o => ({
        account_uuid: o.account_uuid,
        uuid: o.uuid,
        merchant_siret: o.merchant_siret,
        merchant_name: o.merchant_name,
        amount: o.amount,
        currency: o.currency,
        date: o.date
      }))
      .toArray()
  }
}
