import fetch from 'node-fetch'

export default async function login({ code }) {
  const OAUTH_UID = process.env.OAUTH_UID
  const OAUTH_SECRET = process.env.OAUTH_SECRET
  const OAUTH_HOST = process.env.OAUTH_HOST
  const OAUTH_REDIRECT_URI = process.env.OAUTH_REDIRECT_URI

  const query = [
    `client_id=${OAUTH_UID}`,
    `client_secret=${OAUTH_SECRET}`,
    'grant_type=authorization_code',
    `code=${code}`,
    `redirect_uri=${OAUTH_REDIRECT_URI}`
  ].join('&')

  const response = await fetch(`${OAUTH_HOST}/oauth/token?${query}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const json = await response.json()
    throw new Error(json['error_description'])
  }

  return await response.json()
}
