import env from '@/env'
import * as redis from 'redis'

declare global {
  // eslint-disable-next-line no-var
  var _redisClientPromise: redis.RedisClientType | undefined
}

let redisClient: redis.RedisClientType
let redisClientPromise: redis.RedisClientType

if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
  if (!global._redisClientPromise) {
    redisClient = redis.createClient({
      url: env.REDIS_URL,
      password: env.REDIS_PASSWORD,
    })
    redisClient
      .connect()
      .then(() => {
        console.info(`NextJS Redis client connected..`)
      })
      .catch((error) => {
        console.error(`[ERROR] Couldn't connect to Redis client: ${error}`)
      })
    global._redisClientPromise = redisClient
  }
  redisClientPromise = global._redisClientPromise
} else {
  redisClient = redis.createClient({
    url: env.REDIS_URL,
    password: env.REDIS_PASSWORD,
  })
  redisClient
    .connect()
    .then(() => {
      console.info(`NextJS Redis client connected..`)
    })
    .catch((error) => {
      console.error(`[ERROR] Couldn't connect to Redis client: ${error}`)
    })
  redisClientPromise = redisClient
}

export default redisClientPromise
