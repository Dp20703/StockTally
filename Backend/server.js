require("dotenv").config();

const app = require("./app");
const http = require("http");
const connectDB = require("./config/db.connect");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

async function startServer() {
    try {
        connectDB();

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup error:", error);
        process.exit(1);
    }
}

startServer();

server.on("error", (error) => {
    console.error("Server error:", error);
});

process.on("SIGINT", () => {
    console.log("Gracefully shutting down...");
    server.close(() => process.exit(0));
});