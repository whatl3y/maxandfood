export default ({ store }, inject) => {
  inject('toast', {
    success: (msg) =>
      store.commit('SET_SNACKBAR', { color: 'green', text: msg }),
    error: (msg) => store.commit('SET_SNACKBAR', { color: 'red', text: msg }),
    responseError(err) {
      const baseErr =
        err.response &&
        err.response.data &&
        err.response.data.error &&
        err.response.data.error.message
      this.error(baseErr || err)
    },
  })
}
