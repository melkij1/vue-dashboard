import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategories({commit, dispatch}){
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        
        return Object.keys(categories).map(key => ({...categories[key], id: key}))

        //Old style
        // const cats = []
        // Object.keys(categories).forEach(key => {
        //   cats.push({
        //     title: categories[key].title,
        //     id: key,
        //   })
        // })
        // return cats
        //console.log(categories)
        // return {title, id: category.key}
      }catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory ({commit, dispatch}, {title}) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({title})
        return {title, id: category.key}
      }catch (e) {
        commit('setError', e)
        throw e
      }
    },
    setCurrentCategory ({commit, dispatch}, val) {
      commit('setCurrentCategory',val)
    }
  }
}