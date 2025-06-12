let ws = new WebSocket('wss://websitetest-xx30.onrender.com');
const ballCyan = document.querySelectorAll('.light-ball.cyan');
const ballMagenta = document.querySelectorAll('.light-ball.magenta');
const ballYellow = document.querySelectorAll('.light-ball.yellow');
const ballWhite = document.querySelectorAll('.light-ball.white');

ws.addEventListener('message', (message) => {
  if (message.data == 'ping') {
    ws.send('pong');
    return
  }

  let data = JSON.parse(message.data);
  if ('colorC' in data) {
    let valC = data['colorC'];
    if (valC == 1) {
      //toggleC.checked = true;
      ballCyan.forEach((cyan) => {
        cyan.classList.add('active');
      });
    }
  }
  if ('colorM' in data) {
    let valM = data['colorM'];
    if (valM == 1) {
      //toggleC.checked = true;
      ballMagenta.forEach((magenta) => {
        magenta.classList.add('active');
      });
    }
  }
  if ('colorY' in data) {
    let valY = data['colorY'];
    if (valY == 1) {
      //toggleC.checked = true;
      ballYellow.forEach((yellow) => {
        yellow.classList.add('active');
      });
    }
  }
  if ('colorW' in data) {
    let valW = data['colorW'];
    if (valW == 1) {
      //toggleC.checked = true;
      ballWhite.forEach((white) => {
        white.classList.add('active');
      });
    }
  }
});