import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Test from '@/components/Test'
import Artist from '@/components/Artist'
import AppHeader from '@/components/AppHeader'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      component: AppHeader,
      children: [{
        path: '/',
      name: 'Home',
      component: Home
      },
      {
        path: '/test',
        name: 'Test',
        component: Test
      },
      {
        path: '/artist/:id',
        name: 'Artist',
        component: Artist
      }]  
    }
  ]
})
