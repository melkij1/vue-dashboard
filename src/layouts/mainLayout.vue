<template>
  <div class="wrapper ">

    <Sidebar :toggle="isOpen"/>


    <div class="main-panel"
    :class="{full : !isOpen}">
        <Navbar @click="isOpen = !isOpen"/>
      <div class="content"
        >
        <div class="container-fluid">
          <router-view/>
        </div>
      </div>


      <Footer/>

      


    </div>
    <CategoryModal/>
  </div>
  
</template>

<script>
import Sidebar from '../components/sidebar/Sidebar'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import CategoryModal from '../components/modal/CategoryModal'
export default {
  name: 'MainLayout',
  data: () => ({
    isOpen: true
  }),
  components: {
    Sidebar,
    Footer,
    Navbar,
    CategoryModal
  }
}
</script>