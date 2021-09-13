

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
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
  
    <hr> <strong>incommingData </strong> 
    
    <h2>{{incommingData}}</h2>


    <hr> <strong>incommingArray </strong> 
   
       <ul>
      <li v-for="item in incommingArray" :key="item[0]+item[1]" >
        <h2> {{item}} </h2> 
      </li>
    </ul>

    <hr> <strong>incommingData v-for </strong> 


    <ul>
        <li v-for="item in incommingData" :key="item" >
          {{item}}
        </li>
    </ul>

  </div>
</template>

<script>
  let list=[


  ]
  let hello_test='111abcaafda'
  //https://www.youtube.com/watch?v=ppcBIHv_ZPs  :: javascript & socket.io
  import io from "socket.io-client";
  export default {
    name: 'BlockGame',
    data() {
      return {
        hello: hello_test,
        incommingData: [],
        incommingArray: [],

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
      this.socket.on("incommingTestData",data=>{
        console.log(data);
        this.incommingData=data;
        if(this.incommingArray.length===0) {
          console.log('first')
          this.incommingArray.push(data);
        }
        else {
          let same=0;
          for(let i=0;i<this.incommingArray.length;i++) {
            if(this.incommingArray[i][0]===data[0] && this.incommingArray[i][1]===data[1])
            {
              console.log('same')
              same=1;
              this.incommingArray[i]=data;
              break;
            } 
          }
          if(same===0) {
            this.incommingArray.push(data);
            console.log('new')
            console.log(data)
            console.log(this.incommingArray[0])
          }
        }
        //this.incommingArray.push(data);


      });

   },
   methods: {
      move(direction) {
        this.socket.emit("move",direction);
      }


   }
  }
</script>

<style scoped>

li {
  list-style: none;
}
</style>
