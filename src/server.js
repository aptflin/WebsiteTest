const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


/*const { SerialPort } = require('serialport');

const arduinoPort = new SerialPort({
  path: 'COM6',      // 修改為你的 Arduino Port
  baudRate: 115200
});

app.get('/led/:status', (req, res) => {
  const status = req.params.status; // 讀到 on 或 off
  if (status === 'on') {
    arduinoPort.write('ON\n');
    res.send('LED ON');
  } else if (status === 'off') {
    arduinoPort.write('OFF\n');
    res.send('LED OFF');
  } else if (status === 'stop') {
    arduinoPort.write('STOP\n');
    res.send('LED STOP');
  }
   else {
    res.send('指令錯誤');
  }
});*/