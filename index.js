import dotenv from "dotenv"
import express from "express"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import cors from "cors"
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

app.use(express.static("public"))
app.set("trust proxy", true)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"))
})

app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" })
})

app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: String(
      req.ip |
        req.headers["x-real-ip"] |
        req.headers["x-forwarded-for"] |
        req.socket.remoteAddress |
        ""
    ),
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port)
})
