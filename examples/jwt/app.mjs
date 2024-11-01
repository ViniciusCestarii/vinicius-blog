import createJWT from './generate-token.mjs'
import verifyJWT from './verify-token.mjs'

// Define the payload data
const payload = {
  id: 1,
  username: 'vinicius_cestari',
  role: 'admin',
  exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in 1 hour
}

// Create the JWT
const token = createJWT(payload)

// Output the token
console.log('Generated JWT:', token) // Generated JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ2aW5pY2l1c19jZXN0YXJpIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzI4NjU0NjU5fQ.YdPCLiejG39jzG3sT8Lcx1NpZ-qNzhKL9kjfwXqybow

console.log('Decoded JWT:', verifyJWT(token)) // Decoded JWT: { id: 1, username: 'vinicius_cestari', role: 'admin', exp: 1728655348 }
