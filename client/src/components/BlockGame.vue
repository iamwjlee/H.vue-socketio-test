

<template>
  <div>
    <h1>{{hello}}</h1>
    <canvas ref="game" width="640" height="480" style="border: 1px solid black;"/>
    <p>
      <button v-on:click="move('right')">Right</button> 
      <button v-on:click="move('left')">Left</button> 
      <button v-on:click="move('up')">Up</button> 
      <button v-on:click="move('down')">Down</button> 
    </p>
     <h2>{{incommingList}}</h2>  
      <br>
     <h2>{{incommingData}}</h2>  

    <ul>
      <li>

      </li>

    </ul>
  </div>
</template>

<script>
  let list=[


  ]
  let hello_test='abcaafda'
  //https://www.youtube.com/watch?v=ppcBIHv_ZPs  :: javascript & socket.io
  import io from "socket.io-client";
  export default {
    name: 'BlockGame',
    data() {
      return {
        hello: hello_test,
        incommingData: [],
        incommingList: list,
        socket: {},
        context:{},
        position: {
          x: 0,
          y: 0
        }
      }
    },
    created() {
      this.socket =io("http://127.0.0.1:3000"); //How to deal with Cross Origin Resource Sharing
      /*

        Access to XMLHttpRequest at 'http://localhost:3000/socket.io/?EIO=4&transport=polling&t=NkPp1c4' 
        from origin 'http://localhost:8080' 
        has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
      */
    },
    mounted() {
      console.log('mounted-->');
      this.socket.emit("login",{name:'wj',userid:1234});

      this.context= this.$refs.game.getContext("2d");
       //this.context.fillRect(0,0,20,20);

      this.socket.on("position",data=>{
        this.position=data;
        this.context.clearRect(0,0,this.$refs.game.width,this.$refs.game.height);
        this.context.fillRect(this.position.x,this.position.y,20,20);
        console.log('+');

      });
      this.socket.on("incomming",data=>{
        //this.incommingData.push(data); 
        //console.log(this.incommingList.length);
        console.log(data[0]);
        console.log(list.length);
          
        if(list.length===0) {
            list.push(data);
        }
        else {

          let hit=0;
          for(let i=0; i< list.length; i++ ) {
              if(data[0]===list[i][0]) {
                list[i][3]=data[3];
                hit=1;
                console.log('same ---> '+' length='+ list.length + ' data[3]=' +list[i][3]);

                break;
              }
            }
            if(hit===0)  {
              console.log('you can not see it');
              list.push(data);
            }
        }
          //this.incommingData=data;
      });
      this.socket.on("realtime",data=>{
        console.log(data);
        this.incommingData=data;

      });

   },
   methods: {
      move(direction) {
        this.socket.emit("move",direction);
      }


   }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
