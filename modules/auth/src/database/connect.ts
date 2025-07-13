import mongoose from "mongoose";
import { getRequiredEnv } from "@/utils/getEnv";

const MONGODB_URI = getRequiredEnv("MONGO_URI");

mongoose.set("strictQuery", true);
mongoose.set("bufferCommands", false);

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(MONGODB_URI, {
			maxPoolSize: 10, // Limit number of connections
			minPoolSize: 5, // Maintain minimum connections
			socketTimeoutMS: 45000, // Close sockets after 45 seconds
			connectTimeoutMS: 10000, // Connection timeout after 10 seconds
			serverSelectionTimeoutMS: 5000, // Server selection timeout
			heartbeatFrequencyMS: 10000, // How often to check connection
			retryWrites: true,
			writeConcern: {
				w: "majority",
			},
		});

		console.log(`MongoDB Connected: ${connection.connection.host}`);

		// Handle connection errors
		mongoose.connection.on("error", (err) => {
			console.error("MongoDB connection error:", err);
		});

		mongoose.connection.on("disconnected", () => {
			console.log("MongoDB disconnected");
		});

		// Graceful shutdown
		process.on("SIGINT", async () => {
			await mongoose.connection.close();
			process.exit(0);
		});

		return connection;
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
};

export default connectDB;
