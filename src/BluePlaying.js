const arrow = document.querySelector('.arrow');
const numberDisplay = document.getElementById('number');

let lastBulu = null;
let direction = "stop";

window.addEventListener('deviceorientation', function(event) {
  let gamma = event.gamma;
  let bulu = 90 - (-gamma);

  if (bulu > 160) {
    bulu = 0;
  } else if (bulu > 110) {
    bulu = 110;
  }

  numberDisplay.textContent = bulu;
  arrow.style.transform = `rotateX(${bulu}deg)`;

  // ➤ 判斷變化趨勢

  const diff = bulu - lastBulu;

    if (diff > 1) {
      if (direction !== "backward") {
        console.log("backward"); // Arduino 會收到這行
        fetch('/motor/backward');
        direction = "backward";
      }
    } else if (diff < -1) {
      if (direction !== "forward") {
        console.log("forward");  // Arduino 會收到這行
        fetch('/motor/forward');
        direction = "forward";
      }
    } else {
        console.log("stop");  // Arduino 會收到這行
        fetch('/motor/stop');
        direction = "stop";
    }


  // ➤ 修正螢幕翻轉的部分
  if (window.orientation === -90) {
    document.body.style.transform = "rotate(180deg)";
  } else {
    document.body.style.transform = "rotate(0deg)";
  }

}, true);
