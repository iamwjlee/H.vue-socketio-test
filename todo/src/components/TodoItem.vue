<template>
<div class="todo-item" v-bind:class="{'is-complete': todo.completed}">
   <!--  <p>Todo item</p>  -->   
   <p>
       <input type="checkbox" v-on:change="markComplete">
       {{todo.title}}
        <button @click="my" class="del">x</button>
   </p>
</div>    
</template>

<script>
export default {
    name: "TodoItem",
    props: ["todo"],
    methods: {
        markComplete() {
            this.todo.completed = !this.todo.completed
        },
        my() {
            console.log('click')
            this.$emit('del-todo',this.todo.id)
        }
    }
}
</script>

<style>
    .todo-item {
        background: #f4f4f4;
        padding: 10px;
        border-bottom: 1px #ccc dotted;
    }
    .is-complete {
        text-decoration: line-through;
    }
    .del {
        background: #ff0000;
        color: #fff;;
        border:none;
        padding: 5px 9px;
        cursor: pointer;
        float:  right;
    }
</style>