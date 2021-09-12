<template>
    <div>
        <form @submit="addTodo">
            <input type="text" v-model="title" name="title" placeholder="Add todo..." >
            <input type="submit" value="Submit" class="btn">
        </form>


    </div>
</template>

<script>
import {v4} from 'uuid';
export default {
    name: "AddTodo",
    data() {
        return {
            title: ''
        }
    },
    methods: {

        addTodo(e) {
            e.preventDefault(); // a태그,form안에서 submit눌렀을시 창새로고침방지
            const newTodo={
                id: v4(),
                title: this.title,
                completed: false
            }
            //send to parent
            this.$emit('add-todo',newTodo)
            this.title=''
        }
    }


}
</script>

<style scoped>
    form {
        display: flex;
    }
    input[type="text"] {
        flex: 10;
    }
    input[type="submit"] {
        flex: 2;
    }

</style>

