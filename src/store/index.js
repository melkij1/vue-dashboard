import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import category from './category'
import task from './task'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    currentCategory: null,
    prioriry: [
      {title: 'Низкий'},
      {title: 'Средний'},
      {title: 'Высокий'},
    ]
  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = null
    },
    setCurrentCategory(state, val){
      state.currentCategory = val
    }
  },
  getters: {
    error: s => s.error,
    categoryActive: s => s.currentCategory,
    prioriryArray: s => s.prioriry,
  },
  actions: {
  },
  modules: {
    auth,
    category,
    task
  }
})
