import axios from 'axios';

const state = {
	todos: []
};

// returns the state or part of it
const getters = {
	allTodos: state => state.todos
};

// commit to call to call the mutation
const actions = {
	async fetchTodos({ commit }) {
		const response = await axios.get('https://jsonplaceholder.typicode.com/todos')

			//added this commit: response.data is the same as todos in the mutation setTodos
			commit('setTodos', response.data);			
	}
};

const mutations = {
	setTodos: (state, todos) => (state.todos = todos)
};

// state is the same as state: state, getters: getters
export default {
	state,
	getters,
	actions,
	mutations
}
