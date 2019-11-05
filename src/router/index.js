import Vue from 'vue'
import Router from 'vue-router'

import ViewSindico from '../components/sindico/ViewSindico.vue'

Vue.use(Router)

export default new Router({
  routes:[
    {
      path: '/add-morador',
      name: 'AddMorador',
      component: ViewSindico
    }
  ]
})
