<template>
  <div>
    <AppHeader/>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'

export default {
  components: {
    AppHeader
  }, 
  mounted () {
    this.$store.commit('updateKorpaFromLocalStorage')
    
  }
}
</script>
