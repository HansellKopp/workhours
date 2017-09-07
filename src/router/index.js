import Vue from 'vue'
import Router from 'vue-router'
import moment from 'vue-moment'
import VueLocalStorage from 'vue-localstorage'
import Edit from '@/components/Edit'
import List from '@/components/List'
import View from '@/components/View'

Vue.use(Router)
Vue.use(moment)
Vue.use(VueLocalStorage)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/view',
      name: 'View',
      component: View,
      props: true
    },
    {
      path: '/new',
      name: 'Create',
      component: Edit
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit,
      props: true
    }
  ]
})
