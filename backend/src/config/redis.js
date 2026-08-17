const Redis = require('ioredis');
require('dotenv').config();

const redisUrl = process.env.REDIS_URL;
const redisEnabled = process.env.REDIS_ENABLED !== 'false' && !!(redisUrl || process.env.REDIS_HOST);

let redis = null;

if (redisEnabled) {
  const redisConfig = {
    maxRetriesPerRequest: 3,
    lazyConnect: true,
    retryStrategy: (times) => {
      if (times > 10) return null;
      return Math.min(times * 100, 3000);
    },
  };

  if (redisUrl) {
    redis = new Redis(redisUrl, redisConfig);
  } else {
    redis = new Redis({
      ...redisConfig,
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
    });
  }

  redis.on('connect', () => console.log('[Redis] Connected successfully.'));
  redis.on('error', (err) => console.error('[Redis] Connection error:', err.message));
  redis.on('reconnecting', () => console.log('[Redis] Reconnecting...'));
}

const isRedisReady = () => {
  return !!redis && (redis.status === 'connect' || redis.status === 'ready');
};

const connectRedis = async () => {
  if (!redis) {
    console.warn('[Redis] No Redis configuration found. Running without Redis-backed cache and rate limiting store.');
    return;
  }

  try {
    if (redis.status === 'wait' || redis.status === 'close') {
      await redis.connect();
    }
  } catch (err) {
    console.warn('[Redis] Initial connection failed. Falling back to in-memory behavior:', err.message);
  }
};

module.exports = { redis, connectRedis, isRedisReady };
