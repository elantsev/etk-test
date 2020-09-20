export function getPeople ({ commit }) {
    commit('setLoading', true)
    return this._vm.$axios.get('/people/').then(res => {
        const people = res.data.results
        commit('setPeople', people,)
    }).catch(error => {
        this._vm.$q.notify({
            message: error.message,
            color: 'negative'
        })
    }).finally(() =>
        commit('setLoading', false)
    )
}
export function getPerson ({ commit }, personId) {
    commit('setLoading', true)
    return this._vm.$axios.get(`/people/${personId}/`).then(res => {
        const person = res.data
        console.log("getPerson -> person", person)
        commit('setPerson', person,)
    }).catch(error => {
        this._vm.$q.notify({
            message: error.message,
            color: 'negative'
        })
    }).finally(() =>
        commit('setLoading', false)
    )
}
