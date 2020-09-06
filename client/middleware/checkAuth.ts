import { Context } from '@nuxt/types'

export default function ({ store, redirect, route }: Context) {
  // If the user is not authenticated
  if (!store.state.user && /^\/admin/.test(route.path)) {
    return redirect('/login')
  }
}
