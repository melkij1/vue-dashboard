<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
    <notifications group="foo" />
  </div>
</template>

<style lang="scss">
  @import './assets/css/material-dashboard.min.css';
  @import './styles/style.scss';
</style>

<script>
import emptyLayout from '@/layouts/emptyLayout';
import mainLayout from '@/layouts/mainLayout';
export default {
  computed: {
    layout(){
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    emptyLayout, mainLayout
  }
}
</script>