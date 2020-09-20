export function setPeople (state, people) {
    state.people = people
    const personsHash = people.reduce((acc, person) => { return { ...acc, [person.url]: person } }, {})
    state.personHash = { ...state.personHash, ...personsHash }
}
export function setPerson (state, person) {
    state.personHash = { ...state.personHash, [person.url]: person }
}
export function setLoading (state, loading) {
    state.loading = loading
}