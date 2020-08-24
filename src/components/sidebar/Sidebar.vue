<template>
  <div class="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg"
  :class="{hidden : !toggle}">
      <div class="logo">
        <span class="sidebar-title">Категории</span>
        <div class="add-icon-area">
          <button type="button" class="btn-icon__add" @click="$emit('modal')">
            <span class="material-icons">add</span>
          </button>
        </div>
      </div>
      <div class="sidebar-wrapper">
        <ul class="nav">
          <li class="nav-item"
          :class="{active: currentCategory === null}"
          @click="setcurrentCategory({id: null, title: 'Все'})">
            <router-link to="/" class="nav-link">
              <span class="category-title">Все</span>
            </router-link>
          </li>
          <div class="line"></div>
          <li class="nav-item" v-for="category in categories"
          :class="{active : currentCategory === category}"
           @click="setcurrentCategory(category)">
            <router-link :to="{path:'/category/'+ category.id}" 
            class="nav-link">
              <span class="category-title">{{category.title}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'Sidebar',
  props: {
    toggle : Boolean,
    categories: Array
  },
  data: () => ({
    currentCategory: null
  }),
  mounted(){
    if(this.currentCategory === null){
      this.setCurrentCategory({id: null, title: 'Все'})
    }
  },
  methods: {
    ...mapActions([
      'setCurrentCategory'
    ]),
    setcurrentCategory(val){
      this.currentCategory = val
      this.setCurrentCategory(val)
      // this.$store.dispatch('setCurrentCategory', val)
    }
  }

}
</script>