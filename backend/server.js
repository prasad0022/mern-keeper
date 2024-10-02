import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
import keeperRouter from "./routes/keeper.router.js";

const app = express();
const __dirname = path.resolve();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/keeper", keeperRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
};


app.listen(PORT, () => {
    connectToDB();
    console.log("Server started at http://localhost:" + PORT);
});
