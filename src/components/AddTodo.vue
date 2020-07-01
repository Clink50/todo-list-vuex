<template>
  <div>
    <h3>Add Todo</h3>
    <div class="add">
      <form @submit.prevent="onSubmit">
        <input type="text" v-model="title" placeholder="Add Todo...">
        <input type="submit" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddTodo',
  data() {
    return {
      title: '',
    };
  },
  methods: {
    ...mapActions(['addTodo']),
    onSubmit() {
      this.addTodo(this.title);
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: flex;

  input[type='text'] {
    flex: 10;
    padding: 10px;
    border: 1x solid #41b883;
    outline: none;
  }

  input[type='submit'] {
    flex: 2;
    background: #41b883;
    border: 1x solid #41b883;
    color: #fff;
    cursor: pointer;
  }
}
</style>
