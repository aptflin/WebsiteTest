let ws = new WebSocket('wss://websitetest-xx30.onrender.com');

let controlTD = document.querySelector('.controlTD');
controlTD.value = 0
console.log('controlTD.value')

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