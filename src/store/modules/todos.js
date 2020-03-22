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

	},

	async deleteTodo({ commit }, id) {
		await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
		
		commit('removeTodo', id)
	},

	async filterTodos({ commit }, e ) {
		//console.log(e); prints the event object
		// Get selected number
		const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
		//console.log(limit);
		const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

		commit('setTodos', response.data);
	}
};

//Added newTodo mutation
// unshift() is a js function check it out
const mutations = {
	setTodos: (state, todos) => (state.todos = todos),
	newTodo: (state, todo) => state.todos.unshift(todo),
	removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !==id)
		// if filter conditional passes, return that todo
};

// state is the same as state: state, getters: getters
export default {
	state,
	getters,
	actions,
	mutations
}

