console.log('我有進來script.js')
let ws = new WebSocket('wss://websitetest-xx30.onrender.com');

let controlTD = document.querySelector('.controlTD');
controlTD.addEventListener('input',(event) =>{
    ws.send(JSON.stringify({'slider1': controlTD.value}))
})

ws.addEventListener('open',(event) =>{
    console.log('websocket opend')
});

ws.addEventListener('message',(massage) =>{
    console.log(message);
});

ws.addEventListener('error',(error) =>{
    console.error('websocket closed')
});

ws.addEventListener('close',(event) =>{
    console.log('websocket closed')
})