import Vue from 'vue'
import Router from 'vue-router'
import Edit from '@/components/Edit'
import List from '@/components/List'
import View from '@/components/View'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/view:id',
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
