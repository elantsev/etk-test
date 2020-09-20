import Vue from 'vue'
import axios from 'axios'


export const instance = axios.create({
    baseURL: 'https://swapi.dev/api/',
    key: 'value'
})


Vue.prototype.$axios = instance
