    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

    const firebaseConfig = {
    apiKey: "AIzaSyCXc1N4_X4_QCJ9ylNYR5S2_UjlqB-dgEQ",
    authDomain: "bondju-58069.firebaseapp.com",
    projectId: "bondju-58069",
    storageBucket: "bondju-58069.firebasestorage.app",
    messagingSenderId: "773554844066",
    appId: "1:773554844066:web:862be0067cbab41fb342fb"
  };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const player = "green"; // 玩家在這邊啦！！！！

    const arrow = document.querySelector(".arrow");
    const numberDisplay = document.getElementById("number");

    let lastSentTime = 0;

    function rotating() {
      window.addEventListener('deviceorientation', async (event) => {
        let gamma = event.gamma;
        let bulu = 90 - (-gamma);

        if (bulu > 160) bulu = 0;
        else if (bulu > 110) bulu = 110;

        const motorAngle = Math.round((110 - bulu) / 110 * 180);
        numberDisplay.textContent = `馬達角度：${motorAngle}`;
        arrow.style.transform = `rotateX(${bulu}deg)`;

        // 傳送至 Firebase 每 400ms 一次
        const now = Date.now();
        if (now - lastSentTime >= 400) {
          lastSentTime = now;
          const docRef = doc(db, "motor_control", player);
          try {
            await updateDoc(docRef, { angle: motorAngle });
            console.log("已傳送 motorAngle:", motorAngle);
          } catch (err) {
            console.error("更新 Firebase 錯誤", err);
          }
        }

        // 修正手機翻轉視角
        if (window.orientation === -90) {
          document.body.style.transform = "rotate(180deg)";
        } else {
          document.body.style.transform = "rotate(0deg)";
        }
      });
    }

    arrow.addEventListener("click", () => {
      if (typeof DeviceOrientationEvent?.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission().then((permissionState) => {
          if (permissionState === "granted") {
            rotating();
          } else {
            alert("請允許存取裝置方向！");
          }
        });
      } else {
        // Android 或桌機支援
        rotating();
      }
    });