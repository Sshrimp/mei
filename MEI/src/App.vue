<template>
  <div id="app">
    <div class="top">
      
    <topsearch v-show = 'this.$store.state.navshow'></topsearch>
    <topnav  v-show = 'this.$store.state.navshow'></topnav>
      
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import topsearch from './components/topsearch.vue'
  import topnav from './components/topnav.vue'
export default {
  name: 'App',
  components:{
    topsearch,
    topnav
  }
} 
</script>

<style>
.top{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 0px;
  z-index: 10
}

</style>
 