const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const userRoute = require("./src/users/userRoute");
const productRoute = require("./src/products/productRoute");
const cors = require('cors');
const path = require("path");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const CLIENT_URL = process.env.CLIENT_URL;
app.use(express.json());
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));

connectDB();

// user route
app.use("/api/v1/users/", userRoute);
app.use("/api/v1/products/", productRoute);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.get("/", (req, res) => res.send(
"app is running successfully"));

app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
    res.status(204).end(); // No content
});

app.use((req, res) => {
    res.status(404).send(`Cannot ${req.method} ${req.originalUrl}`);
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));