import Redis from "ioredis";

/*
    @description: Connects to a Redis instance.
    @param {string} host - The host of the Redis instance.
    @param {number} port - The port of the Redis instance.
    @returns {Redis} - The Redis client.
*/

interface IConnectRedis {
	host: string;
	port: number;
}

async function connectRedis({ host, port }: IConnectRedis): Promise<Redis> {
	const client = new Redis({
		host,
		port,
	})
		.on("ready", () => {
			console.log("✅ Redis connected");
		})
		.on("error", (err) => {
			console.log("❌ Redis connection error:", err);
		});

	return client;
}

export { connectRedis };
