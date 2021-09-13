const express=require('express');
const { addAbortSignal } = require('stream');
const app=express();
const server=require('http').createServer(app);
let io=require('socket.io')(server,{cors:{origin:"*"}});


app.use(express.static('public'));

app.get('/',function(req,res){
    console.log('home page');
    res.sendFile(__dirname +'/public/index.html');
});
app.get('/test',test);
function test(req,res) { //callback
    res.send('test!!!!');
}
//https://www.youtube.com/watch?v=e4qKBkwwkNg
//https://www.youtube.com/watch?v=6iZiqQZBQJY
app.get('/test/:test01/:num?',test01); //router with parameter //if num is not defined then undefined
function test01(req,res) { //callback
    let data=req.params;
    let num=data.num;
    res.send('test! parameter=' + data.test01 + ' num='+num);
}
let words ={
    rainbow: 5,
    unicon: 3,
    doom: -3
}
app.get('/all',sendAll);
function sendAll(req,res) {

    res.send(words);
}


let position = {
    x:200,
    y:200
}
let incommingTestData = [
    ['192.168.0.34','02','1',0],
    ['192.168.0.35','03','1',0],
    ['192.168.0.36','04','1',0],
    ['192.168.0.37','05','1',0],
]
let singleData =[]
let incommingCnt=0;
let freeCnt=0;
let buggyCnt;

io.on('connection',socket=>{
   

    if(buggyCnt) clearInterval(buggyCnt);
    buggyCnt=setInterval(function(){

        incommingTestData[incommingCnt][3]=freeCnt++; //freeCnt[incommingCnt]++;

        singleData=incommingTestData[incommingCnt]
        io.emit("incommingTestData",singleData);

        incommingCnt++
        if(incommingCnt==4) incommingCnt=0;


        console.log('interval:'+incommingCnt)
    },1000);
  
    socket.on('disconnect',()=>{
        console.log('socket disconnect');
        socket.disconnect();
    });

    socket.emit("position",position);
    socket.on("move",data=>{
        switch(data) {
            case "left":
                position.x -=5;
                io.emit("position",position);
                break;
            case "right":
                position.x +=5;
                io.emit("position",position);
                break;
            case "up":
                position.y -=5;
                io.emit("position",position);
                break;
            case "down":
                position.y +=5;
                io.emit("position",position);
                break;
            

        }
    })

});

server.listen(3000,function(){
    console.log('Listening on port 3000');
});
