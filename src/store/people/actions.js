export function getPeople ({ commit }, page) {
    commit('setLoading', true)
    return this._vm.$axios.get(`/people/${page}`).then(res => {
        console.log("getPeople -> res.data", res.data)
        const people = res.data.results
        commit('setPeople', people,)
        const count = res.data.count
        commit('setCount', count,)
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
