import db from './db'

export default {
  create({ params }) {
    const collection = db.get().collection('payments')
    return collection.insert(Object.assign({}, params, { refunded: false }))
  },

  async getAll(accountUid) {
    const collection = db.get().collection('payments')
    return collection
      .find(
        {
          account_uuid: accountUid
        },
        {
          account_uuid: true,
          uuid: true,
          merchant_siret: true,
          merchant_name: true,
          amount: true,
          currency: true,
          date: true,
          refunded: true
        }
      )
      .map(o => ({
        account_uuid: o.account_uuid,
        uuid: o.uuid,
        merchant_siret: o.merchant_siret,
        merchant_name: o.merchant_name,
        amount: o.amount,
        currency: o.currency,
        date: o.date,
        refunded: o.refunded || false
      }))
      .toArray()
  },

  async refund(accountUid, paymentUid) {
    console.log({ accountUid, paymentUid })
    const collection = db.get().collection('payments')

    const data = await collection.findOneAndUpdate(
      {
        uuid: paymentUid,
        account_uuid: accountUid
      },
      {
        $set: { refunded: true }
      },
      {
        projection: {
          account_uuid: true,
          uuid: true,
          merchant_siret: true,
          merchant_name: true,
          amount: true,
          currency: true,
          date: true,
          refunded: true
        },
        returnOriginal: false
      }
    )

    if (!data.value) {
      throw 'Payment not found'
    }

    return Object.assign({}, data.value, { _id: undefined })
  }
}
