const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  // Actions take in an option
  // commit actually calls the mutation
  async fetchTodos({ commit }) {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await res.json();
    commit('setTodos', data);
  },

  async addTodo({ commit }, title) {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title,
        completed: false,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const createdTodo = await res.json();
    console.log(createdTodo);
    commit('newTodo', createdTodo);
  },

  async deleteTodo({ commit }, id) {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit('removeTodo', id);
  },

  async filterTodos({ commit }, limit) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
    const data = await res.json();
    commit('setTodos', data);
  },

  async updateTodo({ commit }, updatedTodo) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        updatedTodo,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await res.json();

    commit('updateTodo', data);
  },
};

const mutations = {
  setTodos: (state, todos) => state.todos = todos,
  // unshift to put it in the front of the array
  newTodo: (state, createdTodo) => state.todos.unshift(createdTodo),
  removeTodo: (state, id) => state.todos = state.todos.filter((todo) => todo.id !== id),
  updateTodo: (state, updatedTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
