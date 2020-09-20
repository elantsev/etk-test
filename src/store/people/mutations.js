export function setPeople (state, people) {
    state.people = people
}
export function setPerson (state, person) {
    state.person = person
    state.personHash = { ...state.personHash, [person.url]: person }
}
export function setLoading (state, loading) {
    state.loading = loading
}