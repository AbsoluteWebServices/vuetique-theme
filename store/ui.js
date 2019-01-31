const actions = {
  closeWishlist ({ commit, state }) {
    commit('setWishlist', false)
  }
}

export default {
  actions
}
