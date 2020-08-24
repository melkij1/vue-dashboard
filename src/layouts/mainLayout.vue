<template>
  <Loader v-if="loading"/>
  <div class="wrapper" v-else>
    
    <Sidebar :toggle="isOpen"
    @modal="modal = !modal"
    :categories="categories"/>


    <div class="main-panel"
    :class="{full : !isOpen}">
        <Navbar @click="isOpen = !isOpen" />
      <div class="content"
        >
        <div class="container-fluid">
          <router-view
          @createtask="taskModal = !taskModal"/>
        </div>
      </div>


      <Footer/>

      


    </div>
    <CategoryModal
    @closeModal="modal = !modal" 
    :openCategory="modal"
    @created="addNewCategory"/>
    <TaskModal
    :openTask="taskModal"
    @closeModal="taskModal = !taskModal"
    :categories="categories"
    />
  </div>
  
</template>

<script>
import Sidebar from '../components/sidebar/Sidebar'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import CategoryModal from '../components/modal/CategoryModal'
import TaskModal from '../components/modal/TaskModal'
import Loader from '../components/loader/Loader'
export default {
  name: 'MainLayout',
  data: () => ({
    isOpen: true,
    modal: false,
    categories: [],
    loading: true,
    taskModal: false,
  }),
  components: {
    Sidebar,
    Footer,
    Navbar,
    CategoryModal,
    TaskModal,
    Loader
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    addNewCategory(category){
      this.categories.push(category)
    }
  }
}
</script>