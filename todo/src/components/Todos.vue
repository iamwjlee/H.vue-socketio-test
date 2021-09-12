<template>
<div>
    <div v-bind:key="todo.id" v-for="todo in todos">
<!--         <h1>Todos</h1> -->
  <!--       <h3>{{todo.title}}</h3> -->
        <TodoItem v-bind:todo="todo" v-on:del-todo="$emit('del-todo',todo.id)" />
    </div>
</div>
</template>

<script>
import TodoItem from './TodoItem.vue';


export default {
    name: "Todos",
    props: ["todos"],
    components: {
        TodoItem
    },
    data() {
        return {
            todoBind: "todo"
        }
    },
    methods: {
        my() {
            //console.log('here-->')
            //console.log(this.todo)
            //this.$emit('del-todo',this.todo.id)
        }
    }


}
</script>

<style scoped>

</style>
