import crypto from 'crypto'

// Function to create a base64url-encoded string
const base64UrlEncode = (data) => {
  return Buffer.from(JSON.stringify(data)).toString('base64url') // Using base64url for JWT
}

// Function to create a JWT
const createJWT = (payload) => {
  // Create the header
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  // Base64Url encode the header and payload
  const encodedHeader = base64UrlEncode(header)
  const encodedPayload = base64UrlEncode(payload)

  // Create the signature
  const signatureBase = `${encodedHeader}.${encodedPayload}`
  const signature = crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(signatureBase)
    .digest('base64url')

  // Combine the parts to create the JWT
  const jwt = `${encodedHeader}.${encodedPayload}.${signature}`
  return jwt
}

export default createJWT
