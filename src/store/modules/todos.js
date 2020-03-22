import axios from 'axios';

const state = {
	todos: []
};

// returns the state or part of it
const getters = {
	allTodos: state => state.todos
};

// commit to call the mutation
const actions = {
	async fetchTodos({ commit }) {
		const response = await axios.get('https://jsonplaceholder.typicode.com/todos')

		//added this commit: response.data is the same as todos in the mutation setTodos
		commit('setTodos', response.data);			
	},
	//new additions: response pass with the value title and completed as false
	async addTodo({ commit }, title) {
		const response = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false});
		// the commit includes the new todo as passed in the response
		commit('newTodo', response.data);

	}
};

//Added newTodo mutation
// unshift() is a js function check it out
const mutations = {
	setTodos: (state, todos) => (state.todos = todos),
	newTodo: (state, todo) => state.todos.unshift(todo)

};

// state is the same as state: state, getters: getters
export default {
	state,
	getters,
	actions,
	mutations
}
