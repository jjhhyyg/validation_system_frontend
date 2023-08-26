import {RouteLocationNormalized, NavigationGuardNext} from 'vue-router'
import {api} from 'boot/axios'

export function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const token = localStorage.getItem('token')
  if(token !== null && token !== ''){
    api.post('/user/verify', {token: token}).then(r => )
  }
  if (to.path === '/visitor') {
    next()
  } else {
    next('/visitor')
  }
}
