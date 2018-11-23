import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../components/recommend.vue'
import Upcoming from '../components/upcoming.vue'
import Soli from '../components/soli.vue'
import CrossBorder from '../components/crossborder.vue'
import Women from '../components/women.vue'
import Men from '../components/men.vue'
import Cosmetics from '../components/cosmetics.vue'
import Lifestyle from '../components/lifestyle.vue'
import Kids from '../components/kids.vue'
import Brand from '../components/brand.vue'
import Filterlist from '../components/filterlist.vue'
import Produtlsit from '../components/productlist.vue'
import Productdetail from '../components/productdetail.vue'
import Login from '../components/login.vue' 
import Mobile from '../components/mobile.vue'
import Account from '../components/account.vue'
import Checksmscode from '../components/checksmscode.vue'
import Setpassword  from '../components/setpassword.vue'
import Welcome  from   '../components/welcome.vue'
import Shopping from '../components/shoppingcart.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Recommend
    },
    {
      path:'/upcoming',
      component:Upcoming
    },
    {
      path:'/silo',
      component:Soli,
      children:[
        {
          path:'crossborder',
          component : CrossBorder
        },
        {
          path:'women',
          component : Women
        },
        {
          path:'men',
          component : Men
        },
        {
          path:'cosmetics',
          component : Cosmetics
        },
        {
          path:'lifestyle',
          component : Lifestyle
        },
        {
          path:'kids',
          component : Kids
        }

      ]
    },
    {
      path:'/brand/:id',
      component : Brand
    },
    {
      path:"/filterlist",
      component : Filterlist
    },
    {
      path:'/productlist',
      component : Produtlsit
    },
    {
      path:'/productdetail',
      component : Productdetail
    },
    {
      path:'/login',
      component : Login,
      children:[
        {
          path : 'mobile',
          component : Mobile
        },
        {
          path : 'account',
          component : Account
        }  
      ]
    },
    {
      path: '/checksmscode',
      component : Checksmscode
    },
    {
      path:'/setpassword',
      component : Setpassword
    },
    {
      path:'/welcome',
      component : Welcome
    },
    {
      path:'/shoppingcart',
      component: Shopping
    },
    {
    	path:'*',
    	redirect:'/index'
    },

  ]
})
