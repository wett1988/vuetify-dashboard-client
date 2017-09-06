import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from '@/components/Home'

import UserList from '@/components/Users/UserList'
import UserEdit from '@/components/Users/UserEdit'
import UserCreate from '@/components/Users/UserCreate'

import RoleList from '@/components/Roles/RoleList'
import RoleEdit from '@/components/Roles/RoleEdit'
import RoleCreate from '@/components/Roles/RoleCreate'

import Login from '@/components/Auth/AuthLogin'

Vue.use(Router)

export default new Router({
  routes: [
//    {
//      path: '/',
//      name: 'Hello',
//      component: Hello
//    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { auth: false }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {auth: true}
    },
    {
      path: '/users',
      name: 'users',
      component: UserList,
      meta: {auth: true}
    },
    {
      path: '/users/edit/:id',
      component: UserEdit,
      meta: {auth: true}
    },
    {
      path: '/users/create',
      component: UserCreate,
      meta: {auth: true}
    },
    {
      path: '/roles',
      name: 'roles',
      component: RoleList,
      meta: {auth: true}
      // meta: {auth: 'regular'}
    },
    {
      path: '/roles/create',
      component: RoleCreate,
      meta: {auth: true}
    },
    {
      path: '/roles/edit/:id',
      component: RoleEdit,
      meta: {auth: true}
    },
    {
      path: '/404',
      redirect: { name: 'home' }
    },
    {
      path: '/403',
      redirect: { name: 'home' }
    }
  ]
})
