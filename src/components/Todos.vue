<template>
  <div>
    <h3>Todos</h3>
    <div class="legend">
      <span>Double click to mark as complete</span>
      <span>
        <span class="incomplete-box"> = Incomplete</span>
      </span>
      <span>
        <span class="complete-box"> = Complete</span>
      </span>
    </div>
    <div class="todos">
      <div
        @dblclick="onDblClick(todo)"
        v-for="todo in allTodos"
        :key="todo.id"
        :class="{ 'is-complete': todo.completed }"
        class="todo">
        {{ todo.title }}
        <!-- Calling action directly without creating it in the methods -->
        <i @click="deleteTodo(todo.id)" class="fas fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Todos',
  // Actions go in methods
  methods: {
    ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),
    onDblClick(todo) {
      const updatedTodo = {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed,
      };

      this.updateTodo(updatedTodo);
    },
  },
  // Allows us to use the getter called allTodos
  // Getters go in computed
  computed: mapGetters(['allTodos']),
  // lifecycle hook - before component loads
  created() {
    this.fetchTodos();
  },
};
</script>

<style lang="scss" scoped>
.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;

  .incomplete-box {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #41b883;
  }

  .complete-box {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #35495e;
  }
}

.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;

  .todo {
    border: 1px solid #ccc;
    background: #41b883;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;

    i {
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: #fff;
      cursor: pointer;
    }
  }

  .is-complete {
    background: #35495e;
    color: #fff;
  }
}

@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>
