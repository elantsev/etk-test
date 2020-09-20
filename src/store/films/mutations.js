export function setFilms (state, films) {
    state.films = films
    const filmsHash = films.reduce((acc, film) => { return { ...acc, [film.url]: film } }, {})
    state.filmsHash = { ...state.filmsHash, ...filmsHash }
}
export function setFilm (state, film) {
    state.filmsHash = { ...state.filmsHash, [film.url]: film }
}
export function setLoading (state, loading) {
    state.loading = loading
}