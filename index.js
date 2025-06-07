const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 3000;

// serve 靜態檔案
app.use(express.static(path.join(__dirname)));

// 當有 WebSocket client 連上
wss.on('connection', (ws) => {
  console.log('🔌 Client connected');

  ws.on('message', (message) => {
    console.log('📩 Received:', message.toString());

    // 廣播給所有其他 client（包含自己或不含都可以控制）
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
