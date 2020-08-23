<template>
  <div class="content">
    <router-view/>
  </div>
</template>

<script>
import message from '@/utils/message'
export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError){
      this.$notify({
        group: 'foo',
        type: 'error',
        text: message[fbError.code] || 'Что-то пошло не так'
      })
    }
  }
}
</script>