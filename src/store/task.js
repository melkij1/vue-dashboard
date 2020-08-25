import firebase from 'firebase/app';

export default {
  actions: {
    async fetchTask ({dispatch, commit}){
      try{
        const uid = await dispatch('getUid')
        const tasks = await (await firebase.database().ref(`users/${uid}/tasks`).once('value')).val() || {}
        return Object.keys(tasks).map(key => ({...tasks[key], id: key}))
        // console.log(tasks , 'fetchTasks')
      } catch(e){
        throw e
      }
    },
    async createTask ({dispatch, commit}, task) {
      try {
        const uid = await dispatch('getUid')
        const taskItem = await firebase.database().ref(`users/${uid}/tasks`).push(task)
        return task
        // return await firebase.database().ref(`users/${uid}/tasks`).push(task)
      } catch (e) {
        commit('setError')
        throw e
      }
    }
  }
}