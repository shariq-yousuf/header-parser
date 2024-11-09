import dotenv from "dotenv"
import express from "express"

dotenv.config()
const app = express()

import cors from "cors"
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

app.use(express.static("public"))
app.set("trust proxy", true)

app.get("/", (req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html")
})

app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" })
})

app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress:
      req.ip |
      req.socket.remoteAddress |
      req.headers["x-forwarded-for"] |
      req.headers["x-real-ip"] |
      "",
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port)
})
