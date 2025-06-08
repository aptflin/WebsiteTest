console.log('我有進來script.js')
let ws = new WebSocket('wss://websitetest-xx30.onrender.com');


let controledByTD = document.querySelector('.controledByTD');


//林屁屁會用網頁測控TD了ㄎㄎ 
let controlTD = document.querySelector('.controlTD');
controlTD.addEventListener('input',(event) =>{
    ws.send(JSON.stringify({'slider1': controlTD.value}))
})

ws.addEventListener('open',(event) =>{
    console.log('websocket opend')
});

ws.addEventListener('message',(message) =>{
    if (message.data == 'ping'){
        ws.send('pong');
        return
    }

    let data = JSON.parse(message.data);
    if('slider1' in data){
        let val = data['slider1'];
        controledByTD.value = val*100;
        
    }
    console.log(data);
});

ws.addEventListener('error',(error) =>{
    console.error('websocket closed')
});

ws.addEventListener('close',(event) =>{
    console.log('websocket closed')
})