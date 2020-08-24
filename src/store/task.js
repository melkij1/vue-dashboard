import firebase from 'firebase/app';

export default {
  actions: {
    async createTask ({dispatch, commit}, task) {
      try {
        const uid = await dispatch('getUid')
        return await firebase.database().ref(`users/${uid}/tasks`).push(task)
      } catch (e) {
        commit('setError')
        throw e
      }
    }
  }
}