const title = document.getElementById("title");
const output = document.getElementById("output");
const betaDirection = document.getElementById("betaDirection");

let lastBeta = null; // 記錄上一次的 beta
let increaseCount = 0;
let decreaseCount = 0;
const trendThreshold = 3; // 連續3次視為趨勢
const diffThreshold = 0.5; // 單次變化判定門檻

title.addEventListener("click", function () {
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission().then((permissionState) => {
      if (permissionState === "granted") {
        startGyro();
      } else {
        alert("請允許存取裝置方向！");
      }
    });
  } else {
    rotating();
  }
});

function rotating() {

  const arrow = document.querySelector('.arrow');
  const numberDisplay = document.getElementById('number');

  let lastBulu = null;
  let direction = "stop";

  window.addEventListener('deviceorientation', function (event) {
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
}

/*function startGyro() {
  window.addEventListener("deviceorientation", (event) => {
    const { alpha, beta, gamma } = event;
 
    title.style.setProperty("--gamma", gamma);
    title.style.setProperty("--beta", beta);
 
    output.innerHTML = `
      平躺轉轉: ${alpha?.toFixed(2)}<br>
      垂直轉轉: ${beta?.toFixed(2)}<br>
      左右轉轉: ${gamma?.toFixed(2)}
    `;
 
    if (lastBeta !== null) {
      const diff = beta - lastBeta;
 
      // 累積趨勢判斷
      if (diff > 0.1) {
        increaseCount++;
        decreaseCount = 0;
      } else if (diff < -0.1) {
        decreaseCount++;
        increaseCount = 0;
      } else {
        // 若變化太小，趨勢歸零（或你想保留可以註解這行）
        increaseCount = 0;
        decreaseCount = 0;
      }
 
      // 單次變化判斷優先
      if (diff > diffThreshold) {
        betaDirection.textContent = `現在是：上升 ↑`;
      } else if (diff < -diffThreshold) {
        betaDirection.textContent = `現在是：下降 ↓`;
      }
      // 如果單次變化沒達標，再看趨勢判斷
      else if (increaseCount >= trendThreshold) {
        betaDirection.textContent = `現在是：正在上升 ↑`;
      } else if (decreaseCount >= trendThreshold) {
        betaDirection.textContent = `現在是：持續下降 ↓`;
      } else {
        betaDirection.textContent = `現在是：穩定 -`;
      }
    }
 
    lastBeta = beta;
  });
}*/