const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

// ✅ 讓 Express 公開整個 src 資料夾給瀏覽器使用
app.use('/src', express.static(path.join(__dirname, 'src')));

// ✅ 回傳 index.html 作為首頁
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
