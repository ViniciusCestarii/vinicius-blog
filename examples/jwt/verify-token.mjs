import crypto from 'crypto'

const base64UrlDecode = (str) => {
  str += '='.repeat((4 - (str.length % 4)) % 4) // Add padding for Base64 decoding
  return Buffer.from(str, 'base64').toString() // Decode Base64
}

const verifyJWT = (token) => {
  const parts = token.split('.')
  if (parts.length !== 3) {
    throw new Error('Token structure is invalid') // Ensure the token has three parts
  }

  const [encodedHeader, encodedPayload, signature] = parts

  // Create the signature base
  const signatureBase = `${encodedHeader}.${encodedPayload}`

  // Recreate the signature
  const recreatedSignature = crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(signatureBase)
    .digest('base64url')

  // Check if the recreated signature matches the signature in the token
  if (recreatedSignature !== signature) {
    throw new Error('Invalid signature') // Signature mismatch
  }

  // Decode and return the payload
  const decodedPayload = JSON.parse(base64UrlDecode(encodedPayload))

  // Check expiration if present
  if (
    decodedPayload.exp &&
    Math.floor(Date.now() / 1000) >= decodedPayload.exp
  ) {
    throw new Error('Token has expired') // Expired token
  }

  return decodedPayload // Return the decoded payload if verification is successful
}

export default verifyJWT
