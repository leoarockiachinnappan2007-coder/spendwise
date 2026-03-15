const mongoose = require("mongoose");

const connectDB = async () => {
    const atlasUri = process.env.MONGO_URI;
    const localUri = "mongodb://127.0.0.1:27017/spendwise";

    const connect = async (uri, source) => {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected (${source}): ${conn.connection.host}`);
    };

    if (atlasUri) {
        try {
            await connect(atlasUri, "Atlas");
            return;
        } catch (atlasErr) {
            console.error("Atlas MongoDB connection error:", atlasErr.message);
            console.warn("Falling back to local MongoDB at mongodb://127.0.0.1:27017/spendwise");
        }
    }

    try {
        await connect(localUri, "Local");
    } catch (localErr) {
        console.error("Local MongoDB connection error:", localErr.message);
        console.error("Hint: If Atlas, whitelist your IP and check connection string. If local, run mongod.");
        process.exit(1);
    }
};

module.exports = connectDB;