    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyCJCxy6B9-Gt3RnxJbiYi2w_uIRd-yfSFM",
      authDomain: "bondjumaybeisthelast.firebaseapp.com",
      projectId: "bondjumaybeisthelast",
      storageBucket: "bondjumaybeisthelast.appspot.com",
      messagingSenderId: "573258856356",
      appId: "1:573258856356:web:503844c0fe7bee65aa7331"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const player = "red"; // 玩家在這邊啦！！！！
    const redRef = doc(db, "music_sequence", "red"); //這是球球順序

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