<template>
  <div id="app">
    <div class="top">
      
    <topsearch v-if = 'this.$store.state.navshow'></topsearch>
    <topnav  v-if = 'this.$store.state.navshow'></topnav>
      
    </div>
    <div class="content">

      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
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

 .fade-enter-active, .fade-leave-active {
   transition: all .3s;
 }
 .fade-enter, .fade-leave-to /* .kerwinfade-leave-active below version 2.1.8 */ {
   opacity: 0;
   
 }

</style>
 