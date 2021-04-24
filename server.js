const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const userRouter = require("./routes/user");

connectDB();
app.use(express.json());
app.use("/api/users", userRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
