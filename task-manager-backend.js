require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use("/tasks", taskRoutes);  
app.use("/user", userRoutes);  

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});