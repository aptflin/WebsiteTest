let noteLayer = null;
let noteCount = 0;
const maxNotes = 8;
const noteSequence = []; // 用來儲存播放順序
let playInterval = null;

const noteSettings = {
    C: { color: '#A1FFFF', top: 99, sound: 'src/C.mp3' },
    M: { color: '#FFA5FC', top: 75, sound: 'src/M.mp3' },
    Y: { color: '#FFFA97', top: 50, sound: 'src/Y.mp3' },
    W: { color: 'white', top: 25, sound: 'src/W.mp3' }
};

function initMusicSheet() {
    noteLayer = document.getElementById('noteLayer');
    noteCount = 0;
}

function addNote(note) {
    if (noteCount >= maxNotes) return;

    const info = noteSettings[note];
    const audio = new Audio(info.sound);
    audio.play();

    const noteEl = document.createElement('div');
    noteEl.classList.add('note');
    noteEl.style.backgroundColor = info.color;
    noteEl.style.position = "absolute";
    noteEl.style.top = `${info.top}px`;
    noteEl.style.left = `${noteCount * 10.5 + 13}%`;

    noteLayer.appendChild(noteEl);

    // 儲存音訊與 DOM 參考
    noteSequence.push({ audio: new Audio(info.sound), element: noteEl });

    // 👉 存進 localStorage
    let storedNotes = JSON.parse(localStorage.getItem("noteSequence") || "[]");
    storedNotes.push(note);
    localStorage.setItem("noteSequence", JSON.stringify(storedNotes));

    noteCount++;
}


function playSequence() {
    let index = 0;

    if (noteSequence.length === 0) return;

    // 重置亮起樣式
    noteSequence.forEach(n => {
        n.element.style.boxShadow = '';
        n.element.style.transform = '';
    });

    playInterval = setInterval(() => {
        if (index > 0) {
            // 移除上個亮光
            const prev = noteSequence[index - 1];
            prev.element.style.boxShadow = '';
            prev.element.style.transform = '';
        }

        if (index >= noteSequence.length) {
            clearInterval(playInterval);
            playInterval = null;
            return;
        }

        const current = noteSequence[index];
        current.audio.currentTime = 0;
        current.audio.play();

        current.element.style.boxShadow = `0 0 30px 6px ${current.element.style.backgroundColor}`;
        current.element.style.transform = 'scale(1.5)';
        index++;
    }, 450); // 每顆音間隔時間（毫秒）
}

function stopSequence() {
    if (playInterval) {
        clearInterval(playInterval);
        playInterval = null;
    }

    noteSequence.forEach(n => {
        n.element.style.boxShadow = '';
        n.element.style.transform = '';
        n.audio.pause();
        n.audio.currentTime = 0;
    });
}