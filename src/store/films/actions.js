export function getFilms ({ commit }, value) {
    commit('setLoading', true)
    return this._vm.$axios.get('/films/').then(res => {
        const films = res.data.results
        commit('setFilms', films,)
    }).catch(error => {
        this._vm.$q.notify({
            message: error.message,
            color: 'negative'
        })
    }).finally(() =>
        commit('setLoading', false)
    )
}
export function getFilm ({ commit }, filmId) {
    commit('setLoading', true)
    return this._vm.$axios.get(`/films/${filmId}/`).then(res => {
        const film = res.data
        commit('setFilm', film,)
    }).catch(error => {
        this._vm.$q.notify({
            message: error.message,
            color: 'negative'
        })
    }).finally(() =>
        commit('setLoading', false)
    )
}
