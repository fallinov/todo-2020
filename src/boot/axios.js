import Vue from 'vue'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://todo.kode.ch/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

Vue.prototype.$api = api

export { api }
