import {defineStore} from 'pinia';

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    token: '',
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    }
  }
})
