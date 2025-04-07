require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const Binance = require("node-binance-api");
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET,
});

const app = express();
const port = 3000;

let isBotRunning = false;
let botInterval;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/status", async (req, res) => {
  const balance = await binance.balance();
  const latestSignal = fs.existsSync("./signals/latest_signal.json")
    ? JSON.parse(fs.readFileSync("./signals/latest_signal.json"))
    : {};

  res.json({
    running: isBotRunning,
    latestSignal,
    balance,
  });
});

app.post("/start", (req, res) => {
  if (isBotRunning) return res.json({ success: false, msg: "Already running" });

  isBotRunning = true;
  console.log("Bot Started");

  botInterval = setInterval(() => {
    console.log("Bot is analyzing signal...");
    // Add your trading logic here (buy/sell etc)
  }, 5000);

  res.json({ success: true, msg: "Bot started" });
});

app.post("/stop", (req, res) => {
  if (!isBotRunning) return res.json({ success: false, msg: "Bot already stopped" });

  clearInterval(botInterval);
  isBotRunning = false;
  console.log("Bot Stopped");

  res.json({ success: true, msg: "Bot stopped" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
