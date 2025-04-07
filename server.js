const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

let isBotRunning = false;

// Start Bot API
app.post('/start-bot', (req, res) => {
  isBotRunning = true;
  console.log('✅ Bot Started');
  res.send('Bot Started');
});

// Stop Bot API
app.post('/stop-bot', (req, res) => {
  isBotRunning = false;
  console.log('🛑 Bot Stopped');
  res.send('Bot Stopped');
});

// Signal API (Optional - for future signal integration)
app.get('/status', (req, res) => {
  res.json({
    status: isBotRunning ? 'Running' : 'Stopped',
    currentSignal: isBotRunning ? 'Waiting...' : '--'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
