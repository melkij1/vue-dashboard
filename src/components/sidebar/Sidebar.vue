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
          :class="{active: curCategory.id === 0}"
          @click="setcurrentCategory({id: 0, title: 'Все'})">
            <router-link to="/" class="nav-link">
              <span class="category-title">Все</span>
            </router-link>
          </li>
          <div class="line"></div>
          <li class="nav-item" v-for="category in categories"
          :class="{active : curCategory.title === category.title}"
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
import {mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'Sidebar',
  props: {
    toggle : Boolean,
    categories: Array,
    setCategory: Object
  },
  data: () => ({
    curCategory: null
  }),
  mounted(){
    if(this.curCategory === null){
      this.setCurrentCategory({id: 0, title: 'Все'})
    }
  },
  watch:{
    categoryActive(newCats,oldCats) {
      if(oldCats !== null){
        if(newCats.title !== oldCats.title){
          this.curCategory = newCats
          console.log(this.curCategory,'curCategory')
        }else if (newCats.title === 'Все'){
          this.curCategory = {id: 0, title: 'Все'}
        }
      }else {
        if(newCats.id === 0){
          this.curCategory = {id: 0, title: 'Все'}
        }
      }
    }
  },
  computed: {
    ...mapState([
      'currentCategory'
    ]),
    ...mapGetters([
      'categoryActive'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentCategory'
    ]),
    setcurrentCategory(val){
      this.curCategory = val
      this.setCurrentCategory(val)
    }
  }

}
</script>