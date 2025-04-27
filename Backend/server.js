const app = require('./app');
const http = require("http");
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db.connect');
connectDB();


const server = http.createServer(app);


server.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
})

