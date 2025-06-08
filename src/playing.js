// 取得箭頭元素
const arrow = document.querySelector('.arrow');

// 手機：監聽手機旋轉（如果有的話）
window.addEventListener('deviceorientation', function(event) {
  let gamma = event.gamma; // 左右傾斜 (-90 到 90)
  let beta = event.beta;   // 前後傾斜 (-180 到 180)

  if (gamma !== null && beta !== null) {
    arrow.style.transform = `translateX(-50%) rotateX(${beta / 3}deg) rotateY(${-gamma / 3}deg)`;
  }
}, true);

// 筆電：同時也監聽滑鼠移動
document.addEventListener('mousemove', function(event) {
  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;
  let offsetX = event.clientX - centerX;
  let offsetY = event.clientY - centerY;

  arrow.style.transform = `translateX(-50%) rotateX(${offsetY / 10}deg) rotateY(${-offsetX / 10}deg)`;
});
