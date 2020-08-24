import Vue from 'vue'
import Vuelidate from 'vuelidate';
import Notifications from 'vue-notification'
import vSelect from 'vue-select'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false
//Vue.use(notificate)
Vue.use(Vuelidate)
Vue.use(Notifications)
Vue.component('v-select', vSelect)


firebase.initializeApp({
  apiKey: "AIzaSyBQiIg019ex5RokoHiUac4345ey84TCvhY",
  authDomain: "vue-dashboard-1742f.firebaseapp.com",
  databaseURL: "https://vue-dashboard-1742f.firebaseio.com",
  projectId: "vue-dashboard-1742f",
  storageBucket: "vue-dashboard-1742f.appspot.com",
  messagingSenderId: "753252609044",
  appId: "1:753252609044:web:0882c6afb9dbcb16a48b01"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


