import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// create a rate limiter that allows 100 requsts in 60 secs
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s")
});

export default ratelimit;