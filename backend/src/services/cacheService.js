const { redis, isRedisReady } = require('../config/redis');

const CACHE_TTL = 60 * 60 * 24; // 24 hours in seconds
const CACHE_PREFIX = 'short:';

/**
 * Get the original URL for a short code from Redis cache
 * @returns {string|null} original URL or null if cache miss
 */
const getCachedUrl = async (shortCode) => {
  if (!redis || !isRedisReady()) return null;
  const key = `${CACHE_PREFIX}${shortCode}`;
  try {
    return await redis.get(key);
  } catch {
    return null;
  }
};

/**
 * Cache a short_code → original_url mapping
 */
const setCachedUrl = async (shortCode, originalUrl, ttl = CACHE_TTL) => {
  if (!redis || !isRedisReady()) return;
  const key = `${CACHE_PREFIX}${shortCode}`;
  try {
    await redis.set(key, originalUrl, 'EX', ttl);
  } catch {
    // Best-effort cache warm.
  }
};

/**
 * Invalidate a cached short code (on delete)
 */
const invalidateCachedUrl = async (shortCode) => {
  if (!redis || !isRedisReady()) return;
  const key = `${CACHE_PREFIX}${shortCode}`;
  try {
    await redis.del(key);
  } catch {
    // Best-effort cache invalidation.
  }
};

module.exports = { getCachedUrl, setCachedUrl, invalidateCachedUrl };
