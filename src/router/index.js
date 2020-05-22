import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddList from '@/components/AddList'
import EditList from '@/components/EditList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-list',
      name: 'AddList',
      component: AddList
    },
    {
      path: '/edit-list/:list_url',
      name: 'EditList',
      component: EditList
    }
  ]
})
