import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const gameRef = doc(db, "game", "s1");

async function changeRedStatu(){
    try {
        const docSnap = await getDoc(gameRef);
        if (docSnap.exists()) {
            let currentCount = docSnap.data().players["Blue"] || false;
            await updateDoc(gameRef, { "players.Blue": !currentCount });
            console.log("小藍的狀態已更新！");

            const balls = document.querySelectorAll('.circle.blue');

            if (currentCount) {
                // 如果小綠之前是未準備，現在變成已準備
                balls.forEach((blue) => {        
                
                    blue.classList.remove('on');
                    blue.classList.add('off');            
                });
            }
            // 如果小綠之前是已準備，現在變成未準備
            else if (!currentCount) {
                // 如果小綠之前是已準備，現在變成未準備
                balls.forEach((blue) => {        
                
                    blue.classList.remove('off');
                    blue.classList.add('on');            
                });
            }

        }
    } catch (error) {
        console.error("更新狀態時出錯:", error);
    }
} 

// 🎯 監聽 Firestore，隨時更新畫面
let alreadyRedirected = false;

onSnapshot(gameRef, async (docSnap) => {
    const players = docSnap.data().players;

    const playerColors = {
        Red: 'red',
        Blue: 'blue',
        Green: 'green'
    };

    Object.entries(playerColors).forEach(([key, className]) => {
        const circles = document.querySelectorAll(`.circle.${className}`);
        const isReady = players[key];

        circles.forEach(circle => {
            circle.classList.remove(isReady ? 'off' : 'on');
            circle.classList.add(isReady ? 'on' : 'off');
        });
    });

    // ✅ 如果三人都已準備，跳轉並重置
    if (players.Red && players.Blue && players.Green && !alreadyRedirected) {
        alreadyRedirected = true;

        // 🔁 先重置 Firestore 狀態
        /*await updateDoc(gameRef, {
            "players.Red": false,
            "players.Blue": false,
            "players.Green": false
        });*/

        // ⏱ 稍微等一下再跳轉，避免 race condition
        setTimeout(() => {
            window.location.href = 'BluePlaying.html';
        }, 300); 
    }
});



window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("readyButton").addEventListener("click", changeRedStatu);
});