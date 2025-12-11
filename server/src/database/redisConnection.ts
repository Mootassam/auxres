import Redis from "ioredis";

export class RedisService {
  private static client: Redis;

  static getClient() {
    if (!this.client) {
      this.client = new Redis({
        host: "127.0.0.1",
        port: 6379,
      });
    }
    return this.client;
  }
}
