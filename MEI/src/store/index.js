import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex) 



const store = new Vuex.Store({
  state: {
    navshow: true,
    num:'',
    productlist:{
    	eventId:'',
  		urlkey:''
      },
    filterlist:{
      categoryId:'',
      categoryIdTwoId:'',
      productId:'',
      siloId:''
    }
  },

  actions:{
  
  },

  mutations: {
  	lrx2(state,payload){
  		state.productlist.eventId = payload.eventId;
  		state.productlist.urlkey = payload.urlkey;
  	},
    lrx(state,payload){
      state.filterlist.categoryId = payload.oneId;
      state.filterlist.categoryIdTwoId = payload.twoId;
      state.filterlist.siloId = payload.siloId;   
    },
    zyp(state,payload){
      state.num = payload;
    },
    chuanChan(state,payload){
      state.filterlist.productId = payload;
    }
  }
})

export default store;

