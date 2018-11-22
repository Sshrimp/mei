import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex) 



const store = new Vuex.Store({
  state: {
    navshow: true,
    productlist:{
      	eventId:'',
  		urlkey:''
      }
  },

  actions:{
  
  },

  mutations: {
  	lrx2(state,payload){
		state.productlist.eventId = payload.eventId;
		state.productlist.urlkey = payload.urlkey;
  	}

  }
})

export default store;