import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCJCxy6B9-Gt3RnxJbiYi2w_uIRd-yfSFM",
    authDomain: "bondjumaybeisthelast.firebaseapp.com",
    projectId: "bondjumaybeisthelast",
    storageBucket: "bondjumaybeisthelast.firebasestorage.app",
    messagingSenderId: "573258856356",
    appId: "1:573258856356:web:503844c0fe7bee65aa7331"
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
onSnapshot(gameRef, (docSnap) => {
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

    let alreadyRedirected = false;
    if (players.Red && players.Blue && players.Green && !alreadyRedirected) {
        alreadyRedirected = true;
        window.location.href = 'BluePlaying.html';
    }
});


window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("readyButton").addEventListener("click", changeRedStatu);
});