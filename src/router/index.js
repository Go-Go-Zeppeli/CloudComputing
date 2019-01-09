import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Upload from '@/components/Upload'
import HelloWorld from '@/components/HelloWorld'
import Trainning from '@/components/Trainning'
// import * as dao from '../components/store/dao'

Vue.use(Router)
// Vue.use(VueResource)

// function requireAuth (to, from, next) {
//   // if (!dao.getCookie('ACCESS_TOKEN')) {
//   //   // window.localStorage.getItem(constant.APP_USER_TOKEN)
//   //   next({
//   //     path: '/login'
//   //   })
//   // } else {
//   //   next()
//   // }
//   next()
// }

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/trainning',
      name: 'Trainning',
      component: Trainning
    }
  ]
})
