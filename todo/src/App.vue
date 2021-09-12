<template>
  <div id="app">
    <Header/>
    <AddTodo v-on:add-todo="addTodo" />
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" />
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'
import Todos from './components/Todos.vue'
import AddTodo from './components/AddTodo.vue'
//import axios from 'axios'
export default {
  name: 'App',
  components: {
    Todos,
    Header,
    AddTodo
  },
  data() {
    return {
     
      todos: [
        {
          id: 1,
          title:"Todo One",
          completed: false
        },
        {
          id: 2,
          title:"Todo Two",
          completed: true
        },
        {
          id: 3,
          title:"Todo Three",
          completed: false
        }

      ]
      
      //todos: []
    }
  },
  methods: {
    deleteTodo(id) {
      console.log('aaaa'+id)
      
      this.todos = this.todos.filter(todo=> todo.id !==id);
      /*
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}
      `)
      .then(res=>this.todos = this.todos.filter(todo=>todo.id!==id))
      .catch(err => console.log(err))
      */
     /*
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}
      `)
      .then(res=>console.log(res.data))
  */
     /*
     const deleteRequest = async()=>{
       try {
             const res= axios.delete('https://jsonplaceholder.typicode.com/todos/1')
              console.log(res.data)
       }
       catch(err) {
         console.log(err)
       }

     }
     deleteRequest()
      */
    },
    addTodo(newTodo) {
      this.todos=[...this.todos,newTodo];
      /*
      const {title,completed} = newTodo;
      axios.post('https://jsonplaceholder.typicode.com/todos',{
        title,completed
      })
      .then(res => this.todos = [...this.todos,res.data])
      .catch(err => console.log(err))
      */
    },
  },
  created() {
    /*
      console.log('created')
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(res => this.todos = res.data)
        .catch(err => console.log(err));
    */
  }


}
</script>

<style>

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.btn {
  display: inline-block;
}
.btn:hover {
  background: #666;
}

</style>
