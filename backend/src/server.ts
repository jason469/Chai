import express from "express";
import cors from "cors";

const app = express();
app.use(cors({
    credentials: true,
    origin: ["http:/localhost:4200"]
}))

app.get("/api/login", (req, res) => {
    res.send("login")
})

const port = 5000;
app.listen(port, () => {
    console.log("Website served on port", port)
})