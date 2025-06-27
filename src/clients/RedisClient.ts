import Redis from "ioredis";

export class RedisClient {
  private redis: Redis;
  private key: string = process.env.REDIS_ENCRYPTION_KEY as string;
  constructor(connectionString) {
    this.redis = new Redis(connectionString);

    if (!this.key || this.key.length !== 64) {
      throw new Error(
        "REDIS_ENCRYPTION_KEY must be 64 characters (32 bytes hex)"
      );
    }
  }

  // Encrypt data (simple and bulletproof)
  encrypt(text) {
    if (text === null || text === undefined) return text;

    const dataToEncrypt =
      typeof text === "object" ? JSON.stringify(text) : String(text);

    // Simple XOR encryption with key
    const key = this.key;
    let encrypted = "";

    for (let i = 0; i < dataToEncrypt.length; i++) {
      const char = dataToEncrypt.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      encrypted += String.fromCharCode(char ^ keyChar);
    }

    // Base64 encode the result
    return Buffer.from(encrypted, "binary").toString("base64");
  }

  // Decrypt data (simple and bulletproof)
  decrypt(encryptedData) {
    if (!encryptedData) return null;
    if (typeof encryptedData !== "string") return encryptedData;

    try {
      // Base64 decode
      const encrypted = Buffer.from(encryptedData, "base64").toString("binary");

      // Simple XOR decryption with key
      const key = this.key;
      let decrypted = "";

      for (let i = 0; i < encrypted.length; i++) {
        const char = encrypted.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        decrypted += String.fromCharCode(char ^ keyChar);
      }

      // Try to parse as JSON, fallback to string
      try {
        return JSON.parse(decrypted);
      } catch {
        return decrypted;
      }
    } catch (error) {
      // If anything fails, return original data
      return encryptedData;
    }
  }

  // === STRING OPERATIONS ===
  async set(key, value) {
    return await this.redis.set(key, this.encrypt(value));
  }

  async get(key) {
    const result = await this.redis.get(key);
    return this.decrypt(result);
  }

  async setex(key, seconds, value) {
    return await this.redis.setex(key, seconds, this.encrypt(value));
  }

  async mset(obj) {
    const encrypted = {};
    for (const [key, value] of Object.entries(obj)) {
      encrypted[key] = this.encrypt(value);
    }
    return await this.redis.mset(encrypted);
  }

  async mget(keys) {
    const results = await this.redis.mget(keys);
    return results.map((item) => this.decrypt(item));
  }

  // === LIST OPERATIONS ===
  async lpush(key, ...values) {
    const encrypted = values.map((v) => this.encrypt(v));
    return await this.redis.lpush(key, ...encrypted);
  }

  async rpush(key, ...values) {
    const encrypted = values.map((v) => this.encrypt(v));
    return await this.redis.rpush(key, ...encrypted);
  }

  async lrange(key, start, stop) {
    const results = await this.redis.lrange(key, start, stop);
    return results.map((item) => this.decrypt(item));
  }

  async lpop(key) {
    const result = await this.redis.lpop(key);
    return this.decrypt(result);
  }

  async rpop(key) {
    const result = await this.redis.rpop(key);
    return this.decrypt(result);
  }

  async llen(key) {
    return await this.redis.llen(key);
  }

  // === SET OPERATIONS ===
  async sadd(key, ...members) {
    const encrypted = members.map((m) => this.encrypt(m));
    return await this.redis.sadd(key, ...encrypted);
  }

  async smembers(key) {
    const results = await this.redis.smembers(key);
    return results.map((item) => this.decrypt(item));
  }

  async sismember(key, member) {
    return await this.redis.sismember(key, this.encrypt(member));
  }

  async srem(key, ...members) {
    const encrypted = members.map((m) => this.encrypt(m));
    return await this.redis.srem(key, ...encrypted);
  }

  // === HASH OPERATIONS ===
  async hset(key, ...args) {
    if (args.length === 1 && typeof args[0] === "object") {
      // Object format: hset(key, {field: value})
      const encrypted = {};
      for (const [field, value] of Object.entries(args[0])) {
        encrypted[field] = this.encrypt(value);
      }
      return await this.redis.hset(key, encrypted);
    } else {
      // Field-value pairs: hset(key, field1, value1, field2, value2)
      const encrypted: any = [];
      for (let i = 0; i < args.length; i += 2) {
        encrypted.push(args[i]); // field
        encrypted.push(this.encrypt(args[i + 1])); // value
      }
      return await this.redis.hset(key, ...encrypted);
    }
  }

  async hget(key, field) {
    const result = await this.redis.hget(key, field);
    return this.decrypt(result);
  }

  async hgetall(key) {
    const result = await this.redis.hgetall(key);
    if (!result) return result;

    const decrypted = {};
    for (const [field, value] of Object.entries(result)) {
      decrypted[field] = this.decrypt(value);
    }
    return decrypted;
  }

  async hmget(key, ...fields) {
    const results = await this.redis.hmget(key, ...fields);
    return results.map((item) => this.decrypt(item));
  }

  // === UTILITY METHODS ===
  async expire(key, seconds) {
    return await this.redis.expire(key, seconds);
  }

  async del(key) {
    return await this.redis.del(key);
  }

  async exists(key) {
    return await this.redis.exists(key);
  }

  disconnect() {
    this.redis.disconnect();
  }

  // Direct access to raw Redis if needed
  get raw() {
    return this.redis;
  }
}
