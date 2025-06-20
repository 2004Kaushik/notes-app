import ratelimit from "../config/upstash.js"

const ratelimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key")
        if(!success) {
            return res.status(429).json({
                message: "Too many requests, please try later"
            });
        }
        next();
    } catch (error) {
        console.log(`error :${error}`);
        next(error);
    }
}


export default ratelimiter